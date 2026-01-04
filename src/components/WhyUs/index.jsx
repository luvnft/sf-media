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

    children.forEach((child) => {
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
    <section className={styles.whyUs} id="why-us">
      <div className={styles.rightColumn}>
        <img className={styles.crosshair} src={crosshair} alt="crosshair decoration" />
        <img className={styles.circleDashed} src={circleDashed} alt="dashed circle decoration" />

        <div className={styles.whyUsIntro}>
          <p className={styles.decoWord} ref={decoWordRef}>
            REELVIEW
          </p>
          <h2>
            🎙️ EVERY RNTAL HAS A {" "}
            <span className="color" ref={colorSpanRef}>
              REELVIEW
            </span>
          </h2>

          <div className="spacer"></div>

          <p className={styles.descriptionIntro}>
            🎙️ We solved the biggest problem with traditional rental apps not keeping it real when it comes to their rental reviews
            with a new social transparent TikTok AR effect review called ReelView. 
            <br /><br />
            Each ReelView Mic is pinned to a What3Words address (for example 📍///keep.it.simple) — that exact 3-word location is the
            name of the ReelView and the TikTok hashtag for the RNTal is #…
          </p>
        </div>

        <div className={styles.advantagesList} ref={advantagesListRef}>
          <h4>How to Earn Bitcoin $RNT</h4>

          {/* STEP 1 */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              1️⃣ Click the{" "}
              <a
                href="https://www.tiktok.com/@rntbnb"
                target="_blank"
                rel="noopener noreferrer"
              >
                @RNTBNB
              </a>{" "}
              bio link, then tap the magic 🪄 wand icon to find your RNTal What3Words address ReelView Mic.
            </p>
          </div>

          {/* STEP 2 */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              2️⃣ Record a short ReelView showing the conditions of your RNTal and vibes. 
              AR mic. Tag both your host and{" "}
              <a
                href="https://www.tiktok.com/@rntbnb"
                target="_blank"
                rel="noopener noreferrer"
              >
                @RNTBNB
              </a>{" "}
              and include your What3Words hashtag in the caption — that's your proof of stay.
            </p>
          </div>

          {/* STEP 3 */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              3️⃣ Once your post is live, your host and RNTBNB team verify your ReelView video
              to confirm the location and timestamp.
            </p>
          </div>

          {/* STEP 4 - Added missing step */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              4️⃣ After verification, you'll receive Bitcoin $RNT tokens directly to your 
              Phantom wallet as a reward for your honest review!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
