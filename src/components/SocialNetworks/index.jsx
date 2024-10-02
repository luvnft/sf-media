import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialNetworks.module.css";
import tiktok from "../../assets/images/socialBelt/tiktok.svg";
import useIsMobile from "../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const SocialNetworks = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = containerRef.current;
    const children = Array.from(container.children);

    children.forEach((child, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: child,
          start: isMobile ? "top 90%" : "top 80%",
          end: isMobile ? "bottom 60%" : "top 20%",
          scrub: 1,
        },
      });

      tl.fromTo(
        child,
        { x: -100, autoAlpha: 0 },
        {
          delay: i * 0.2,
          x: 0,
          autoAlpha: 1,
          ease: "power3.out",
        }
      )
        .to(child, { y: -10, yoyo: true, repeat: 1, duration: 0.2 }, "+=0.2")
        .to(child, { y: 0, duration: 0.2 });
    });
  }, [isMobile]);

  return (
    <div className={styles.socialNetworks} ref={containerRef}>
      <a href="https://www.tiktok.com/@arvrtise" target="_blank" rel="noopener noreferrer">
        <div>
          <img src={tiktok} alt="tiktok icon" />
        </div>
      </a>
    </div>
  );
};

export default SocialNetworks;
