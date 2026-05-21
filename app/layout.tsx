import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/cart-context";
import CartDrawer from "@/components/cart/cart-drawer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ohanna.store"),
  title: {
    default: "OHANNA | Egyptian Streetwear — Ancient Power, Modern Form",
    template: "%s | OHANNA Egyptian Streetwear",
  },
  description:
    "OHANNA Egyptian Streetwear — where pharaonic heritage meets street rebellion. Premium hoodies, tees, jackets & accessories inspired by 5000 years of Egyptian culture. Shop now, prices in EGP.",
  keywords: [
    "Egyptian streetwear brand",
    "pharaoh fashion Egypt",
    "ankh hoodie Cairo",
    "Egyptian clothing brand EGP",
    "hieroglyph streetwear",
    "Ohanna streetwear Egypt",
    "urban Egyptian fashion Cairo",
    "pharaonic hoodies Egypt",
    "modern Egyptian apparel",
    "Egyptian street style",
    "buy streetwear Egypt",
    "Egyptian culture fashion",
  ],
  authors: [{ name: "OHANNA", url: "https://ohanna.store" }],
  creator: "OHANNA",
  openGraph: {
    type: "website",
    locale: "en_EG",
    url: "https://ohanna.store",
    siteName: "OHANNA Egyptian Streetwear",
    title: "OHANNA | Ancient Power. Modern Form.",
    description:
      "Premium Egyptian streetwear. Pharaonic heritage meets street rebellion. Shop hoodies, tees, jackets & accessories priced in EGP.",
    images: [{ url: "/streetwear-egyptian-sketch.png", width: 1200, height: 630, alt: "OHANNA Egyptian Streetwear" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OHANNA | Egyptian Streetwear",
    description: "Ancient power meets modern rebellion. Shop premium Egyptian streetwear.",
    images: ["/streetwear-egyptian-sketch.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#FDF8EF]">
      <body className={`${geist.variable} ${geistMono.variable} ${cinzel.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <Toaster
          position="bottom-center"
          richColors={false}
          toastOptions={{
            style: {
              background: "#1B1B1B",
              color: "#FDF8EF",
              border: "2px solid #C89D29",
              borderRadius: "8px",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: "600",
              letterSpacing: "0.03em",
            },
          }}
        />
      </body>
    </html>
  );
}
