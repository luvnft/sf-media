import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Home.module.css";
import HeroCollection from "./heroCollection/index";
import useIsMobile from "../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const homeRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      // Only run this code on desktop
      const tl = gsap.timeline();
      const dimension = "width";
      const direction = "x";

      tl.to(homeRef.current, {
        [direction]: () =>
          `-${containerRef.current.getBoundingClientRect()[dimension]}px`,
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: homeRef.current,
        animation: tl,
        scrub: 1,
        pin: true,
      });

      return () => {
        scrollTrigger.kill();
      };
    }
  }, [isMobile]);

  return (
    <div ref={homeRef} className={styles.home} id="startseite">
      <div className={styles.intro}>
        <h1 className={styles.title}>
          Short Viral
          <br /> TikTok Creators
        </h1>
        <p className={styles.description}>
          🎬 Cut raw video footage into cool 60-second reels.<br />
          🎮 Branded AR effects 📣 Ad campaigns 🔥 Branded CapCut Memes
        </p>
      </div>
      <div className={styles.hero}>
        <div className={styles.container} ref={containerRef}>
          <HeroCollection isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default Home;
