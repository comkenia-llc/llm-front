import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Hero from "./components/Hero";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://universitiesforllm.com"),
  title: "Universities for LLM | Keekan Education",
  description:
    "Explore top LLM programs, scholarships, and universities around the world — powered by Keekan Education.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {/* <Hero/> */}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
