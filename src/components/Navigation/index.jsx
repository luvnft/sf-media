import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navigation.module.css";
import logo from "../../assets/images/rntbnb_logo.svg";
import "gsap/ScrollTrigger";
import { gsap } from "gsap";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const textRef = useRef(null);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "FOLLOW 📲@RNTBNB",
      href: "https://tiktok.com/@rntbnb",
      emoji: "📲",
      color: "#FF0050" // TikTok pink
    },
    {
      name: "DL 📍WHAT3WORDS",
      href: "https://what3words.com",
      emoji: "📍",
      color: "#FF6B35" // Orange
    },
    {
      name: "DL 👻 PHANTOM",
      href: "https://phantom.com",
      emoji: "👻",
      color: "#AB68FF" // Phantom purple
    }
  ];

  const handleExternalLink = (href) => {
    window.open(href, "_blank", "noopener noreferrer");
    setIsOpen(false);
  };

  const handleMouseMove = useCallback(
    (e) => {
      const isScreenLarge = window.matchMedia("(min-width: 768px)").matches;
      if (isOpen || !toggleRef.current || !textRef.current || !isScreenLarge)
        return;
      const rect = toggleRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveBy = (value) => (value < -1 ? 8 : value > 1 ? -8 : 0);

      gsap.to([toggleRef.current, textRef.current], {
        x: moveBy(x),
        y: moveBy(y),
        duration: 0.4,
        ease: "Power0.easeOut",
      });
    },
    [isOpen]
  );

  const handleMouseLeave = () => {
    gsap.to([toggleRef.current, textRef.current], {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "Power0.easeOut",
    });
  };

  useEffect(() => {
    const handleAnimation = () => {
      const childEls = Array.from(menuRef.current.children[0].children);
      gsap.fromTo(
        [menuRef.current, menuRef.current.children[0], ...childEls],
        { y: isOpen ? 50 : 0, opacity: isOpen ? 0 : 1 },
        {
          y: isOpen ? 0 : 50,
          opacity: isOpen ? 1 : 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (!isOpen) {
              menuRef.current.style.display = "none";
              gsap.to([toggleRef.current, textRef.current], {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: "Power0.easeOut",
              });
            }
          },
        }
      );
    };
    if (
      menuRef.current &&
      menuRef.current.children &&
      menuRef.current.children.length > 0
    ) {
      handleAnimation();
    }
  }, [isOpen]);

  return (
    <nav className={styles.nav} aria-label="breadcrumb">
      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="RNTBNB logo" />
        </a>
      </div>
      <div
        className={styles.toggle}
        onClick={toggleIsOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={toggleRef}
      >
        {isOpen ? (
          <div className={styles.cursorX}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        ) : (
          <p className={styles.text} ref={textRef}>
            <span className={styles.textSpan}>ME</span>
            <span className={styles.textSpan}>NU</span>
            <span className={styles.dot}>•</span>
          </p>
        )}
      </div>
      {isOpen && (
        <div className={styles.menu} ref={menuRef}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className={styles.menuListItem}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  className={styles.menuItem}
                  onClick={() => handleExternalLink(item.href)}
                  aria-label={item.name}
                  style={{
                    '--hover-color': item.color,
                    transform: hoveredIndex === index ? 'translateY(-2px)' : 'none',
                    boxShadow: hoveredIndex === index 
                      ? `0 10px 30px -10px ${item.color}40` 
                      : '0 4px 20px -4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className={styles.menuItemContent}>
                    <span className={styles.emoji}>{item.emoji}</span>
                    <span className={styles.menuText}>
                      {item.name}
                    </span>
                  </div>
                  <div className={styles.menuItemHover} />
                  <div className={styles.arrow}>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
