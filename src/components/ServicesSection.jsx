import { useRef } from "react";
import { FaSolarPanel, FaBatteryFull } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiArrowNarrowRight } from "react-icons/hi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import serviceMontage from "../assets/service-montage.webp";
import serviceService from "../assets/service-service.webp";
import serviceConsult from "../assets/service-consult.webp";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);

  const services = [
    {
      icon: FaSolarPanel,
      title: "Montage",
      desc: `
        Vi utför professionellt montage av skyltar i alla typer av miljöer – fasad, butik,
        inomhusmiljöer och offentliga platser. Varje uppdrag genomförs med fokus på korrekt
        infästning, exakt linjering och ett slutresultat som håller över tid.
        
        Vi arbetar metodiskt enligt gällande krav och förutsättningar på plats, oavsett om
        det gäller nyproduktion, omprofilering eller kompletterande montage.
      `,
      image: serviceMontage,
    },
    {
      icon: FaBatteryFull,
      title: "Service",
      desc: `
        Vi erbjuder löpande service, justering och demontering av befintlig skyltning.
        Det kan handla om allt från mindre korrigeringar till större ombyggnationer
        eller anpassningar i samband med förändrade behov.
        
        Med snabba inställelsetider och tydlig återkoppling fungerar vi som en pålitlig
        servicepartner för skyltföretag som behöver en trygg lösning ute på fältet.
      `,
      image: serviceService,
    },
    {
      icon: HiOutlineChatBubbleLeftRight,
      title: "Survey",
      desc: `
        Inför varje montage erbjuder vi noggranna platsbesök och förarbete.
        Vi mäter, dokumenterar och bedömer underlag, infästningsmöjligheter och tekniska
        förutsättningar för att säkerställa ett smidigt genomförande.
        
        Surveyarbetet ger ett tydligt beslutsunderlag och minskar risken för överraskningar
        längre fram i processen – både för beställare och montör.
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
          const textWrapper = block.querySelector(".service-text-wrapper");

          const fromX = index % 2 === 0 ? -40 : 40;

          // Text reveal
          gsap.from(textEl, {
            opacity: 0,
            x: fromX,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 55%",
            },
          });

          // Text parallax
          if (textWrapper) {
            gsap.fromTo(
              textWrapper,
              { y: 40 },
              {
                y: -40,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top 40%",
                  end: "bottom 70%",
                  scrub: true,
                },
              }
            );
          }

          const img = block.querySelector(".service-img");

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.12, opacity: 0.85 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
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
      <div className="max-w-full">
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
                <div
                  className={`service-text-wrapper relative mx-auto ${
                    reverse ? "md:order-2 md:text-right" : "md:order-1"
                  }`}
                >
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
                          document
                            .getElementById("kontakt")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="
                          group relative inline-flex items-center overflow-hidden 
                          rounded-full bg-emerald-500 text-white 
                          text-xs md:text-sm tracking-[0.25em] uppercase 
                          px-8 py-3 transition-all duration-500 cursor-pointer
                        "
                      >
                        <span className="absolute inset-0 -z-10 scale-x-0 origin-left bg-black transition-transform duration-500 group-hover:scale-x-100" />

                        <span className="transition-transform duration-500 group-hover:-translate-x-1">
                          Kontakta oss
                        </span>

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 ml-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-45">
                          <HiArrowNarrowRight className="text-base" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* IMAGE */}
                <div
                  className={`service-image relative ${
                    reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  {/* Clip wrapper (stabil) */}
                  <div className="service-image-clip relative w-full aspect-video md:aspect-3/4 lg:aspect-video rounded-2xl overflow-hidden isolate transform-gpu">
                    {/* Parallax layer (större än clip-rutan) */}
                    <div className="service-image-parallax absolute inset-0 will-change-transform">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="service-img w-full h-full object-cover will-change-transform"
                        draggable="false"
                      />
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
