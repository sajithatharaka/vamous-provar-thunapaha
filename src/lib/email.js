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
    text: `Dear Explorer,

Thank you so much for registering for the next cooking session – you're now on the waitlist.

I'm finalising the date, time, and menu, and I'll send all the details to everyone on the list in the next few days. As soon as spots are confirmed, you'll be among the first to know and get a direct link to secure your place.

If you have any questions or special dietary requirements in the meantime, just reply to this email and let me know.

Thanks again, and talk soon,
Harshika
Vamous Provar`,
    html: `<p>Dear Explorer,</p>
<p>Thank you so much for registering for the next cooking session – you're now on the waitlist.</p>
<p>I'm finalising the date, time, and menu, and I'll send all the details to everyone on the list in the next few days. As soon as spots are confirmed, you'll be among the first to know and get a direct link to secure your place.</p>
<p>If you have any questions or special dietary requirements in the meantime, just reply to this email and let me know.</p>
<p>Thanks again, and talk soon,<br>Harshika<br><br>${brandName}!</p>`,
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
