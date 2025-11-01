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
          👻 <strong>RENTER — 💟 Tribe Tier</strong>
          <br />
          🎭 Get your TikTok AR ID and match your verified 👻 @ handle.
          <br />
          📍 Every rental you film = <em>Proof of Presence</em> via{" "}
          <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
            What3Words
          </a>{" "}
          verified clips.
          <br />
          🎙️ Post a short <strong>ReelView</strong> and unlock rewards —{" "}
          <strong>Bitcoin $RNT</strong> airdropped by your host.
          <br />
          <br />
          👻 <strong>HOST — ☯️ Ascension Tier</strong>
          <br />
          📍 Unlock your TikTok AR Rental Map Pin linked to your{" "}
          <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
            What3Words
          </a>{" "}
          rental address.
          <br />
          🎙️ Activate your <strong>ReelView Mic</strong> for verified TikTok reel reviews.
          <br />
          🪙 Every rental = a <strong>RNTBNB coin</strong> mapped to your verified location.
          <br />
          🏠 Reward renters in <strong>Bitcoin $RNT</strong> whenever they share a ReelView.
          <br />
          <br />
          💡 <strong>3️⃣ Post Your RNTBNB Listing:</strong> Upload a short TikTok showing your
          rental or item (car, booth, camera, etc.) with a caption like:
          <br />
          <em>
            "Just listed on RNTBNB 📍 ///music.house.vibes — earn Bitcoin $RNT for verified
            stays!"
          </em>
          <br />
          <br />
          💎 Mint{" "}
          <a href="https://uniscan.cc/brc20/%24RNT" target="_blank" rel="noopener noreferrer">
            $RNT
          </a>{" "}
          then sell it in the{" "}
          <a href="https://app.luvnft.com/groups/rntbnb/" target="_blank" rel="noopener noreferrer">
            RNTBNB Tribe
          </a>
          .
        </p>
      </div>

      <div className={styles.solutionsList} ref={solutionsListRef}>
        <SolutionItem
          title="👻 Phantom Wallet"
          description={
            <>
              Set up your wallet at{" "}
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
                Phantom.app
              </a>{" "}
              to receive Bitcoin $RNT rewards from verified stays and ReelViews.
            </>
          }
        />

        <SolutionItem
          title="📍 What3Words"
          description={
            <>
              Each rental location is anchored to a{" "}
              <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
                What3Words
              </a>{" "}
              address — the foundation for both its AR effect and its digital rental identity.
            </>
          }
        />

        <SolutionItem
          title="🎙️ ReelView"
          description={
            <>
              Each rental’s What3Words address powers a TikTok AR effect discoverable by simply
              searching that location. Renters film and post short TikToks or Reels tied to their
              verified address, creating public proof of stay and social engagement.
            </>
          }
        />

        <SolutionItem
          title="🪙 RNTBNB Coin"
          description={
            <>
              Every rental is mapped to its What3Words address through an <strong>$RNTBNB coin</strong>.
              This coin functions as a digital escrow—allowing renters to pay hosts directly and gain
              fractional real estate ownership of the property. It’s a transparent, community-driven way
              to build equity from every verified stay on the{" "}
              <a href="https://hahz.live" target="_blank" rel="noopener noreferrer">
                HAHZ.LIVE
              </a>{" "}
              network.
            </>
          }
        />
      </div>
    </div>
  );
};

export default Solutions;
