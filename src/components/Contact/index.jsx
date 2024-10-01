import React from "react";
import styles from "./Contact.module.css";
import instagram_icon from "../../assets/images/contactIcons/instagram.svg";
import tiktok_icon from "../../assets/images/contactIcons/tiktok.svg"; // Update to the correct TikTok icon path
import logo from "../../assets/images/atok.svg";
import ContactForm from "./ContactForm/index";

function Contact() {
  return (
    <section className={styles.contact} id="kontakt">
      <div className={styles.container}>
        <div className={styles.company_info}>
          <div className={styles.logo}>
            <img src={logo} alt="atok Logo" />
          </div>
          <div className={styles.contact_info}>
            <div className={styles.social_media}>
              <div className={styles.social_icon}>
                <a
                  href="https://www.tiktok.com/@arvrtise" // Update this with your TikTok link
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={tiktok_icon} alt="tiktok icon" />
                </a>
              </div>
              <div className={styles.social_icon}>
                <a
                  href="https://www.instagram.com/sfmedia_agentur/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagram_icon} alt="instagram icon" />
                </a>
              </div>
              <div className={styles.social_icon}></div>
            </div>
          </div>
        </div>
        <div className={styles.contact_form}>
          <h2 className={styles.form_title}>
              Contact us <br /> to <span>learn more</span>
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
