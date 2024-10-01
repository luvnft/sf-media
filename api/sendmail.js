import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.VITE_REACT_APP_EMAIL_USERNAME,
    pass: process.env.VITE_REACT_APP_EMAIL_PASSWORD,
  },
});

// Function to create mail options for incoming messages
const createMailOptions = (name, firstname, email, phonenumber, message) => ({
  from: `${name} <${email}>`,
  to: process.env.VITE_REACT_APP_RECEIVING_EMAIL,
  subject: "New Text Message for SF Media",
  html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
                <h2 style="margin-bottom: 0;">New Message from ${name} ${firstname}</h2>
            </div>
            <div style="background-color: #fff; padding: 20px; color: #495057;">
                <h3 style="border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">Contact Information:</h3>
                <ul>
                    <li><b>Email:</b> ${email}</li>
                    <li><b>Phone Number:</b> ${phonenumber}</li>
                </ul>
                <h3 style="border-bottom: 1px solid #e9ecef; padding-bottom: 10px; margin-top: 20px;">Message:</h3>
                <p>${message}</p>
            </div>
        </div>
    `,
});

// Function to create reply options for sending confirmation emails
const createReplyOptions = (name, firstname, email, message) => ({
  from: `Arvrtise Tok | Your Social Media Agency <${process.env.VITE_REACT_APP_RECEIVING_EMAIL}>`,
  to: `${email}`,
  subject: "Thank You for Your Interest",
  html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
                <h2 style="margin-bottom: 0;">Hello ${name} ${firstname},</h2>
            </div>
            <div style="background-color: #fff; padding: 20px; color: #495057;">
                <p>Thank you for contacting us. We have received your message and will respond as soon as possible.</p>
                <p>The message you sent us:</p>
                <p>"<em>${message}</em>"</p>
                <p>Best regards,</p>
                <p>Your team, SF Media</p>
            </div>
        </div>
    `,
});

// Main function to handle incoming requests
export default async (req, res) => {
  const { name, firstname, email, phonenumber, message, recaptchaToken } = req.body;

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.VITE_REACT_APP_SECRET_KEY}&response=${recaptchaToken}`;
  
  try {
    const response = await axios.post(verificationURL);
    if (!response.data.success) {
      return res.status(400).send({ error: "reCAPTCHA verification failed." });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error.message);
    return res.status(500).send({ error: "Error verifying reCAPTCHA." });
  }

  try {
    await transporter.sendMail(createMailOptions(name, firstname, email, phonenumber, message));
    await transporter.sendMail(createReplyOptions(name, firstname, email, message));
    res.status(200).send({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error while sending the message:", error.message);
    res.status(500).send({ error: "Error while sending the message." });
  }
};
