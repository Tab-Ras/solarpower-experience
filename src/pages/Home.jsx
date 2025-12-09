import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "../components/Navbar";
import LandingReveal from "../components/LandingReveal";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import SavingsCalculatorSection from "../components/SavingsCalculatorSection";
import BenifitsSection from "../components/BenifitsSection";
import ReferencesSection from "../components/ReferencesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const ctaSectionRef = useRef(null);
  const ctaTextRef = useRef(null);

  useGSAP(
    () => {
      const section = ctaSectionRef.current;
      const text = ctaTextRef.current;
      if (!section || !text) return;

      // 🔥 Bakgrund fade: #141414 -> #fafafa
      gsap.to(section, {
        backgroundColor: "#fafafa",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center+=200",   // börja faden ungefär när sektionen är mitt i viewport
          end: "bottom bottom",  // klar när botten närmar sig botten av viewport
          scrub: true,           // koppla animationen till scroll (smooth)
        },
      });

      // 📌 Pin / "fastna i mitten" på texten
      ScrollTrigger.create({
        trigger: section,
        start: "center center",  // när mitten av sektionen når mitten av viewport
        end: "bottom bottom",    // hur länge texten sitter fast
        pin: text,               // pinna själva textblocket
        pinSpacing: false,       // lägg inte extra space efter
      });
    },
    { scope: ctaSectionRef }
  );

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BenifitsSection />

      {/* CTA-sectionen med scroll-effekter */}
      <section
        ref={ctaSectionRef}
        className="h-[200vh] bg-[#141414] px-6 flex flex-col justify-center items-center"
        >
        <div ref={ctaTextRef} className="mix-blend-difference text-center">
          <span className="text-md tracking-wide uppercase text-[#fafafa] mb-6 block">
            Låt oss
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-[#fafafa] leading-tight">
            sätta din energi
            <br />
            i rörelse.
          </h2>
        </div>
      </section>

      <SavingsCalculatorSection />
      <ReferencesSection />
      <ContactSection />
      <Footer />
      <LandingReveal />
    </>
  );
};

export default Home;
