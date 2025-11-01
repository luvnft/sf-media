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
           🎙️ Every RNTal Comes With a TikTok AR{" "}
          <span className="color" ref={colorSpanRef}>
              ReelView
          </span>{" "}
              Mic Mapped to Its What3Words Address
          </h2>

          <div className="spacer"></div>

          <p className={styles.descriptionIntro}>
            🎙️ The <strong>ReelView Mic</strong> is a special TikTok AR Effect given to every rental
            on <strong>RNTBNB</strong>. It’s like a digital microphone that appears on TikTok once
            your stay is verified.
            <br />
            <br />
            🎙️ Each ReelView Mic is <strong>tethered to a What3Words address</strong> (for example,
            <em> ///keep.it.simple</em>) — that exact 3-word location is where your AR filter lives
            on TikTok.
            <br />
            <br />
            🎙️ The What3Words hashtag used for your ReelView is called a{" "}
            <strong>HAHZtag</strong>. It matches your location and helps connect your video to your
            verified stay — turning every rental review into proof of presence.
            <br />
            <br />
            💡 In short: each rental = one AR effect, one W3W address, and one way to earn Bitcoin
            rewards for sharing honest, verifiable experiences.
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
              bio link, then tap the magic 🪄 wand icon to find your rental’s What3Words address and its
              matching ReelView Mic.
            </p>
          </div>

          {/* STEP 2 */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              2️⃣ Record a short <strong>ReelView</strong> (up to 11 seconds) using your rental’s
              AR mic. Tag both your host and{" "}
              <a
                href="https://www.tiktok.com/@rntbnb"
                target="_blank"
                rel="noopener noreferrer"
              >
                @RNTBNB
              </a>{" "}
              and include your What3Words hashtag in the caption — that’s your proof of stay.
            </p>
          </div>

          {/* STEP 3 */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              3️⃣ Once your post is live, your host and RNTBNB team verify your ReelView video to
              confirm the location and timestamp. Verified posts automatically qualify for{" "}
              <strong>Bitcoin $RNT rewards</strong>.
            </p>
          </div>

          {/* STEP 4 */}
          <div className={styles.advantageItem}>
            <div className={styles.advantageIcon}>
              <img src={tick} alt="tick icon" />
            </div>
            <p>
              4️⃣ If you loved the experience, you can invest in that property’s{" "}
              <strong>RNTBNB Coin</strong> — a digital share mapped to the same What3Words address.
              Share your ReelView again to boost its visibility and grow your ownership over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
