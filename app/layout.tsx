import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "spacebar//LABS",
  description:
    "spacebar//LABS is a creative operations studio that engineers systems to scale with you and the stories you tell.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jbmono.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
