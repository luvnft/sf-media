import React, { useState, useRef } from "react";
import styles from "./ContactForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false); // Nowy stan

  const SITE_KEY = import.meta.env.VITE_REACT_APP_SITE_KEY;

  const captchaRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const handleInputChange = (event) => {
    setShowRecaptcha(true); // Pokaż reCAPTCHA po wpisaniu wartości
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const recaptchaValue = captchaRef.current.getValue();
    if (!recaptchaValue) {
      alert("Please validate the reCAPTCHA.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://tok.arvrtise.com/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaValue }),
      });

      if (response.status === 200) {
        setIsFormSubmitted(true);
        setIsFormError(false);
        formRef.current.reset();
        setFormData({
          name: "",
          firstname: "",
          email: "",
          phonenumber: "",
          message: "",
        });
      } else {
        setIsFormError(true);
      }
    } catch (error) {
      setIsFormError(true);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      className={styles.form_fields}
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className={styles.row_fields}>
        <div className={styles.form_field}>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Business Name"
            className={styles.form_input}
            required
          />
        </div>
        <div className={styles.form_field}>
          <input
            type="text"
            id="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
            className={styles.form_input}
            required
          />
        </div>
        <div className={styles.form_field}>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-mail"
            className={styles.form_input}
            required
          />
        </div>
        <div className={styles.form_field}>
          <input
            type="tel"
            id="phonenumber"
            value={formData.phonenumber}
            onChange={handleInputChange}
            placeholder="Phone"
            className={styles.form_input}
            required
          />
        </div>
      </div>
      <div className={styles.form_field}>
        <textarea
          type="text"
          id="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="4"
          placeholder="message"
          className={styles.form_input}
          required
        ></textarea>
      </div>
      {isSubmitting && <div className={styles.form_submitting}>Senden...</div>}
      {isFormSubmitted && !isFormError && (
        <div className={styles.form_success}>
          Thank you very much for submitting the form!
        </div>
      )}
      {isFormError && (
        <div className={styles.form_error}>
          Something went wrong. Please try again later.
        </div>
      )}
      {showRecaptcha && (
        <div className={styles.recaptcha_container}>
          <ReCAPTCHA sitekey={SITE_KEY} ref={captchaRef} />
        </div>
      )}
      <div className={styles.btn_send}>
        <button type="submit" value="Submit" disabled={isSubmitting}>
          Send
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
