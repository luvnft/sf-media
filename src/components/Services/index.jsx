import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";
import crosshair from "../../assets/images/decorations/crosshair.svg";
import circles from "../../assets/images/decorations/circles.svg";
import circleDashed from "../../assets/images/decorations/circleDashed.svg";
import ServicesItem from "./ServicesList/index";
import useScrollRotateAnimation from "../../hooks/useScrollRotateAnimation";
import useIsMobile from "../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const isMobile = useIsMobile();
  useScrollRotateAnimation(styles.circleDashed);

  const decoWordRef = useRef(null);
  const colorSpanRef = useRef(null);
  const servicesListRef = useRef(null);

  useEffect(() => {
    const startTrigger = isMobile ? "top 90%" : "top 80%";
    const endTrigger = isMobile ? "bottom 60%" : "top 20%";
    const decoWord = decoWordRef.current;
    const colorSpan = colorSpanRef.current;
    const servicesList = servicesListRef.current;

    gsap.from(decoWord, {
      scrollTrigger: {
        trigger: decoWord,
        start: startTrigger,
        end: endTrigger,
        scrub: 1,
      },
      y: 50,
      autoAlpha: 0,
      ease: "none",
    });

    gsap.from(colorSpan, {
      scrollTrigger: {
        trigger: colorSpan,
        start: startTrigger,
        end: endTrigger,
        scrub: 1,
      },
      y: 50,
      autoAlpha: 0,
      ease: "none",
    });

    const children = Array.from(servicesList.children);

    children.forEach((child) => {
      gsap.from(child, {
        scrollTrigger: {
          trigger: child,
          start: "top bottom",
          end: "center bottom",
          scrub: 1,
        },
        y: 50,
        autoAlpha: 0,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.set([decoWord, colorSpan, ...children], { clearProps: "all" });
    };
  }, [isMobile]);

  return (
    <section className={styles.services} id="dienstleistungen">
      <div className={styles.container}>
        <div className={styles.servicesIntro}>
          <img className={styles.crosshair} src={crosshair} alt="crosshair decoration" />
          <img className={styles.circleDashed} src={circleDashed} alt="dashed circle decoration" />

          <p className={styles.decoWord} ref={decoWordRef}>
            RNTBNB
          </p>
          <h2>
            <span className="color" ref={colorSpanRef}>
              TRUST
            </span>
            <br /> RNTBNB
          </h2>

          <div className="spacer"></div>

          <p>
            RNTBNB transforms how the world rents by removing outdated middlemen fees, paperwork
            and email threads. RNTBNB charges hosts 10% and rewards RNTers with a 10% discount
            on their future RNTal by leaving a TikTok ReelView.
            <br />
            <br />
            ✅ Zero fake reviews
            ✅ Zero chargeback abuse
            ✅ RNTers create real UGC for every RNTal
            ✅ 100% transparent + verified RNTals
          </p>
        </div>

        <div className={styles.servicesList} ref={servicesListRef}>
          <img className={styles.circles} src={circles} alt="simple circles decoration" />

          {/* REAL ESTATE */}
          <ServicesItem
            title="🏠 Real Estate"
            description="60% of TikTok users discover new brands on the platform — and real estate videos get 3x more engagement than other industries."
          />

          {/* TRAVEL */}
          <ServicesItem
            title="✈️ Travel"
            description="Travel is TikTok's #2 most-watched content category, with vacation rental tours getting 62% more saves than hotel promotions."
          />

          {/* CARS */}
          <ServicesItem
            title="🚗 Cars"
            description="Car rental content on TikTok gets 89% higher engagement than traditional auto ads, with rental walkthrough videos being the most-shared format."
          />

          {/* SERVICES */}
          <ServicesItem
            title="💼 Services"
            description="Service industry TikTok content converts 71% higher than text reviews, with transformation videos reducing customer hesitation by 64%."
          />

          {/* FOOD */}
          <ServicesItem
            title="🍽️ Food"
            description="Restaurant TikTok videos drive 3x more visits than Google reviews, with food tour videos being saved 67% more often."
          />

          {/* BEAUTY */}
          <ServicesItem
            title="💇 Beauty"
            description="Beauty service TikTok videos get 5x more shares than Instagram before/afters, with appointment bookings increasing 82% after video reviews."
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
