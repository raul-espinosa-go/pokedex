import { useState, useEffect } from "react";
import { useOrientation } from "../utils";
import { isMobile, isTablet } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import Github from "../assets/github-mark-white.svg";
import Linkedin from "../assets/InBug-White.png";
import Pokeball from "../assets/pokeball.webp";

import Modal from "@/components/Modal.jsx";

function Index({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const orientation = useOrientation();
  const navigate = useNavigate();

  useEffect(() => {
    // Abre el modal solo si es móvil o tablet
    if ((isMobile || isTablet) && orientation === "portrait") {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGoToPokedex = () => {
    // if (isMobile || isTablet) {
    //   if (document.documentElement.requestFullscreen) {
    //     document.documentElement.requestFullscreen();
    //   } else if (document.documentElement.webkitRequestFullscreen) {
    //     document.documentElement.webkitRequestFullscreen();
    //   } else if (document.documentElement.mozRequestFullScreen) {
    //     document.documentElement.mozRequestFullScreen();
    //   } else if (document.documentElement.msRequestFullscreen) {
    //     document.documentElement.msRequestFullscreen();
    //   }
    // }
    navigate("/pokedex");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-4">
            Welcome to my National Pokedex
          </h2>
          <p className="mb-4">
            This application is optimized for mobile devices and tablets. Please
            rotate it to landscape mode for a better experience.
          </p>
          <button
            className="bg-pokemon-red text-white px-4 py-2 rounded"
            onClick={handleClose}
          >
            Understood
          </button>
        </div>
      </Modal>
      <div
        className={`${className} overflow-hidden h-full flex flex-col justify-center items-center bg-pokemon-red border-8 border-black/20`}
      >
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-radial-[at_25%_25%] from-white to-sky-300 border-4 border-white" />
        <div className="absolute top-4 left-24 w-8 h-8 rounded-full bg-radial-[at_25%_25%] from-white to-pokemon-red to-75% shadow-md/70" />
        <div className="absolute top-4 left-34 w-8 h-8 rounded-full bg-radial-[at_25%_25%] from-white to-pokemon-emerald to-75% shadow-md/70" />
        <div className="absolute top-4 left-44 w-8 h-8 rounded-full bg-radial-[at_25%_25%] from-white to-pokemon-yellow to-75% shadow-md/70" />

        <div className={`flex flex-col items-center justify-center w-1/2`}>
          <h1 className="text-2xl font-bold mb-4">
            Explore the National Pokédex!
          </h1>
          <p className="mb-4">
            Welcome, Trainer! Dive into the world of Pokémon and discover
            detailed info on every known species. Your journey starts here.
          </p>
          <button
            className="chip bg-white text-pokemon-red px-4 py-2"
            onClick={() => handleGoToPokedex()}
          >
            View Pokedex
          </button>
          <div className="flex space-x-4 mt-8">
            <a
              href="https://github.com/raul-espinosa-go/pokedex"
              target="_blank"
              className="chip cursor-pointer"
            >
              <div className="">
                <img
                  src={Github}
                  alt="Github Icon"
                  className="w-4 sm:w-4 md:w-4 lg:w-6"
                />
              </div>
              <p className="text-base md:text-base">Github</p>
            </a>
            <a
              href="https://www.linkedin.com/in/raulespinosagomez/"
              target="_blank"
              className="chip cursor-pointer"
            >
              <div className="">
                <img
                  src={Linkedin}
                  alt="Github Icon"
                  className="w-4 sm:w-4 md:w-4 lg:w-6"
                />
              </div>
              <p className="text-base md:text-base">Linkedin</p>
            </a>
          </div>
        </div>

        <div className="chip absolute bottom-4 w-3/4 h-4 bg-black/20 inset-shadow-sm inset-shadow-black/40" />
      </div>
    </>
  );
}

export default Index;
