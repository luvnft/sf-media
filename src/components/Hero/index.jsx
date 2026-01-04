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
      // Run only on desktop
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
          🏠 <strong>RNTBNB TIKTOK RENTALS</strong>
        </h1>
        <p className={styles.description}>
            Hosts earn more and renters pay no middleman fees. 🎦 Your RNTal is confirmed by a TikTok Reel — funds release after your TikTok ReelView is posted. Follow and DM <a href="https://www.tiktok.com/@rntbnb" target="_blank" rel="noopener noreferrer">
            @RNTBNB
          </a> to RNT. Download the 📍{" "}
          <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
            What3Words app
          </a> 👻 {" "}
          <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
            Phantom Wallet app
          </a>.<br />
          {" "}
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
