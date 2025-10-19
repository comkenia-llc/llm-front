import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

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
      <head>
        {/* <Script
          id="adsense-loader"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5793245153516336"
        /> */}

        {/* ✅ Google Analytics (GA4) */}
        <Script
          id="google-analytics"
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-653RWBCJYW"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-653RWBCJYW');
            `,
          }}
        />

      </head>
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
