import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HiArrowNarrowRight } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const BenifitsSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);

  const benefits = [
    {
      label: "01",
      title: "Precision i varje steg",
      desc: `
        Varje montage börjar med noggranna mätningar och en tydlig plan.
        Vi säkerställer korrekt placering, infästning och linjering för ett
        slutresultat som håller över tid – både visuellt och tekniskt.
      `,
    },
    {
      label: "02",
      title: "Trygg montagepartner",
      desc: `
        Vi har erfarenhet av montage i många olika miljöer – från stadskärnor
        och köpcentrum till industriområden och fasader med särskilda krav.
        Arbetet utförs alltid med fokus på säkerhet, kvalitet och ansvar.
      `,
    },
    {
      label: "03",
      title: "Smidig kommunikation",
      desc: `
        Tydlig dialog är en självklar del av vårt arbetssätt.
        Vi håller er uppdaterade genom hela processen och ser till att
        förutsättningar, tider och utförande är tydliga från start till klart montage.
      `,
    },
    {
      label: "04",
      title: "Representerar ert varumärke",
      desc: `
        Vi arbetar som en naturlig förlängning av ert skylt- eller reklambolag.
        Med ett professionellt bemötande på plats ser vi till att både utförande
        och upplevelse speglar ert varumärke på bästa sätt.
      `,
    },
  ];

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const blocks = gsap.utils.toArray(".benefit-block");

        // Fade-in på varje benefit
        blocks.forEach((block, i) => {
          gsap.fromTo(
            block,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: i * 0.1,
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Bakgrunds-fade på sektionen (gäller alla skärmar)
        gsap.fromTo(sectionRef.current, 
          { backgroundColor: "#fafafa" },
          {
            backgroundColor: "#141414",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            }
          },
        );

        // 🧠 Sticky-vänsterpanel BARA på desktop (lg: min-width: 1024px)
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            if (!sectionRef.current || !leftRef.current) return;

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom 75%",
              pin: leftRef.current,
              pinSpacing: false,
            });
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );


  return (
    <section
      id="fordelar"
      ref={sectionRef}
      className="relative px-4 md:px-12 lg:px-12 max-w-full py-12 md:py-28 lg:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 w-full">
        {/* Vänster – sticky panel */}
        <div
          ref={leftRef}
          className="lg:col-span-1 space-y-6"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-600">
            Så arbetar Centrerat Montage
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa] leading-tight">
            Ett genomtänkt montage
            <span className="block text-emerald-500">gör hela skillnaden.</span>
          </h2>

          <p className="text-[#ebebeb] text-lg leading-relaxed max-w-xl">
            Ett korrekt utfört montage är avgörande för både funktion, hållbarhet och uttryck.
            Vårt arbetssätt säkerställer att skyltlösningen fungerar i verkligheten – inte bara på ritningen.
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
                  document.getElementById("offert")?.scrollIntoView({ 
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

        {/* Höger – scrollande benefits */}
        <div className="lg:col-span-2 space-y-16 w-full">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="benefit-block border-t border-gray-200 pt-12 first:pt-0 first:border-t-0 group"
            >
              <div className="flex items-start gap-10 w-full">
                <div className="flex items-center gap-3">
                  <span className="block w-8 h-px bg-emerald-500"></span>
                  <span className="text-xs md:text-sm font-semibold tracking-widest text-emerald-500">
                    {item.label}
                  </span>
                </div>


                <div className="space-y-4 max-w-3xl">
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#fafafa] group-hover:text-emerald-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#ebebeb] text-lg leading-relaxed whitespace-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenifitsSection;
