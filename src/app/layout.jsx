// src/app/layout.jsx
import { Lora, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../../config";
import CookieConsent from "@/components/CookieConsent";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
  description: siteConfig.brand.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable}`}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif", margin: 0 }}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
