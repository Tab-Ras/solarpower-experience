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
      title: "Lägre elkostnader",
      desc: `
        Genom att producera din egen el minskar du direkt mängden energi du behöver köpa från elbolaget.
        Med solceller får du en mer förutsägbar månadskostnad och kan skydda dig mot framtida prisökningar.
        Överskottet du inte använder själv kan dessutom säljas tillbaka till nätet – vilket gör din anläggning
        till en aktiv tillgång istället för en passiv kostnad.
      `,
    },
    {
      label: "02",
      title: "Ökat fastighetsvärde",
      desc: `
        Ett hem med solceller upplevs som mer modernt, genomtänkt och kostnadseffektivt. För många köpare är
        lägre driftkostnader och hållbar energiförsörjning ett starkt argument vid bostadsköp. En installerad
        solcellsanläggning kan därför göra din villa mer attraktiv på marknaden och bidra till ett högre slutpris
        den dag du väljer att sälja.
      `,
    },
    {
      label: "03",
      title: "Miljövänligt – på riktigt",
      desc: `
        Solenergi är en av de renaste energikällorna vi har. Varje kilowattimme du själv producerar minskar behovet
        av el från fossila bränslen och bidrar till lägre koldioxidutsläpp. För många av våra kunder handlar det inte
        bara om ekonomi – utan om att ta ett konkret steg mot ett mer hållbart sätt att leva, här och nu.
      `,
    },
    {
      label: "04",
      title: "Stöd, bidrag & smart finansiering",
      desc: `
        Det finns flera möjligheter till ekonomiskt stöd när du investerar i solceller, till exempel grönt avdrag
        för installation av solceller, batteri och laddbox. Vi hjälper dig att reda ut vad som gäller, vilka nivåer
        du kan räkna med och hur du på bästa sätt kombinerar bidrag, eventuell finansiering och egen insats för att
        få en lönsam helhet.
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
        gsap.to(sectionRef.current, {
          backgroundColor: "#141414",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        });

        // 🧠 Sticky-vänsterpanel BARA på desktop (lg: min-width: 1024px)
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            if (!sectionRef.current || !leftRef.current) return;

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom 60%",
              pin: leftRef.current,
              pinSpacing: false,
            });
          },

          // (valfritt) på mobil gör vi ingenting med pin
          "(max-width: 1023px)": () => {
            // ingen pin här – vänster text scrollar normalt
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
      className="bg-[#fafafa] px-4 md:px-12 lg:px-12 max-w-full py-12 md:py-28 lg:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 w-full">
        {/* Vänster – sticky panel */}
        <div
          ref={leftRef}
          className="lg:col-span-1 space-y-6"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-600">
            Fördelar
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa] leading-tight">
            Varför solenergi
            <span className="block text-emerald-500">gör skillnad.</span>
          </h2>
          <p className="text-[#ebebeb] text-lg leading-relaxed max-w-xl">
            Med solenergi skapar du en trygg, hållbar och kostnadseffektiv elförsörjning.
            Det är en investering som påverkar både din ekonomi, ditt hem och vår gemensamma framtid.
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
