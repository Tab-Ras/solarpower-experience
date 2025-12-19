import { useRef } from 'react';
import { HiOutlineAdjustmentsHorizontal, HiOutlineShieldCheck, HiOutlineArrowsPointingOut } from 'react-icons/hi2';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Kicker / rubrik
        gsap.from('.about-kicker', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        });

        // Stora raden
        gsap.from('.about-lead', {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        });

        // Andra paragrafen
        gsap.from('.about-sub', {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 25%',
          },
        });

        // Ikon-korten – stagger
        gsap.from('.about-card', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 10%',
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="om-oss"
      ref={sectionRef}
      className="bg-[#fafafa] px-4 md:px-12 lg:px-24 xl:px-12 py-12 md:py-28 lg:py-32"
    >
      <div className="max-w-full">
        <h2 className="about-kicker text-1xl font-bold text-emerald-600 leading-tight mb-16 uppercase">
          Vilka vi är
        </h2>

        <p className="about-lead text-4xl lg:text-6xl text-gray-800 leading-none mb-12 max-w-5xl">
          Centrerat Montage är specialiserade på montage av skyltar och folie i professionella miljöer.
        </p>

        <p className="about-sub text-lg text-gray-800 leading-tight mb-36 max-w-2xl">
          Vi arbetar som montagepartner åt skyltföretag och levererar säkra, effektiva och noggrant utförda installationer.
          Oavsett om det gäller fasadskyltar, invändig skyltning eller foliemontage arbetar vi strukturerat och lösningsorienterat – alltid med fokus på precision och slutresultat.
        </p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-6xl mx-auto">
          {[
            {
              nr: "01",
              title: "Erfaren montagepartner",
              text: "Vi arbetar uteslutande mot skyltbranschen – med fokus på kvalitet, struktur och ansvar i varje uppdrag.",
              icon: HiOutlineAdjustmentsHorizontal,
            },
            {
              nr: "02",
              title: "Noggrant & säkert",
              text: "Planering, mätning och montage utförs metodiskt och enligt gällande branschstandard.",
              icon: HiOutlineShieldCheck,
            },
            {
              nr: "03",
              title: "Flexibla uppdrag",
              text: "Vi hanterar både enstaka montage och långsiktiga samarbeten med skyltföretag.",
              icon: HiOutlineArrowsPointingOut,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.nr}
                className={`
                  group relative
                  border-t border-gray-200 pt-8
                  transition-transform duration-500
                  hover:-translate-y-2 about-card
                  ${item.nr === '02' ? 'md:-translate-y-16' : ''}
                `}
              >
                {/* Background number */}
                <span className="absolute -top-6 right-0 text-[6rem] font-bold text-emerald-100 pointer-events-none">
                  {item.nr}
                </span>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 z-10">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
                  {item.text}
                </p>

                {/* Hover divider */}
                <span
                  className="
                    block mt-8 h-px w-0 bg-emerald-500
                    transition-all duration-500
                    group-hover:w-full
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
