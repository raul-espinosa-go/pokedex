import Github from "../assets/github-mark-white.svg";
import Linkedin from "../assets/InBug-White.png";

import styles from "./Layout.module.css";

function Footer({ className }) {
  return (
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
      </div>
    </footer>
  );
}

export default Footer;
