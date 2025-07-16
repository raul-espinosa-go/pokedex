import Github from "../assets/github-mark-white.svg";
import Linkedin from "../assets/InBug-White.png";

function Footer({ className }) {
  return (
    <footer className={`items-center bg-footer-background z-10 ${className}`}>
      <div className="py-3 flex flex-row justify-end items-center gap-12 pr-8">
        <a href="https://github.com/raul-espinosa-go/pokedex" _blank="true" className="flex flex-row items-center gap-2 text-white font-normal text-xl cursor-pointer">
          <div className="bg-console-button rounded p-2 shadow-hard-short shadow-black/60">
            <img src={Github} alt="Github Icon" className="w-6" />
          </div>
          <p>Github</p>
        </a>
        <a href="https://www.linkedin.com/in/raulespinosagomez/" _blank="true" className="flex flex-row justify-center items-center gap-2 text-white font-normal text-xl cursor-pointer">
          <div className="bg-console-button rounded p-2 shadow-hard-short shadow-black/60">
            <img src={Linkedin} alt="Github Icon" className="w-6" />
          </div>
          <p>Linkedin</p>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
