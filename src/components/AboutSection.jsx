import { useRef } from 'react';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { FaLeaf, FaHome } from 'react-icons/fa';

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
          Vi hjälper villaägare att sänka sina elkostnader och minska sitt klimatavtryck med smarta, hållbara solcellslösningar.
        </p>

        <p className="about-sub text-lg text-gray-800 leading-tight mb-36 max-w-2xl">
          Vår styrka ligger i helhetslösningen – från första rådgivning till färdig installation – med full service och långsiktigt ansvar. Allt paketerat med kvalitet, trygghet och personlig kontakt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          <div className="about-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <HiOutlineWrenchScrewdriver className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">+10 års erfarenhet</h3>
            </div>
            <p className="text-gray-700 text-lg leading-snug">
              Vi har installerat solceller åt hundratals hushåll runtom i Sverige – från söder till norr.
            </p>
          </div>

          <div className="about-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaLeaf className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">100% grönt fokus</h3>
            </div>
            <p className="text-gray-700 text-lg leading-snug">
              Vår affärsidé är enkel: gör det lätt att välja miljövänlig energi – utan krångel.
            </p>
          </div>

          <div className="about-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaHome className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Allt under ett tak</h3>
            </div>
            <p className="text-gray-700 text-lg leading-snug">
              Projektering, installation, garanti & service – vi sköter allt. Du lutar dig tillbaka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
