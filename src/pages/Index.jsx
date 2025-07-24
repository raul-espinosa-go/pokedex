import { useState, useEffect } from "react";
import { useOrientation } from "../utils";
import { isMobile, isTablet } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import Github from "../assets/github-mark-white.svg";
import Linkedin from "../assets/InBug-White.png";

import Modal from "@/components/Modal.jsx";

function Index({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const orientation = useOrientation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      ((isMobile || isTablet) && orientation === "portrait") ||
      (!isMobile && !isTablet)
    ) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const setFullscreen = () => {
    const elem = document.documentElement;

    // Verifica si el navegador soporta el modo pantalla completa
    if (!document.fullscreenEnabled) {
      console.warn(
        "⚠️ Pantalla completa no soportada o bloqueada por políticas."
      );
      return;
    }

    // Si ya estamos en pantalla completa, salir
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("❌ Error al salir de pantalla completa:", err.message);
      });
      return;
    }

    // Si no estamos en pantalla completa, entrar
    elem.requestFullscreen().catch((err) => {
      console.error("❌ Error al activar pantalla completa:", err.message);
    });
  };

  const handleGoToPokedex = () => {
    if (isMobile || isTablet) {
      setFullscreen();
    }
    navigate("/pokedex");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-4 text-center lg:p-8">
          <h2 className="text-xl font-bold mb-4 lg:text-4xl">
            Welcome to my National Pokédex!
          </h2>
          {isMobile || isTablet ? (
            <>
              <p className="mb-4 lg:text-lg">
                This application is optimized for mobile devices and tablets.
                Please rotate it to landscape mode for a better experience.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4 lg:text-lg">
                This application works fine on desktop devices. However, my
                recommendation is to use it in full screen mode on a mobile
                device for a better experience.
              </p>
            </>
          )}
          <p className="lg:text-lg">
            Thank you for your understanding and enjoy exploring the Pokédex!
          </p>
          <button
            className="bg-pokemon-red text-white px-4 py-2 rounded mt-4 cursor-pointer"
            onClick={handleClose}
          >
            Understood
          </button>
        </div>
      </Modal>

      <div
        className={`${className} h-dvh w-dvw flex flex-col items-center justify-center bg-pokemon-red border-black/20 md:border-8 lg:border-16`}
      >
        {/* Decorative Lights */}
        <div className="fixed top-8 left-8 w-full h-full pointer-events-none flex flex-col gap-4">
          <div className="w-16 h-16 md:w-16 md:h-16 rounded-full bg-radial-[at_25%_25%] from-white to-sky-300 border-4 border-white shadow-md/70 sm:top-6 sm:left-6 sm:w-20 sm:h-20 lg:top-10 lg:left-10 lg:w-32 lg:h-32" />
          <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-radial-[at_25%_25%] from-white to-pokemon-red to-75% shadow-md/70 sm:top-6 sm:left-28 sm:w-10 sm:h-10 lg:top-10 lg:left-48 lg:w-16 lg:h-16" />
          <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-radial-[at_25%_25%] from-white to-pokemon-emerald to-75% shadow-md/70 sm:top-6 sm:left-38 sm:w-10 sm:h-10 lg:top-10 lg:left-68 lg:w-16 lg:h-16" />
          <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-radial-[at_25%_25%] from-white to-pokemon-yellow to-75% shadow-md/70 sm:top-6 sm:left-48 sm:w-10 sm:h-10 lg:top-10 lg:left-88 lg:w-16 lg:h-16" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
            Explore my National Pokédex!
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg mb-4 text-center">
            This Pokédex is a personal project, based on Pokémon Scarlet &
            Violet Pokédex. Not affiliated with the official Pokémon brand.
          </p>
          <button
            className="chip bg-white text-pokemon-red px-3 py-1 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 cursor-pointer font-semibold text-sm sm:text-base md:text-lg lg:text-xl hover:animate-breath transition-colors duration-300"
            onClick={handleGoToPokedex}
          >
            View Pokédex
          </button>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8 sm:mt-0 md:mt-4 lg:mt-10 items-center">
            <a
              href="https://github.com/raul-espinosa-go/pokedex"
              target="_blank"
              className="chip cursor-pointer"
            >
              <div className="flex items-center justify-center p-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                <img
                  src={Github}
                  alt="Github Icon"
                  className="w-4 sm:w-5 md:w-6 lg:w-8"
                />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                  Github
                </p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/raulespinosagomez/"
              target="_blank"
              className="chip cursor-pointer"
            >
              <div className="flex items-center justify-center p-2 gap-2 sm:gap-4">
                <img
                  src={Linkedin}
                  alt="Linkedin Icon"
                  className="w-4 sm:w-5 md:w-6 lg:w-8"
                />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                  Linkedin
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Shadow Bar */}
        <div className="chip fixed sm:right-4 sm:h-11/12 sm:w-2 md:right-4 md:h-11/12 md:w-4 lg:bottom-8 lg:w-11/12 lg:h-4 lg:right-auto bg-black/20 inset-shadow-sm inset-shadow-black/40" />
      </div>
    </>
  );
}

export default Index;
