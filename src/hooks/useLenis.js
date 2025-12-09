import { useEffect } from "react";
import Lenis from "lenis";
import { connectLenisWithGsap } from "../utils/gsapSetup";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    // 🟢 Gör Lenis global så att Navbar kan stoppa/starta den
    window.lenis = lenis;

    connectLenisWithGsap(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      // Cleanup vid unmount
      if (window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, []);
};
