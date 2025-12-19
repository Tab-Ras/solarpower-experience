import { useMemo, useState } from "react";
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

const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

const OfferWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Visar fel först när man försöker gå vidare / skicka
  const [touched, setTouched] = useState({});
  const [stepError, setStepError] = useState("");

  const resetWizard = () => {
    setFormData(INITIAL_FORM_STATE);
    setStep(1);
    setIsSubmitted(false);
    setTouched({});
    setStepError("");
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // så fort man ändrar något: rensa steg-error
    if (stepError) setStepError("");
  };

  const markTouched = (fields) => {
    setTouched((prev) => {
      const next = { ...prev };
      fields.forEach((f) => (next[f] = true));
      return next;
    });
  };

  const requiredByStep = useMemo(
    () => ({
      1: ["serviceType"],
      2: ["jobType"],
      3: ["location", "scope"],
      4: ["description"],
      5: ["name", "email"], // company/phone valfritt (kan göras required om du vill)
    }),
    []
  );

  const fieldErrors = useMemo(() => {
    const e = {};

    // STEP 1
    if (!formData.serviceType) e.serviceType = "Välj ett alternativ.";

    // STEP 2
    if (!formData.jobType) e.jobType = "Välj typ av skylt/arbete.";

    // STEP 3
    if (!formData.location?.trim()) e.location = "Fyll i ort/plats.";
    if (!formData.scope?.trim()) e.scope = "Fyll i tidsram/omfattning.";

    // STEP 4
    if (!formData.description?.trim())
      e.description = "Beskriv uppdraget kort (minst en mening).";
    else if (formData.description.trim().length < 20)
      e.description = "Beskriv gärna lite mer (minst 20 tecken).";

    // STEP 5
    if (!formData.name?.trim()) e.name = "Fyll i kontaktperson.";
    if (!formData.email?.trim()) e.email = "Fyll i e-postadress.";
    else if (!isEmail(formData.email)) e.email = "Ange en giltig e-postadress.";

    // (valfritt) phone format light
    if (formData.phone?.trim() && formData.phone.trim().length < 6) {
      e.phone = "Telefonnumret ser lite kort ut.";
    }

    return e;
  }, [formData]);

  const canGoNext = useMemo(() => {
    const fields = requiredByStep[step] || [];
    return fields.every((f) => !fieldErrors[f]);
  }, [step, requiredByStep, fieldErrors]);

  const scrollToWizardTop = () => {
    // Snäll scroll så man alltid ser rubriken när man byter steg
    const el = document.getElementById("offert");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextStep = () => {
    const fields = requiredByStep[step] || [];
    markTouched(fields);

    if (!canGoNext) {
      setStepError("Fyll i steget innan du går vidare.");
      return;
    }
    setStep((s) => Math.min(s + 1, 5));
    setStepError("");
    scrollToWizardTop();
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    setStepError("");
    scrollToWizardTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // markera required i steg 5
    const fields = requiredByStep[5] || [];
    markTouched(fields);

    // dubbelkoll
    const ok = fields.every((f) => !fieldErrors[f]);
    if (!ok) {
      setStepError("Kontrollera fälten innan du skickar.");
      return;
    }

    console.log("Offertdata:", formData);

    // 👉 här kopplar du backend senare
    // await fetch("/api/offer", { method: "POST", headers: {...}, body: JSON.stringify(formData) })

    setIsSubmitted(true);
    scrollToWizardTop();
  };

  const showError = (field) => Boolean(touched[field] && fieldErrors[field]);

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
          <div className="mb-10">
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-400">
              Begär offert
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Steg {step} / 5
            </h2>
          </div>

          {/* Step error */}
          {stepError && (
            <div className="mb-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
              {stepError}
            </div>
          )}

          {/* CONTENT */}
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

                {showError("serviceType") && (
                  <p className="text-sm text-rose-300">{fieldErrors.serviceType}</p>
                )}
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Typ av skylt / arbete</h3>

                <select
                  className={`w-full bg-[#141414] border px-5 py-4 outline-none
                    ${showError("jobType") ? "border-rose-400/70" : "border-white/20"}
                  `}
                  value={formData.jobType}
                  onChange={(e) => updateField("jobType", e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, jobType: true }))}
                >
                  <option value="">Välj typ</option>
                  <option>Fasadskylt</option>
                  <option>Ljusskylt</option>
                  <option>Folie / Fönster</option>
                  <option>Invändig skylt</option>
                  <option>Annat</option>
                </select>

                {showError("jobType") && (
                  <p className="text-sm text-rose-300">{fieldErrors.jobType}</p>
                )}
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Plats & omfattning</h3>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Ort / plats"
                    className={`w-full bg-transparent border px-5 py-4 outline-none
                      ${showError("location") ? "border-rose-400/70" : "border-white/20"}
                    `}
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, location: true }))}
                  />
                  {showError("location") && (
                    <p className="text-sm text-rose-300">{fieldErrors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Tidsram / omfattning"
                    className={`w-full bg-transparent border px-5 py-4 outline-none
                      ${showError("scope") ? "border-rose-400/70" : "border-white/20"}
                    `}
                    value={formData.scope}
                    onChange={(e) => updateField("scope", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, scope: true }))}
                  />
                  {showError("scope") && (
                    <p className="text-sm text-rose-300">{fieldErrors.scope}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Beskriv uppdraget</h3>

                <div className="space-y-2">
                  <textarea
                    rows="5"
                    placeholder="Kort beskrivning av uppdraget..."
                    className={`w-full bg-transparent border px-5 py-4 outline-none
                      ${showError("description") ? "border-rose-400/70" : "border-white/20"}
                    `}
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, description: true }))}
                  />
                  <p className="text-xs text-white/50">
                    Tips: skriv gärna vad som ska monteras, antal, och eventuella förutsättningar.
                  </p>
                  {showError("description") && (
                    <p className="text-sm text-rose-300">{fieldErrors.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-semibold">Kontaktuppgifter</h3>

                <input
                  type="text"
                  placeholder="Företag (valfritt)"
                  className="w-full bg-transparent border border-white/20 px-5 py-4 outline-none"
                  value={formData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                />

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Kontaktperson *"
                    className={`w-full bg-transparent border px-5 py-4 outline-none
                      ${showError("name") ? "border-rose-400/70" : "border-white/20"}
                    `}
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                  />
                  {showError("name") && (
                    <p className="text-sm text-rose-300">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="E-post *"
                    className={`w-full bg-transparent border px-5 py-4 outline-none
                      ${showError("email") ? "border-rose-400/70" : "border-white/20"}
                    `}
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                  />
                  {showError("email") && (
                    <p className="text-sm text-rose-300">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="tel"
                    placeholder="Telefon (valfritt)"
                    className={`w-full bg-transparent border px-5 py-4 outline-none
                      ${showError("phone") ? "border-rose-400/70" : "border-white/20"}
                    `}
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                  />
                  {showError("phone") && (
                    <p className="text-sm text-rose-300">{fieldErrors.phone}</p>
                  )}
                </div>

                <div className="flex justify-end pt-8">
                  <button
                    type="submit"
                    className={`
                      group relative inline-flex items-center gap-4 
                      rounded-full bg-emerald-500 text-white 
                      text-xs md:text-sm tracking-[0.25em] uppercase 
                      px-8 py-3 transition-all duration-500 cursor-pointer
                      overflow-hidden
                      ${(!canGoNext ? "opacity-60 cursor-not-allowed" : "")}
                    `}
                    disabled={!canGoNext}
                  >
                    <span
                      className="
                        absolute inset-0 rounded-full border-2 border-white/30 
                        scale-[1.15] opacity-0 
                        transition-all duration-500 ease-out 
                        group-hover:scale-100 group-hover:opacity-100
                      "
                    />

                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                      Skicka förfrågan
                    </span>

                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 overflow-hidden">
                      <HiArrowRight
                        className="
                          absolute text-base transition-all duration-500
                          opacity-100 group-hover:opacity-0 group-hover:translate-x-2
                        "
                      />
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
                disabled={!canGoNext}
                className={`
                  group relative inline-flex items-center gap-4 
                  rounded-full bg-emerald-500 text-white 
                  text-xs md:text-sm tracking-[0.25em] uppercase 
                  px-8 py-3 transition-all duration-500 cursor-pointer
                  overflow-hidden
                  ${(!canGoNext ? "opacity-60 cursor-not-allowed" : "")}
                `}
              >
                <span
                  className="
                    absolute inset-0 rounded-full border-2 border-white/30 
                    scale-[1.15] opacity-0 
                    transition-all duration-500 ease-out 
                    group-hover:scale-100 group-hover:opacity-100
                  "
                />

                <span className="transition-transform duration-500 group-hover:-translate-x-1">
                  Nästa
                </span>

                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 overflow-hidden">
                  <HiArrowRight
                    className="
                      absolute text-base transition-all duration-500
                      opacity-100 group-hover:opacity-0 group-hover:translate-x-2
                    "
                  />
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

          {/* Small helper */}
          <p className="mt-6 text-xs text-white/50">
            * Obligatoriska fält. Förfrågan är inte bindande.
          </p>
        </div>
      )}
    </section>
  );
};

export default OfferWizard;
