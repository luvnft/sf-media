import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";
import crosshair from "../../assets/images/decorations/crosshair.svg";
import circles from "../../assets/images/decorations/circles.svg";
import circleDashed from "../../assets/images/decorations/circleDashed.svg";
import ServicesItem from "./ServicesList/index";
import realEstate from "../../assets/images/servicesIcons/real_estate_tiktok.png";
import travel from "../../assets/images/servicesIcons/travel_tiktok.png";
import car from "../../assets/images/servicesIcons/car_tiktok.png";
import crypto from "../../assets/images/servicesIcons/ai_crypto_tiktok.png";
import food from "../../assets/images/servicesIcons/food_tiktok.png";
import beauty from "../../assets/images/servicesIcons/beauty_tiktok.png";
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
      gsap.set([decoWord, colorSpan, ...children], {
        clearProps: "all",
      });
    };
  }, [isMobile]);

  return (
    <section className={styles.services} id="dienstleistungen">
      <div className={styles.container}>
        <div className={styles.servicesIntro}>
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
          <p className={styles.decoWord} ref={decoWordRef}>
            Studio
          </p>
          <h2>
            TikTok
            <br />
            <span className="color" ref={colorSpanRef}>
            Industries
            </span>
          </h2>
          <div className="spacer"></div>
          <p>
            47% of TikTokers use products or services they discovered<br />
            on TikTok – all thanks to the relatability and talent of<br />
            the platform’s many content creators. By leveraging the<br />
            Creator Marketplace, we align your brand with the best content<br />
            or hyper-local content creators to boost your brand.
          </p>
        </div>
        <div className={styles.servicesList} ref={servicesListRef}>
          <img
            className={styles.circles}
            src={circles}
            alt="simple circles decoration"
          />
          <ServicesItem
            icon={<img src={realEstate} alt="Real Estate icon" />}
            title="Real Estate"
            description="Create real estate content that Gen-Z won't fall asleep watching."
          />
          <ServicesItem
            icon={<img src={travel} alt="travel icon" />}
            title="Travel"
            description="Arvrtise partnered with What3Words to create content mapped to a specific 3m x 3m square 3-word address anywhere in the world you can travel to."
          />
          <ServicesItem
            icon={<img src={car} alt="car icon" />}
            title="Cars"
            description="Arvrtise partnered with What3Words to map cars to a specific 3m x 3m square 3-word address on a car lot or on street."
          />
          <ServicesItem
            icon={<img src={crypto} alt="crypto icon" />}
            title="Crypto & AI"
            description="Marketing crypto or AI to the masses isn't easy, we create cool and short explainer trending videos the masses can relate to."
          />
          <ServicesItem
            icon={<img src={food} alt="food icon" />}
            title="Food"
            description="Foodies can scale a small restaurant to a multi-state, medium-sized brand overnight. Let us make that your new reality."
          />
          <ServicesItem
            icon={
              <img src={beauty} alt="beauty icon" />
            }
            title="Beauty"
            description="Create branded hair, beauty or game AR effects that your clients can engage with and share while sitting in your chair. "
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
