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
      id="footer"
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
            <div className="space-y-2 text-sm md:text-base grid">
              <a
                href="mailto:info@centrerat.se?subject=Offertförfrågan"
                className="
                  font-medium text-gray-200
                  hover:text-emerald-400
                  transition-colors
                "
              >
                info@centrerat.se
              </a>
              <a
                href="tel:+46735375765"
                className="
                  text-gray-300
                  hover:text-emerald-400
                  transition-colors
                "
              >
                +46 73 537 57 65
              </a>
              
              <button 
                onClick={() => {
                  if (window.lenis) {
                    window.lenis.scrollTo('#rakna', {
                      duration: 1.2,
                      easing: (t) => 1 - Math.pow(1 - t, 3),
                    })
                  } else {
                    document
                      .getElementById('rakna')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="
                  mt-4 inline-flex items-center gap-2
                  text-sm uppercase tracking-[0.18em]
                  text-gray-200 hover:text-emerald-400
                  transition-colors
                "
              >
                Hör av dig
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="space-y-1 text-xs text-gray-500 pt-4">
              <p>Centrerat Montage <br/> Östgöta AB</p>
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
        </div>
      </div>

      {/* Big background word */}
      <div className="footer-word uppercase mt-16 text-[20vw] leading-none font-black -tracking-widest text-emerald-600 text-center select-none pointer-events-none">
        Centrerat
      </div>

      {/* Copyright */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xs md:text-sm text-gray-500">
          © {year} Centrerat Montage Östgöta AB. Alla rättigheter reserverade.
        </div>
        <div>
          <a
            href="https://rt-webstudio.se"
            target="_blank"
            rel="noopener noreferrer"
            className="
            text-xs md:text-sm text-gray-500 
            transition-colors duration-300
            hover:text-emerald-500
            "
            >
            Design & utveckling av RT Web Studio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
