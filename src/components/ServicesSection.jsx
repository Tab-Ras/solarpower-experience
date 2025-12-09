import { useRef } from "react";
import { FaSolarPanel, FaBatteryFull } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiArrowNarrowRight } from "react-icons/hi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import serviceSolar from "../assets/service-solar.webp";
import serviceBattery from "../assets/service-battery.webp";
import serviceConsult from "../assets/service-consult.webp";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);

  const services = [
    {
      icon: FaSolarPanel,
      title: "Solcellsinstallation",
      desc: `
        Våra certifierade installatörer säkerställer att dina solpaneler placeras optimalt
        för maximal effekt året runt. Vi hanterar allt: projektering, montering, eldragning
        och driftsättning. Målet är en lösning som är estetiskt tilltalande, energismart
        och framtidssäkrad.
      `,
      image: serviceSolar,
    },
    {
      icon: FaBatteryFull,
      title: "Batterilösningar",
      desc: `
        Med moderna energilager kan du spara överskottsel och använda den när elpriserna
        är som högst – eller vid strömavbrott. Vi erbjuder batterier med lång livslängd,
        hög säkerhet och smart styrning för dig som vill öka din självförsörjning.
      `,
      image: serviceBattery,
    },
    {
      icon: HiOutlineChatBubbleLeftRight,
      title: "Rådgivning & Offert",
      desc: `
        Är solceller rätt för dig? Vi tar fram en skräddarsydd energikalkyl baserat på
        takets förutsättningar, din nuvarande förbrukning och framtida behov. Tydliga
        svar, inga tomma löften – bara ärlig rådgivning.
      `,
      image: serviceConsult,
    },
  ];

useGSAP(
  () => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray(".service-block");

      blocks.forEach((block, index) => {
        const textEl = block.querySelector(".service-text");
        const textParallax = block.querySelector(".service-text-wrapper");
        const parallaxEl = block.querySelector(".service-image-parallax");

        const fromTextX = index % 2 === 0 ? -40 : 40;

        // Text reveal
        gsap.from(textEl, {
          opacity: 0,
          x: fromTextX,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 50%",
          },
        });
        if (textParallax) {
          gsap.fromTo(
            textParallax,
            { y: 60, skewY: index % 2 === 0 ? 2 : -2 },
            {
              y: -60,
              skewY: 0,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top 50%",
                end: "bottom 90%",
                scrub: true,
              },
            }
          );
        }

        // Parallax på bilden inuti clip-path
        if (parallaxEl) {
          gsap.fromTo(
            parallaxEl,
            { y: 60 },   // start lite ned
            {
              y: -60,    // sluta lite upp
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                // markers: true, // slå på om du vill se triggrarna
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  },
  { scope: sectionRef }
);



  return (
    <section
      id="tjanster"
      ref={sectionRef}
      className="bg-[#fafafa] px-4 md:px-12 lg:px-12 py-12 md:py-28 lg:py-32"
    >
      <div className="max-w-full ">
        <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-600 mb-24 uppercase">
          Vad vi erbjuder
        </h2>

        <div className="space-y-36">
          {services.map((item, index) => {
            const Icon = item.icon;
            const reverse = index % 2 === 1;

            return (
              <div
                key={index}
                className="service-block grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[75vh]"
              >
                {/* TEXT */}
                <div className={`service-text-wrapper relative mx-auto ${reverse ? "md:order-2 md:text-right" : "md:order-1"}`}>
                  <div className="service-text space-y-6 will-change-transform">
                  

                    <div className="inline-flex items-center gap-3 text-emerald-500 text-xs tracking-[0.2em] uppercase">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Tjänst {index + 1}</span>
                    </div>

                    <div
                      className={`flex items-center gap-3 ${
                        reverse ? "md:justify-end" : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Icon className="text-2xl" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className={`text-gray-700 text-lg leading-relaxed max-w-xl whitespace-normal ${
                        reverse ? "md:ml-auto" : ""
                      }`}
                    >
                      {item.desc}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (window.lenis) {
                            window.lenis.scrollTo('#kontakt', {
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
                          Kontakta oss
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
                </div>

                {/* BILD */}
                <div
                  className={`service-image relative h-72 sm:h-80 md:h-[600px] ${
                    reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="service-image-inner w-full h-full overflow-hidden">
                    {/* Clip-path wrapper – står still */}
                    <div className="w-full h-full overflow-hidden [clip-path:polygon(90%_0,100%_15%,100%_90%,75%_90%,52%_100%,0_100%,0_55%,10%_35%,10%_0)] relative">
                      {/* Detta lager rör sig med GSAP */}
                      <div className="service-image-parallax absolute inset-[-5%]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
