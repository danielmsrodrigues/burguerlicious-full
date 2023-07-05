import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, content: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Burguerlicious - Best burguers in town!",
    to,
    subject,
    text: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL SENT]:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendConfirmationEmail = async (to: string, content: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Burguerlicious - Best burguers in town!",
    to,
    subject: "Account verification",
    html: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL SENT]:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendEmail, sendConfirmationEmail };
