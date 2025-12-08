// src/utils/gsapSetup.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ⚡ Global standardinställningar (kan tweakas)
export const initGsap = () => {
  ScrollTrigger.defaults({
    markers: false,
    toggleActions: "play none none reverse",
  });

  return gsap;
};

// 🔄 Valfri koppling mot Lenis (om du använder smooth scroll)
export const connectLenisWithGsap = (lenis) => {
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};
