import { useState, useEffect } from "react";
import { useOrientation } from "../utils";
import { isMobile, isTablet } from "react-device-detect";

import Modal from "@/components/Modal.jsx";

function Index({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const orientation = useOrientation();

  useEffect(() => {
    // Abre el modal solo si es móvil o tablet
    if ((isMobile || isTablet) && orientation === "portrait") {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isMobile || isTablet) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-4">Welcome to my National Pokedex</h2>
          <p className="mb-4">
            This application is optimized for mobile devices and tablets.
            Please rotate it to landscape mode for a better experience.
          </p>
          <button
            className="bg-pokemon-red text-white px-4 py-2 rounded"
            onClick={handleClose}
          >
            Understood
          </button>
        </div>
      </Modal>
    );
  }
}

export default Index;
