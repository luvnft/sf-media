import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Impressum from "../Impressum/Impressum";

function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleModalOpen = (modalName) => {
    setActiveModal(modalName);
    setIsClosing(false);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const handleModalClose = () => {
    setIsClosing(true);
    document.body.style.overflow = "unset"; // Re-enable scrolling
    
    setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
    }, 300); // Match this with CSS transition duration
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) { // ESC key
        handleModalClose();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [activeModal]);

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const legalLinks = [
    { name: "1️⃣ HAHZ.LIVE", modal: "Impressum", href: "https://hahz.live" }
  ];

  const externalLinks = [
    { 
      name: "@RNTBNB", 
      href: "https://tiktok.com/@rntbnb",
      icon: "🎵"
    }
  ];

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <p className={styles.copyright}>
            ©2025 RNTBNB all rights reserved
          </p>
          <p className={styles.credits}>
            <a 
              href="https://blkluv.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              powered by <span className={styles.brandName}>BLKLUV.ORG</span>
              <span className={styles.brandDot}>.</span>
            </a>
          </p>
        </div>

        {/* Links Section */}
        <div className={styles.linksSection}>
          {/* Legal Links */}
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>Start</span>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.modal}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.legalLink}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>Connect</span>
            <ul className={styles.linkList}>
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    <span className={styles.linkIcon}>{link.icon}</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced Modal Component */}
      {(activeModal && !isClosing) && (
        <div 
          className={`${styles.modalOverlay} ${isClosing ? styles.modalClosing : ''}`}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={activeModal}
        >
          <div 
            className={`${styles.modalContent} ${isClosing ? styles.modalContentClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.closeButton}
              onClick={handleModalClose}
              aria-label="Close modal"
            >
              <span className={styles.closeIcon}>×</span>
            </button>
            
            <div className={styles.modalBody}>
              {activeModal === "Impressum" && <Impressum />}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
