import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const year = new Date().getFullYear();
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const ctx = gsap.context(() => {
        // Panelen med tre kolumner
        gsap.from(".footer-panel", {
          opacity: 0,
          y: 80,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 55%",
          },
        });

        // Varje kolumn – lite stagger
        gsap.from(".footer-column", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 50%",
          },
        });

        // Stora SOLENERGI–ordet
        gsap.from(".footer-word", {
          opacity: 0,
          y: 60,
          scale: 1.08,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 10%",
          },
        });
      }, footerRef);

      return () => ctx.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="bg-[#050505] text-[#f5f5f5] pt-20 pb-10 px-4 md:px-12 lg:px-12 max-w-full overflow-hidden"
    >
      {/* Top panel */}
      <div className="footer-panel border border-[#1b1b1b] bg-[#070707] px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* CONTACT */}
          <div className="footer-column space-y-8">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
              Kontakt
            </p>
            <div className="space-y-2 text-sm md:text-base">
              <p className="font-medium">kontakt@solenergi.se</p>
              <p className="text-gray-300">+46 70 123 45 67</p>
              <button className="mt-4 text-sm uppercase tracking-[0.18em] text-gray-200 hover:text-emerald-400 transition-colors">
                Hör av dig →
              </button>
            </div>

            <div className="space-y-1 text-xs text-gray-500 pt-4">
              <p>Solenergi AB</p>
              <p>Solvägen 12</p>
              <p>123 45 Solstad</p>
            </div>
          </div>

          {/* CONNECT */}
          <div className="footer-column space-y-8">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
              Connect
            </p>
            <div className="flex items-center gap-4 text-xl pt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-emerald-400 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-emerald-400 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-emerald-400 transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div className="footer-column space-y-8">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
              Prenumerera
            </p>

            <p className="text-sm md:text-base text-gray-300 max-w-sm">
              Få uppdateringar om nya projekt, teknik och tips kring solenergi –
              direkt i din inkorg.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-2 max-w-sm"
            >
              <label
                htmlFor="footer-email"
                className="block text-xs uppercase tracking-[0.18em] text-gray-500 mb-2"
              >
                E-post
              </label>
              <div className="flex items-center border-b border-gray-500 pb-2">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="du@exempel.se"
                  className="flex-1 bg-transparent text-sm md:text-base text-[#f5f5f5] placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-3 text-lg hover:text-emerald-400 transition-colors"
                  aria-label="Skicka"
                >
                  <HiArrowNarrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Big background word */}
      <div className="footer-word mt-16 text-[23vw] leading-none font-black tracking-[-0.12em] text-emerald-600 text-center">
        SOLENERGI
      </div>

      {/* Copyright */}
      <div className="mt-6 text-xs md:text-sm text-gray-500">
        © {year} Solenergi AB. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
};

export default Footer;
