import { useState } from "react";

import Github from "../assets/github-mark-white.svg";
import Linkedin from "../assets/InBug-White.png";
import Info from "@/components/icons/Info.jsx";
import Modal from "@/components/Modal.jsx";

import styles from "./Layout.module.css";

function Footer({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-4 ">
          <h2 className="text-xl font-bold mb-4 text-center">
            Welcome to my National Pokedex
          </h2>
          <p className="mb-4">
            This application is for educational purposes, showcasing my
            knowledge of React, Vite, and Tailwind CSS. It is not affiliated
            with the official Pokémon API or any Pokémon entities.
          </p>
          <p>
            All data and images used in this project are fetched from the{" "}
            <a
              className="text-pokemon-blue underline"
              href="https://pokeapi.co/"
            >
              PokéAPI
            </a>
            .
          </p>
          <p>
            "Pokemon Type Icon" images have been sourced from{" "}
            <a
              className="text-pokemon-blue underline"
              href="https://www.wikidex.net/wiki/Tipo"
            >
              Wikidex
            </a>
            .
          </p>
        </div>
      </Modal>
      <footer
        className={`items-center z-10 ${className} ${styles.background} border-t-4 border-pokemon-yellow`}
      >
        <div className="py-3 sm:py-1 flex flex-row justify-end items-center gap-8 px-8">
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
          <button
            className="chip cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Info className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
            <p className="text-base md:text-base">Info</p>
          </button>
        </div>
      </footer>
    </>
  );
}

export default Footer;
