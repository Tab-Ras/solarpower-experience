import { useEffect } from "react";
import Lenis from "lenis";
import { connectLenisWithGsap } from "../utils/gsapSetup";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    connectLenisWithGsap(lenis);  // 🔥 synkar GSAP + Lenis

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
};

