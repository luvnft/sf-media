import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tick from "../../assets/images/others/tick.svg";
import crosshair from "../../assets/images/decorations/crosshair.svg";
import circleDashed from "../../assets/images/decorations/circleDashed.svg";
import styles from "./WhyUs.module.css";
import useIsMobile from "../../hooks/useIsMobile";
import useScrollRotateAnimation from "../../hooks/useScrollRotateAnimation";

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const isMobile = useIsMobile();
  const decoWordRef = useRef(null);
  const advantagesListRef = useRef(null);
  const colorSpanRef = useRef(null);
  useScrollRotateAnimation(styles.circleDashed);

  useEffect(() => {
    const startTrigger = isMobile ? "top 90%" : "top 70%";
    const endTrigger = isMobile ? "bottom 60%" : "top 20%";

    const advantagesList = advantagesListRef.current;
    const children = Array.from(advantagesList.children).slice(1);

    const decoWord = decoWordRef.current;
    const colorSpan = colorSpanRef.current;

    gsap.fromTo(
      decoWord,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 0.02,
        scrollTrigger: {
          trigger: decoWord,
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      colorSpan,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: colorSpan,
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
        },
      }
    );

    children.forEach((child, index) => {
      gsap.fromTo(
        child,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: child,
            start: startTrigger,
            end: endTrigger,
            scrub: 1,
          },
        }
      );
    });
  }, [isMobile]);

  return (
    <section className={styles.whyUs} id="warum-wir">
      <div className={styles.rightColumn}>
        <img
          className={styles.crosshair}
          src={crosshair}
          alt="crosshair decoration"
        />
        <img
          className={styles.circleDashed}
          src={circleDashed}
          alt="dashed circle decoration"
        />
        <div className={styles.whyUsIntro}>
          <p className={styles.decoWord} ref={decoWordRef}>
            EFFECTS
          </p>
          <h2>
            Create an <br />
            <span className="color" ref={colorSpanRef}>
            Affordable</span> Branded Effect
          </h2>
          <div className="spacer"></div>
          <p className={styles.descriptionIntro}>
             💡 Create a challenge to boost a service or product.<br />
             💡 Create a branded game customers can play while waiting for your service.<br />
             💡 Pay an TikTok influencer to promote your branded AR Effect<br />
            Arvrtise is the top 5% AR Effect creators in the world.<br />
            Studies show creative and immersive content, like AR effects, resonates well with
            younger audiences (Gen Z and Millennials) who are the primary users of TikTok​.
          </p>
        </div>
        <div className={styles.advantagesList} ref={advantagesListRef}>
          <h4>
            The TikTok AR creation process:
          </h4>
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              1️⃣ Show or tell us the effect that you want us to create for you.</p>
          </div>
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>2️⃣ We tell you the cost and turnaround time via email or in a private Arvrtise Discord channel.</p>
          </div>
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
               3️⃣ Review the effect before we publish it to the world. The effect will go live 12 to 24 hours after we publish it.
            </p>
          </div>
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              4️⃣ We will send you the link and QR code once it's live. Anyone can search for the effect name, and we will provide you with analytics every 30 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
