import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import crosshair from "../../assets/images/decorations/crosshair.svg";
import circles from "../../assets/images/decorations/circles.svg";
import circleDashed from "../../assets/images/decorations/circleDashed.svg";
import styles from "./Solutions.module.css";
import SolutionItem from "./SolutionItems/index";
import useIsMobile from "../../hooks/useIsMobile";
import useScrollRotateAnimation from "../../hooks/useScrollRotateAnimation";

gsap.registerPlugin(ScrollTrigger);

const Solutions = () => {
  const solutionsListRef = useRef(null);
  const decoWordRef = useRef(null);
  const colorSpanRef = useRef(null);
  const descriptionIntroRef = useRef(null);
  const isMobile = useIsMobile();

  useScrollRotateAnimation(styles.circleDashed);

  useEffect(() => {
    const solutionsList = solutionsListRef.current;
    if (!solutionsList) return;

    const children = Array.from(solutionsList.children);
    const decoWord = decoWordRef.current;
    const colorSpan = colorSpanRef.current;
    const descriptionIntro = descriptionIntroRef.current;

    const startTrigger = isMobile ? "top 90%" : "top 80%";
    const endTrigger = isMobile ? "bottom 60%" : "top 30%";

    children.forEach((child) => {
      gsap.fromTo(
        child,
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          scrollTrigger: {
            trigger: child,
            start: startTrigger,
            end: endTrigger,
            scrub: 1,
          },
        }
      );
    });

    gsap.fromTo(
      decoWord,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 0.02,
        scrollTrigger: {
          trigger: decoWord,
          start: "top 80%",
          end: "top 30%",
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
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      descriptionIntro,
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: descriptionIntro,
          start: "top center",
          end: "center bottom",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.set([decoWord, colorSpan, descriptionIntro, ...children], {
        clearProps: "all",
      });
    };
  }, [isMobile]);

  return (
    <div className={styles.solutions} id="losungen">
      <img className={styles.crosshair} src={crosshair} alt="crosshair decoration" />
      <img className={styles.circles} src={circles} alt="circles decoration" />
      <img className={styles.circleDashed} src={circleDashed} alt="dashed circle decoration" />

      <div className={styles.solutionsIntro}>
        <p className={styles.decoWord} ref={decoWordRef}>
          SUB
        </p>
        <h2>
          1️⃣ SUBSCRIBE TO{" "}
          <span className="color" ref={colorSpanRef}>
            HAHZ.LIVE{" "}
          </span>
          <br /> TO START
        </h2>

        <div className="spacer"></div>

        <p ref={descriptionIntroRef}>
          <strong>RNTer</strong>
          <br />
          1️⃣ DM <a href="https://tiktok.com/@rntbnb" target="_blank" rel="noopener noreferrer">@RNTBNB</a> on TikTok to receive your Stripe payment link. 
          2️⃣ When you arrive, DM a short video showing the rental + your What3Words location.
          3️⃣ When you leave post your ReelView and tag your Host + @RNTBNB to confirm your stay and release payment to the host.
          <br />
          <br />
          <strong>HOST</strong>
          <br />
          1️⃣ We create a TikTok AR Effect ReelView pinned to your <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">What3Words</a> RNTal location.
          2️⃣ We create a short rental promo reel for your RNTal.
          3️⃣ RNTers post a ReelView as proof-of-stay before payment is released.
          <br />
          <br />
        </p>
      </div>

      <div className={styles.solutionsList} ref={solutionsListRef}>
        <SolutionItem
          title="👻 Phantom Wallet"
          description={
            <>
              Hosts create a digital wallet at{" "}
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
                Phantom.app
              </a>{" "}
              to receive your RNTal payments via USDC.
            </>
          }
        />

        <SolutionItem
          title="📍 What3Words"
          description={
            <>
              Each RNTal location is pinned to a{" "}
              <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
                What3Words
              </a>{" "}
              3 word address ///keep.it.simple that also acts as the RNTal TikTok social media hashtag #KeepItSimple.
            </>
          }
        />

        <SolutionItem
          title="🎙️ ReelView"
          description={
            <>
              Each RNTal has a TikTok AR Effect ReelView pinned to the What3Words address so future RNTers can watch
              all of the past RNTers reviews in the form of a Reel. See an example of a <a href="https://www.tiktok.com/effect/Progress-Residential-2834938852?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">ReelView here.</a> 
            </>
          }
        />

        <SolutionItem
          title="⚡️ Pay"
          description={
            <>
              Hosts are paid with a <a href="https://phantom.com" target="_blank" rel="noopener noreferrer">Phantom</a> wallet USDC airdrop instantly once a ReelView is verified. 
            </>
          }
        />
      </div>
    </div>
  );
};

export default Solutions;
