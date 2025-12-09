import { HiArrowNarrowRight } from "react-icons/hi";

const ContactSection = () => {
  return (
    <section
      id="kontakt"
      className="bg-[#fafafa] px-4 md:px-12 lg:px-12 max-w-full py-12 md:py-28 lg:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
        {/* Vänster – rubrik & intro */}
        <div className="space-y-6">
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-600">
            Kontakta oss
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-tight">
            Prata med oss.
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
            Vill du komma igång med solceller, har en fråga om ditt tak eller
            vill bolla en idé? Skicka en rad så återkommer vi med
            rekommendationer anpassade efter ditt hem och din elförbrukning.
          </p>
        </div>

        {/* Höger – formulär */}
        <form className="space-y-10">
          {/* Förnamn / Efternamn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs uppercase tracking-[0.18em] text-gray-500 mb-2"
              >
                Förnamn
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Anna"
                className="w-full border-b border-gray-300 bg-transparent py-2 text-lg md:text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-xs uppercase tracking-[0.18em] text-gray-500 mb-2"
              >
                Efternamn
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Svensson"
                className="w-full border-b border-gray-300 bg-transparent py-2 text-lg md:text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>
          </div>

          {/* E-post / Telefon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-[0.18em] text-gray-500 mb-2"
              >
                E-postadress
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="du@exempel.se"
                className="w-full border-b border-gray-300 bg-transparent py-2 text-lg md:text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs uppercase tracking-[0.18em] text-gray-500 mb-2"
              >
                Telefonnummer
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+46"
                className="w-full border-b border-gray-300 bg-transparent py-2 text-lg md:text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>
          </div>

          {/* Projektbeskrivning */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-[0.18em] text-gray-500 mb-2"
            >
              Berätta om ditt projekt
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Berätta kort om ditt tak, din elförbrukning och vad du vill uppnå med solceller..."
              className="w-full border-b border-gray-300 bg-transparent py-2 text-lg md:text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 resize-none transition-colors"
              required
            />
          </div>

          {/* Knapp */}
          <div className="pt-2">
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

              {/* Text sliding slightly */}
              <span
                className="
                  transition-transform duration-500 
                  group-hover:-translate-x-1
                "
              >
                Skicka förfrågan
              </span>

              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 overflow-hidden">
  
                {/* Default small arrow */}
                <HiArrowNarrowRight
                  className="
                    absolute text-base transition-all duration-500
                    opacity-100 group-hover:opacity-0 group-hover:translate-x-2
                  "
                />

                {/* Long arrow (kan bytas till annan ikon) */}
                <HiArrowNarrowRight
                  className="
                    absolute text-base transition-all duration-500
                    opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0
                  "
                  style={{ scaleX: 1.8 }}
                />

              </span>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ContactSection;
