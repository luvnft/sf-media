import React from "react";
import styles from "./Contact.module.css";
import tiktok_icon from "../../assets/images/contactIcons/tiktok.svg";
import logo from "../../assets/images/rntbnb_logo.svg";

function Contact() {
  // Add TikTok embed script dynamically
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className={styles.contact} id="kontakt">
      <div className={styles.container}>
        <div className={styles.company_info}>
          <div className={styles.logo}>
            <img src={logo} alt="rntbnb_logo" />
          </div>
          <div className={styles.contact_info}>
            <div className={styles.social_media}>
              <div className={styles.social_icon}>
                <a
                  href="https://www.tiktok.com/@rntbnb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={tiktok_icon} alt="tiktok icon" />
                </a>
              </div>
            </div>
          </div>
          
          {/* TikTok Embed Section */}
          <div className={styles.tiktok_embed}>
            <blockquote 
              className="tiktok-embed" 
              cite="https://www.tiktok.com/@rntbnb" 
              data-unique-id="rntbnb" 
              data-embed-type="creator" 
              style={{ maxWidth: '780px', minWidth: '288px' }}
            >
              <section>
                <a 
                  target="_blank" 
                  href="https://www.tiktok.com/@rntbnb?refer=creator_embed"
                  rel="noreferrer"
                >
                  @rntbnb
                </a>
              </section>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
