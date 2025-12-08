import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

import ref1 from "../assets/ref1.jpg";
import ref2 from "../assets/ref2.jpg";
import ref3 from "../assets/ref3.jpg";

gsap.registerPlugin();

const ReferencesSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const projects = [
    {
      id: "01",
      src: ref1,
      alt: "Villa med solcellsanläggning",
      title: "Villa i Sollentuna",
      location: "Sollentuna",
      type: "Takmonterad anläggning",
      client: "Privatkund",
      description:
        "Takmonterad lösning på 10 kW med integrerad batterilagring. Optimerad för jämn förbrukning över dygnet och maximal besparing vid höga elpriser.",
    },
    {
      id: "02",
      src: ref2,
      alt: "Takinstallation i kvällssol",
      title: "Radhus i Västerås",
      location: "Västerås",
      type: "Radhuslänga – energirenovering",
      client: "Bostadsrättsförening",
      description:
        "6 kW solcellsanläggning anpassad för västläge. Fokus på produktion när hushållen är som mest aktiva – eftermiddag och kväll.",
    },
    {
      id: "03",
      src: ref3,
      alt: "Solpaneler på modern byggnad",
      title: "Fritidshus i Skåne",
      location: "Österlen",
      type: "Off-grid-lösning",
      client: "Privatkunder",
      description:
        "Solceller, batteri och hybridväxelriktare skapar en nästan helt självförsörjande energilösning året runt.",
    },
  ];

  const active = projects[activeIndex];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  // GSAP ANIMATIONS
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".project-title",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".project-visual",
          { opacity: 0, x: direction === 1 ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".project-info",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [activeIndex, direction] }
  );

  return (
    <section
      id="referenser"
      className="py-28 bg-[#141414] px-4 md:px-12 lg:px-12 max-w-full min-h-screen"
    >
      <div ref={sectionRef} className="w-full">

        {/* RUBRIK */}
        <div className="mb-16 space-y-3">
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-500">
            Referenser
          </p>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#fafafa]">
            Tidigare projekt
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* TITLE LEFT */}
          <div className="lg:col-span-3 project-title">
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-[#fafafa] leading-tight">
              {active.title}
            </h3>
          </div>

          {/* IMAGE */}
          <div className="lg:col-span-5 project-visual">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src={active.src}
                alt={active.alt}
                className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* TEXT RIGHT */}
          <div className="lg:col-span-4 space-y-4 project-info">
            <div className="space-y-1 text-sm uppercase tracking-wide text-emerald-600">
              <p>Plats</p>
              <p className="text-[#fafafa]">{active.location}</p>

              <p className="mt-4">Typ av projekt</p>
              <p className="text-[#fafafa]">{active.type}</p>

              <p className="mt-4">Kund</p>
              <p className="text-[#fafafa]">{active.client}</p>
            </div>

            <p className="text-lg leading-relaxed mt-6 text-[#ebebeb]">
              {active.description}
            </p>
          </div>

        </div>

        {/* NAVIGATION */}
        <div className="border-t border-gray-300 mt-16 pt-6 flex items-center justify-between text-sm text-[#ebebeb]">

          {/* LEFT: COUNTER + ARROWS */}
          <div className="flex items-center gap-6">

            <span className="text-gray-500">
              [{activeIndex + 1}/{projects.length}]
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-gray-300 hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <HiArrowNarrowLeft className="text-xl" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-gray-300 hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <HiArrowNarrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
