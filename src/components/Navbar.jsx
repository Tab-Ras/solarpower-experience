import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const sections = [
  { id: "om-oss", label: "Om oss" },
  { id: "tjanster", label: "Tjänster" },
  { id: "fordelar", label: "Arbetssätt" },
  { id: "rakna", label: "Begär offert" },
  // { id: "referenser", label: "Projekt" },
  // { id: "footer", label: "Kontakt" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (isOpen) {
      // lås scroll (för icke-lenis browsers)
      html.style.overflow = "hidden";

      // stoppa lenis
      if (window.lenis) window.lenis.stop();
    } else {
      // återställ scroll
      html.style.overflow = "";

      // starta lenis igen
      if (window.lenis) window.lenis.start();
    }

    return () => {
      html.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* TOP NAV */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-black/70 border-b border-white/10"
            : "bg-transparent"
        } ${isOpen ? "hidden" : " "} `}
      >
        <div className="flex items-center justify-between px-4 md:px-12 lg:px-12 py-4">
          {/* LOGO / BRAND */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500" />
            <div className="flex flex-col leading-tight transition-colors duration-500">
                <span
                    className={`
                    text-xs tracking-[0.25em] uppercase 
                    transition-colors duration-500
                    ${isScrolled ? "text-gray-300" : "text-black"}
                    `}
                >
                    Centrerat
                </span>

                <span
                    className={`
                    text-sm transition-colors duration-500
                    ${isScrolled ? "text-white" : "text-gray-700"}
                    `}
                >
                    Montage Östgöta AB
                </span>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav
            className={`hidden lg:flex items-center gap-10 text-[0.8rem] tracking-[0.25em] transition-colors duration-500 
                ${isScrolled ? "text-white" : "text-black"}
                `}
            >
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative overflow-hidden group"
                >
                <span
                    className={`relative z-10 transition-colors duration-300 uppercase cursor-pointer
                    ${isScrolled ? "group-hover:text-white" : "group-hover:text-black"}
                    `}
                >
                    {item.label}
                </span>

                <span
                    className="
                    absolute left-0 bottom-0 h-px w-full scale-x-0 origin-left 
                    transition-transform duration-300 group-hover:scale-x-100 
                    bg-emerald-600"
                />
                </button>
            ))}
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <button
            className={`
              lg:hidden text-2xl transition-colors duration-300
              ${isScrolled ? "text-white" : "text-black"}
            `}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Öppna meny"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY MENU – alltid i DOM */}
      <div
        className={`
          fixed inset-0 z-40
          ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        <div
          className={`
            menu-clip
            bg-black text-white fixed inset-0
            ${isOpen ? "menu-clip-open" : ""}
          `}
        >
          <div className="flex flex-col h-full px-4 md:px-12 lg:px-12 py-4">
            {/* Top row (logo + close) */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs tracking-[0.25em] uppercase text-gray-300">
                    Centrerat
                  </span>
                  <span className="text-sm text-gray-100">Montage
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl"
                aria-label="Stäng meny"
              >
                <HiX />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center gap-6">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-3xl md:text-4xl font-semibold text-left group"
                >
                  <span className="block group-hover:text-emerald-400 transition-colors duration-300">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom small info */}
            <div className="text-xs text-gray-400 flex justify-between items-center pb-4">
              <span>© {new Date().getFullYear()} Centrerat Montage</span>
              <span className="tracking-[0.25em] uppercase">Meny</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
