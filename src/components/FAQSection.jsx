import { useRef, useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Vilka typer av uppdrag utför ni?",
      a: "Vi arbetar främst med montage, service och survey inom skyltbranschen. Det kan handla om fasadskyltar, invändig skyltning, foliemontage samt demontering och justering av befintliga lösningar.",
    },
    {
      q: "Arbetar ni direkt mot slutkund?",
      a: "Nej, vårt fokus ligger på att vara montagepartner åt skyltföretag. Vi fungerar som en förlängning av er organisation ute på plats.",
    },
    {
      q: "I vilka områden arbetar ni?",
      a: "Vi utgår från Östergötland men tar uppdrag även i angränsande regioner beroende på projektets omfattning.",
    },
    {
      q: "Utför ni survey innan montage?",
      a: "Ja. Vid behov erbjuder vi platsbesök där vi mäter, dokumenterar och bedömer förutsättningar inför montage. Detta minskar risken för överraskningar längre fram i processen.",
    },
    {
      q: "Hur snabbt kan ni vara på plats?",
      a: "Det beror på uppdragets omfattning, men vi strävar alltid efter snabb återkoppling och smidig planering. Vid serviceärenden försöker vi ofta lösa det med kort varsel.",
    },
  ];

  useGSAP(
    () => {
      gsap.from(".faq-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#fafafa] px-4 md:px-12 lg:px-12 py-20 md:py-32"
      id="faq"
    >
      <div>
        {/* Heading */}
        <div className="mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-emerald-600">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Bra att veta
            <span className="block text-emerald-500">innan vi kör igång.</span>
          </h2>
        </div>

        {/* FAQ list */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="faq-item border-t border-gray-200 pt-6"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between text-left gap-6 group"
                >
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {item.q}
                  </h3>

                  <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 group-hover:border-emerald-500 group-hover:text-emerald-600 transition-all">
                    {isOpen ? <HiMinus /> : <HiPlus />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
