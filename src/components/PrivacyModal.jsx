import { HiX } from "react-icons/hi";

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-3xl w-full max-h-[80vh] overflow-y-auto bg-[#141414] text-[#fafafa] rounded-2xl p-8 md:p-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white transition"
          aria-label="Stäng"
        >
          <HiX />
        </button>

        <div className="space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-400">
            Integritetspolicy
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold">
            Så hanterar vi dina personuppgifter
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[#ebebeb] leading-relaxed">
            <p>
              Centrerat Montage Östgöta AB värnar om din personliga integritet.
              Vi behandlar personuppgifter i samband med offertförfrågningar
              via denna webbplats.
            </p>

            <p>
              <strong>Personuppgiftsansvarig:</strong><br />
              Centrerat Montage Östgöta AB<br />
              E-post: info@centrerat.se<br />
              Telefon: 073-537 57 65
            </p>

            <p>
              <strong>Vilka uppgifter samlas in?</strong><br />
              Vid offertförfrågan kan vi samla in företagsnamn, kontaktperson,
              e-postadress, telefonnummer samt information om uppdraget.
            </p>

            <p>
              <strong>Syfte:</strong><br />
              Uppgifterna används enbart för att hantera och besvara din
              offertförfrågan samt kommunicera kring uppdraget.
            </p>

            <p>
              <strong>Lagring:</strong><br />
              Personuppgifter sparas endast så länge det är nödvändigt för
              ärendet eller enligt gällande lagkrav.
            </p>

            <p>
              <strong>Dina rättigheter:</strong><br />
              Du har rätt att begära information, rättelse eller radering av
              dina personuppgifter. Kontakta oss via info@centrerat.se.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
