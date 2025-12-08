import { useState, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HiLightningBolt, HiHome, HiSun } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const formatNumber = (value) =>
  new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 }).format(
    value || 0
  );

const formatCurrency = (value) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(value || 0);

const SavingsCalculatorSection = () => {
  const sectionRef = useRef(null);
  const savingsRef = useRef(null);
  const previousSavingsRef = useRef(0);
  const hasEnteredRef = useRef(false); // koll om sektionen har synts än

  // Inputs
  const [annualUsage, setAnnualUsage] = useState(12000); // kWh/år
  const [electricityPrice, setElectricityPrice] = useState(1.8); // kr/kWh
  const [roofFactor, setRoofFactor] = useState(0.9); // 0.7–1.0

  // Beräkningar
  const results = useMemo(() => {
    const coverageRatio = 0.6;          // solcellerna täcker ca 60% av förbrukningen
    const specificYield = 950;          // kWh/kW & år
    const selfUseRatio = 0.7;           // hur mycket du använder själv
    const feedInPriceFactor = 0.6;      // ersättning för såld el ~60% av elpris
    const costPerKw = 13000;            // ca pris per kW

    const systemSizeKw = ((annualUsage * coverageRatio) / specificYield) / roofFactor;
    const annualProduction = systemSizeKw * specificYield * roofFactor;

    const usedOnSite = annualProduction * selfUseRatio;
    const soldToGrid = annualProduction * (1 - selfUseRatio);

    const savingFromSelfUse = usedOnSite * electricityPrice;
    const revenueFromGrid = soldToGrid * electricityPrice * feedInPriceFactor;

    const totalSavings = savingFromSelfUse + revenueFromGrid;
    const investment = systemSizeKw * costPerKw;
    const paybackYears = investment / (totalSavings || 1);

    return {
      systemSizeKw,
      annualProduction,
      totalSavings,
      paybackYears,
      investment,
    };
  }, [annualUsage, electricityPrice, roofFactor]);

  // ScrollTrigger: fade/slide in sektion + kort
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Fade in hela sektionen
        gsap.from(".calc-section-inner", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            onEnter: () => {
              hasEnteredRef.current = true;
            },
          },
        });

        // Result cards
        gsap.from(".calc-result-card", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
          },
        });

        // Liten “shine” på savings-kortet när vi scrollar in
        gsap.fromTo(
          ".savings-card",
          { scale: 0.97, boxShadow: "0 0 0 rgba(0,0,0,0)" },
          {
            scale: 1,
            boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  // Count-up på besparing – triggas när sektionen har varit i view
  useGSAP(
    () => {
      if (!savingsRef.current) return;

      // Om sektionen inte synts än: skriv bara ut värdet utan animation
      if (!hasEnteredRef.current) {
        savingsRef.current.textContent = formatCurrency(results.totalSavings);
        previousSavingsRef.current = results.totalSavings;
        return;
      }

      const from = previousSavingsRef.current || 0;
      const to = results.totalSavings || 0;

      const obj = { value: from };
      gsap.to(obj, {
        value: to,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          savingsRef.current.textContent = formatCurrency(obj.value);
        },
      });

      previousSavingsRef.current = to;
    },
    { dependencies: [results.totalSavings] }
  );

  return (
    <section
      ref={sectionRef}
      id="rakna"
      className="py-32 bg-[#fafafa] px-4 md:px-12 lg:px-12 max-w-full"
    >
      <div className="calc-section-inner w-full">
        {/* HEADER */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-600">
              Kalkylator
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 leading-tight">
              Räkna på din
              <span className="block text-emerald-500">solcellsbesparing.</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Justera reglagen efter din situation och få en uppskattning av hur mycket
              du kan spara per år med solceller – och hur snabbt investeringen kan betala sig.
            </p>
          </div>

          <div className="calc-result-card savings-card bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-sm max-w-md">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500 mb-2">
              Uppskattad årlig besparing
            </p>
            <p
              ref={savingsRef}
              className="text-3xl md:text-4xl font-semibold text-gray-900"
            >
              {formatCurrency(results.totalSavings)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Baserat på dina inställningar. Den faktiska besparingen kan variera.
            </p>
          </div>
        </div>

        {/* GRID: sliders + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: SLIDERS */}
          <div className="space-y-10">
            {/* Årlig elförbrukning */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <HiHome className="text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Årlig elförbrukning
                  </p>
                  <p className="text-sm text-gray-800">
                    {formatNumber(annualUsage)} kWh / år
                  </p>
                </div>
              </div>

              <input
                type="range"
                min={5000}
                max={30000}
                step={500}
                value={annualUsage}
                onChange={(e) => setAnnualUsage(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>5 000 kWh</span>
                <span>30 000 kWh</span>
              </div>
            </div>

            {/* Elpris */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <HiLightningBolt className="text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Elpris
                  </p>
                  <p className="text-sm text-gray-800">
                    {electricityPrice.toFixed(2)} kr / kWh
                  </p>
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={electricityPrice}
                onChange={(e) => setElectricityPrice(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>1,00 kr</span>
                <span>3,00 kr</span>
              </div>
            </div>

            {/* Takets solförutsättningar */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <HiSun className="text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Takets solförutsättningar
                  </p>
                  <p className="text-sm text-gray-800">
                    {roofFactor === 1
                      ? "Mycket bra (syd, liten skugga)"
                      : roofFactor >= 0.85
                      ? "Bra"
                      : "Okej – viss skugga eller sämre riktning"}
                  </p>
                </div>
              </div>

              <input
                type="range"
                min={0.7}
                max={1}
                step={0.05}
                value={roofFactor}
                onChange={(e) => setRoofFactor(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>Okej</span>
                <span>Mycket bra</span>
              </div>
            </div>
          </div>

          {/* RIGHT: RESULT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 calc-result-card">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
                  Rek. anläggningsstorlek
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {results.systemSizeKw > 0
                    ? `${results.systemSizeKw.toFixed(1)} kW`
                    : "–"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Grov uppskattning baserad på att solcellerna täcker cirka 60% av din
                årsförbrukning.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
                  Årlig produktion
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {results.annualProduction > 0
                    ? `${formatNumber(results.annualProduction)} kWh`
                    : "–"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Baserat på typiskt svenskt klimat och takets förutsättningar.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
                  Investeringsnivå (ca)
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {results.investment > 0
                    ? formatCurrency(results.investment)
                    : "–"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Exempelberäkning innan bidrag och grönt avdrag. Exakt pris får du i
                en personlig offert.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
                  Återbetalningstid (ca)
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {results.paybackYears > 0
                    ? `${results.paybackYears.toFixed(1)} år`
                    : "–"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Beräknat utifrån uppskattad årlig besparing. Tiden kan bli kortare med
                stöd/bidrag och högre elpris.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculatorSection;
