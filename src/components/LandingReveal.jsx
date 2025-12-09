import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LandingReveal = () => {
  const overlayRef = useRef(null);

  useGSAP(() => {
    const overlay = overlayRef.current;

    // Hero-element globalt
    const heroHeading = document.querySelector(".hero-heading");
    const heroSubtext = document.querySelector(".hero-subtext");
    const heroCta = document.querySelector(".hero-cta");

    const heroTargets = [heroHeading, heroSubtext, heroCta].filter(Boolean);

    // Dölj hero från start
    gsap.set(heroTargets, { autoAlpha: 0, y: 30 });

    // Init-state för clipPath overlay
    gsap.set(overlay, {
      clipPath: "inset(0% 0% 0% 0%)",
    });

    gsap.set(heroHeading, {
      clipPath: "inset(0% 0% 100% 0%)",
    });

    // -------------------------
    // ⭐ MAIN TIMELINE
    // -------------------------
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Reveal text inside overlay
    tl.fromTo(
      ".reveal-kicker",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        ".reveal-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.3"
      )

      // -------------------------
      // 🟩 OVERLAY EXIT CLIP-PATH
      // -------------------------
      .to(
        overlay,
        {
          clipPath: "inset(0% 10% 100% 10%)", // glider uppåt men med mask
          duration: 1.2,
          ease: "power4.inOut",
        }
      )
      .set(overlay, { display: "none" })

      // -------------------------
      // ✨ HERO CONTENT IN
      // -------------------------
      .to(
        heroHeading,
        { autoAlpha: 1, y: 0, duration: 0.9, clipPath: "inset(0% 0% 0% 0%)" },
        "-=0.5"
      )
      .to(
        heroSubtext,
        { autoAlpha: 1, y: 0, duration: 0.7 },
        "-=0.6"
      )
      .to(
        heroCta,
        { autoAlpha: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );
  }, []);

  return (
    <>
      {/* Reveal overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-999 bg-black text-[#f5f5f5] flex items-center justify-center px-6"
      >
        <div className="reveal-inner text-center space-y-4">
          <p className="reveal-kicker text-xs tracking-[0.3em] uppercase text-gray-400">
            Solenergi AB
          </p>
          <h1 className="reveal-title text-4xl md:text-6xl font-semibold leading-tight">
            Grön energi
            <span className="block text-emerald-400">för framtidens hem.</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default LandingReveal;
