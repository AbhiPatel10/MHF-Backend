import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.SENDER_EMAIL_HOST,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  const info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: subject,
    text: message,
  });
  return info;
};
