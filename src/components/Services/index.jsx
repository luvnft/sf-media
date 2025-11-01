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
              Tokenized Real Estate
            </span>
            <br /> The Future of Trust in Rentals
          </h2>

          <div className="spacer"></div>

          <p>
            RNTBNB transforms how the world rents, buys, and stays — by verifying every host,
            renter, and property through{" "}
            <strong>Phantom Wallet</strong> instead of paperwork, email threads, or leases.
            <br />
            <br />
            Each rental is <strong>tokenized and mapped</strong> to its unique{" "}
            <a href="https://what3words.com" target="_blank" rel="noopener noreferrer">
              What3Words
            </a>{" "}
            address, solving modern housing issues such as:
            <br />
            <br />
            🧠 <strong>AI Deepfake Prevention:</strong> Every rental and renter is verified on-chain
            through a real wallet signature, not a fake ID or photo.
            <br />
            🚫 <strong>Anti-Fraud & Anti-Squatting:</strong> Tokens confirm true ownership and
            occupancy — no fake listings or hijacked leases.
            <br />
            💎 <strong>No Paperwork:</strong> Payments, contracts, and receipts are stored directly
            in both host and renter wallets.
            <br />
            🌍 <strong>Housing Crisis Solution:</strong> Fractionalized ownership lets anyone invest
            in real properties, creating community-based housing opportunities.
          </p>
        </div>

        <div className={styles.servicesList} ref={servicesListRef}>
          <img className={styles.circles} src={circles} alt="simple circles decoration" />

          {/* REAL ESTATE */}
          <ServicesItem
            icon={<img src={realEstate} alt="Real Estate icon" />}
            title="🏠 Real Estate"
            description="The new era of leasing and rentals. Each property is mapped to a What3Words address and represented as an $RNTBNB coin — letting anyone rent, verify, or invest in fractional real estate directly through Phantom Wallet."
          />

          {/* TRAVEL */}
          <ServicesItem
            icon={<img src={travel} alt="travel icon" />}
            title="✈️ Travel"
            description="Hotels and Airbnb-style hosts can map their What3Words locations to accept Bitcoin $RNT or $USDC for bookings. Every verified stay creates a ReelView proof-of-travel clip and earns rewards for both guest and host."
          />

          {/* CARS */}
          <ServicesItem
            icon={<img src={car} alt="car icon" />}
            title="🚗 Cars"
            description="Car owners can map their vehicle’s location to a What3Words address and rent it out for Bitcoin $RNT. GPS verification ensures authenticity, and renters receive fractional tokens for verified returns."
          />

          {/* SERVICES */}
          <ServicesItem
            icon={<img src={crypto} alt="services icon" />}
            title="💼 Services"
            description="If you provide a local service — like photography, plumbing, or lawn care — you can rent your time and skill mapped to your What3Words area. Clients pay in $RNT or $USDC and verified bookings unlock $RNT rewards."
          />

          {/* FOOD */}
          <ServicesItem
            icon={<img src={food} alt="food icon" />}
            title="🍽️ Food"
            description="Restaurants can map each table to a What3Words address — letting customers rent private dining spaces for events, VIP dinners, or birthdays. Each booking rewards both the host and guest in Bitcoin $RNT."
          />

          {/* BEAUTY */}
          <ServicesItem
            icon={<img src={beauty} alt="beauty icon" />}
            title="💇 Beauty"
            description="Salons can map individual chairs to What3Words addresses. Renters pay in $USDC or $RNT, and stylists can reward clients with $RNT for completing bookings, leaving verified reviews, or sharing TikTok ReelViews."
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
