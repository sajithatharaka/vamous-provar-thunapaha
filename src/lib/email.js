// src/lib/email.js
// ------------------------------------------------------------
// SMTP email sending for waitlist signups (Nodemailer).
// Required env vars (see .env.example):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM,
//   WAITLIST_NOTIFICATION_EMAIL (comma-separated for multiple recipients)
// ------------------------------------------------------------

import nodemailer from "nodemailer";
import { siteConfig } from "../../config";

function getNotificationRecipients() {
  return (process.env.WAITLIST_NOTIFICATION_EMAIL || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }
  return transporter;
}

export async function sendWaitlistNotification(email) {
  const brandName = siteConfig.brand.name;
  await getTransporter().sendMail({
    from: process.env.SMTP_FROM,
    to: getNotificationRecipients(),
    subject: `New ${brandName} waitlist signup`,
    text: `${email} just joined the ${brandName} waitlist.`,
    html: `<p><strong>${email}</strong> just joined the ${brandName} waitlist.</p>`,
  });
}

export async function sendWelcomeEmail(email) {
  const brandName = siteConfig.brand.name;
  await getTransporter().sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Thanks for joining the ${brandName} waitlist!`,
    text: `Thanks for registering for ${brandName}! We'll be in touch soon with more details.`,
    html: `<p>Thanks for registering for <strong>${brandName}</strong>! We'll be in touch soon with more details.</p>`,
  });
}

export async function sendWaitlistEmails(email) {
  const results = await Promise.allSettled([
    sendWaitlistNotification(email),
    sendWelcomeEmail(email),
  ]);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Waitlist email send failed:", result.reason);
    }
  });
}
