import { useState } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const INITIAL_FORM_STATE = {
  serviceType: "",
  jobType: "",
  location: "",
  scope: "",
  description: "",
  company: "",
  name: "",
  email: "",
  phone: "",
};

const OfferWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const resetWizard = () => {
    setFormData(INITIAL_FORM_STATE);
    setStep(1);
    setIsSubmitted(false);
};


  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Offertdata:", formData);

    // 👉 här kopplar ni backend senare
    // fetch("/api/offer", { method: "POST", body: JSON.stringify(formData) })

    setIsSubmitted(true);
  };

  return (
    <section
      id="offert"
      className="relative py-40 bg-[#141414] text-[#fafafa] px-4 md:px-12 lg:px-12"
    >
        {isSubmitted ? (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="max-w-xl text-center space-y-6">
                <span className="text-xs tracking-[0.3em] uppercase text-emerald-400">
                    Tack!
                </span>

                <h3 className="text-4xl md:text-5xl font-bold">
                    Din offertförfrågan
                    <span className="block text-emerald-500">är skickad.</span>
                </h3>

                <p className="text-[#ebebeb] text-lg leading-relaxed">
                    Vi har tagit emot din förfrågan och återkommer så snart som möjligt.
                    Har du kompletterande information är du alltid välkommen att kontakta oss.
                </p>

                <div className="pt-8 flex justify-center">
                    <button
                    onClick={resetWizard}
                    className="
                        group relative inline-flex items-center gap-3 
                        rounded-full border border-white/30 px-8 py-3
                        uppercase text-xs tracking-[0.25em]
                        transition-all duration-500 hover:border-emerald-500
                    "
                    >
                    <span>Skicka ny förfrågan</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                        →
                    </span>
                    </button>
                </div>
                </div>
            </div>
        ) : (

        <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-16">
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-400">
                Begär offert
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Steg {step} / 5
            </h2>
            </div>

            {/* CONTENT (NOT A FORM) */}
            <div className="space-y-12">
            {/* STEP 1 */}
            {step === 1 && (
                <div className="space-y-8">
                <h3 className="text-2xl font-semibold">
                    Vad behöver du hjälp med?
                </h3>

                {["Montage", "Service", "Survey"].map((item) => (
                    <button
                    key={item}
                    type="button"
                    onClick={() => updateField("serviceType", item)}
                    className={`w-full border px-6 py-5 text-left transition
                        ${
                        formData.serviceType === item
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-white/20 hover:border-white/40"
                        }
                    `}
                    >
                    {item}
                    </button>
                ))}
                </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <div className="space-y-6">
                <h3 className="text-2xl font-semibold">
                    Typ av skylt / arbete
                </h3>

                <select
                    className="w-full bg-[#141414] border border-white/20 px-5 py-4"
                    value={formData.jobType}
                    onChange={(e) => updateField("jobType", e.target.value)}
                >
                    <option value="">Välj typ</option>
                    <option>Fasadskylt</option>
                    <option>Ljusskylt</option>
                    <option>Folie / Fönster</option>
                    <option>Invändig skylt</option>
                    <option>Annat</option>
                </select>
                </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
                <div className="space-y-6">
                <h3 className="text-2xl font-semibold">
                    Plats & omfattning
                </h3>

                <input
                    type="text"
                    placeholder="Ort / plats"
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tidsram / omfattning"
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.scope}
                    onChange={(e) => updateField("scope", e.target.value)}
                />
                </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
                <div className="space-y-6">
                <h3 className="text-2xl font-semibold">
                    Beskriv uppdraget
                </h3>

                <textarea
                    rows="5"
                    placeholder="Kort beskrivning av uppdraget..."
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                />
                </div>
            )}

            {/* STEP 5 – ONLY STEP WITH FORM */}
            {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-semibold">
                    Kontaktuppgifter
                </h3>

                <input
                    type="text"
                    placeholder="Företag"
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Kontaktperson"
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                />

                <input
                    type="email"
                    placeholder="E-post"
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Telefon"
                    className="w-full bg-transparent border border-white/20 px-5 py-4"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                />

                <div className="flex justify-end pt-8">
                    <button
                    type="submit"
                    className="
                        group relative inline-flex items-center gap-4 
                        rounded-full bg-emerald-500 text-white 
                        text-xs md:text-sm tracking-[0.25em] uppercase 
                        px-8 py-3 transition-all duration-500 cursor-pointer
                        overflow-hidden
                    "
                    >
                    {/* Animated outline stroke */}
                    <span
                        className="
                        absolute inset-0 rounded-full border-2 border-white/30 
                        scale-[1.15] opacity-0 
                        transition-all duration-500 ease-out 
                        group-hover:scale-100 group-hover:opacity-100
                        "
                    />

                    {/* Text */}
                    <span
                        className="
                        transition-transform duration-500 
                        group-hover:-translate-x-1
                        "
                    >
                        Skicka förfrågan
                    </span>

                    {/* Icon bubble */}
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 overflow-hidden">
                        {/* Default arrow */}
                        <HiArrowRight
                        className="
                            absolute text-base transition-all duration-500
                            opacity-100 group-hover:opacity-0 group-hover:translate-x-2
                        "
                        />

                        {/* Long arrow */}
                        <HiArrowRight
                        className="
                            absolute text-base transition-all duration-500
                            opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0
                        "
                        style={{ scaleX: 1.6 }}
                        />
                    </span>
                    </button>
                </div>
                </form>
            )}
            </div>

            {/* NAVIGATION (OUTSIDE FORM) */}
            <div className="flex items-center justify-between pt-12">
            {step > 1 ? (
                <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-sm uppercase tracking-[0.25em]"
                >
                <HiArrowLeft />
                Tillbaka
                </button>
            ) : (
                <span />
            )}

            {step < 5 && (
                <button
                type="button"
                onClick={nextStep}
                className="
                    group relative inline-flex items-center gap-4 
                    rounded-full bg-emerald-500 text-white 
                    text-xs md:text-sm tracking-[0.25em] uppercase 
                    px-8 py-3 transition-all duration-500 cursor-pointer
                    overflow-hidden
                "
                >
                {/* Animated outline stroke */}
                <span
                    className="
                    absolute inset-0 rounded-full border-2 border-white/30 
                    scale-[1.15] opacity-0 
                    transition-all duration-500 ease-out 
                    group-hover:scale-100 group-hover:opacity-100
                    "
                />

                {/* Text */}
                <span
                    className="
                    transition-transform duration-500 
                    group-hover:-translate-x-1
                    "
                >
                    Nästa
                </span>

                {/* Icon bubble */}
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 overflow-hidden">
                    {/* Default arrow */}
                    <HiArrowRight
                    className="
                        absolute text-base transition-all duration-500
                        opacity-100 group-hover:opacity-0 group-hover:translate-x-2
                    "
                    />

                    {/* Long arrow */}
                    <HiArrowRight
                    className="
                        absolute text-base transition-all duration-500
                        opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0
                    "
                    style={{ scaleX: 1.6 }}
                    />
                </span>
                </button>

            )}
            </div>
        </div>
        )}
    </section>
  );
};

export default OfferWizard;
