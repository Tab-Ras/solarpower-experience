import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import backgroundImage from '../assets/solar-hero.jpg';
import { HiArrowNarrowRight } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.to(panelRef.current, {
          yPercent: -35,        // panelen glider upp lite
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=20%',  // kopplat till hero-sektionens höjd istället för +=
            scrub: 0.6,         // lite smoothing, inte helt “true”
            // ingen pin här → mycket mjukare
          },
        });

        gsap.fromTo(
          '.hero-bg',
          {
            scale: 1,
          },
          {
            scale: 1.15,    // lite elegant zoom in
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,     // mjukare än panelen
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id='hero'
      className="relative h-screen w-full"
    >
      {/* Bakgrundsbild i fixed position */}
      <div
        className="hero-bg fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Vit panel */}
      <div
        ref={panelRef}
        className="hero-heading relative z-10 h-[40vh] w-full flex flex-col justify-center items-center text-center bg-[#fafafa] px-6 lg:h-[60vh]"
      >
        <h1
          className="text-[11vw] font-black uppercase leading-none -tracking-widest"
          style={{
            background: 'none',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'local',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          Centrerat Montage
        </h1>
        <h2 className="text-gray-800 uppercase text-[4vw] font-bold mt-4">Skyltmontage med <span className="text-emerald-500">precision</span>.</h2>
      </div>

      {/* Text + CTA */}
      <div className="hero-cta absolute bottom-40 md:bottom-20 md:left-10 z-20 text-left text-[#fafafa] max-w-lg px-4">
        <p className="hero-subtext text-sm md:text-xl mb-6 drop-shadow-md">
          Vi utför montage av skyltar och folie åt skyltproducenter och byråer. Med erfarenhet, noggrannhet och full kontroll i varje steg säkerställer vi att slutresultatet blir exakt som tänkt – på plats, i rätt tid.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              if (window.lenis) {
                window.lenis.scrollTo('#offert', {
                  duration: 1.2,
                  easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
                })
              } else {
                // fallback om Lenis inte är redo
                document.getElementById("kontakt")?.scrollIntoView({ 
                  behavior: "smooth", 
                  block: "start" 
                })
              }
            }}
            className="
              group relative inline-flex items-center overflow-hidden 
              rounded-full bg-emerald-500 text-white 
              text-xs md:text-sm tracking-[0.25em] uppercase 
              px-8 py-3 transition-all duration-500 cursor-pointer
            "
          >
            {/* Hover background wipe */}
            <span
              className="
                absolute inset-0 -z-10 scale-x-0 origin-left bg-black 
                transition-transform duration-500 ease-out group-hover:scale-x-100
              "
            />

            {/* Text */}
            <span
              className="
                transition-transform duration-500 
                group-hover:-translate-x-1
              "
            >
              Begär offert
            </span>

            {/* Icon bubble */}
            <span
              className="
                flex h-7 w-7 items-center justify-center rounded-full 
                bg-white text-gray-900 ml-3
                transition-transform duration-500
                group-hover:translate-x-1 group-hover:rotate-45
              "
            >
              <HiArrowNarrowRight className="text-base" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
