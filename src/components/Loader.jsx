import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Pokeball from "@/assets/pokeball.webp";

import styles from "./Loader.module.css";

gsap.registerPlugin(useGSAP);

function Loader({ show, onComplete }) {
  const containerRef = useRef(null);
  const redRef = useRef(null);
  const whiteRef = useRef(null);
  const pokeballRef = useRef(null);
  const backgroundRef = useRef(null);

  const [hasEntered, setHasEntered] = useState(false);

  useGSAP(() => {
    const entryTl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.out" },
      onComplete: () => {
        setHasEntered(true);
      },
    });

    entryTl
      .fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0
      )
      .fromTo(redRef.current, { xPercent: -100 }, { xPercent: 0 }, 0)
      .fromTo(whiteRef.current, { xPercent: 100 }, { xPercent: 0 }, 0)
      .fromTo(
        pokeballRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );
  }, []);

  useEffect(() => {
    if (!show && hasEntered) {
      const exitTl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power2.in" },
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
          onComplete?.();
        },
      });

      exitTl
        .to(pokeballRef.current, { scale: 0, opacity: 0 }, 0)
        .to(redRef.current, { xPercent: -100 }, 0.2)
        .to(whiteRef.current, { xPercent: 100 }, 0.2)
        .to(backgroundRef.current, { opacity: 0, duration: 0.2 }, "-=0.3");
    }
  }, [show, hasEntered, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 h-dvh overflow-hidden"
    >
      <div>
        <div
          ref={backgroundRef}
          className="absolute left-0 top-0 w-full inset-0 bg-pokemon-black"
        ></div>
      </div>
      <div
        ref={redRef}
        className="absolute left-0 top-0 w-1/2 h-full border-r-4 bg-pokemon-red"
      ></div>
      <div
        ref={whiteRef}
        className="absolute right-0 top-0 w-1/2 h-full border-l-4 bg-pokemon-white"
      ></div>
      <img
        ref={pokeballRef}
        src={Pokeball}
        alt="Loading..."
        className={`${styles["drop-shadow"]} w-24 h-24 z-10 relative animate-breath`}
      />
    </div>
  );
}

export default Loader;
