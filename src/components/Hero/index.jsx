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
          🏠 <strong>RNTBNB TikTok Rentals</strong>
        </h1>
        <p className={styles.description}>
          🪙 Earn <strong>Bitcoin $RNT</strong> every time you rent. 🎦 Your <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a> video becomes your proof of stay. Follow <a href="https://www.tiktok.com/@rntbnb" target="_blank" rel="noopener noreferrer">
            @RNTBNB
          </a> 📍 All you need: the{" "}
          <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
            What3Words app
          </a>,{" "}
          <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
            Phantom Wallet
          </a>, and a{" "}
          <a href="https://hahz.live" target="_blank" rel="noopener noreferrer">
            HAHZ.LIVE subscription
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
