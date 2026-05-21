import Link from "next/link";
import { Eye } from "lucide-react";

const COLLECTION_LINKS = [
  { label: "Hoodies", href: "/collection?category=Hoodies" },
  { label: "T-Shirts", href: "/collection?category=T-Shirts" },
  { label: "Jackets", href: "/collection?category=Jackets" },
  { label: "Bottoms", href: "/collection?category=Bottoms" },
  { label: "Accessories", href: "/collection?category=Accessories" },
];

const SUPPORT_LINKS = [
  { label: "Size Guide", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "#" },
];

const DISCOVER_LINKS = [
  { label: "Our Story", href: "/story" },
  { label: "Egyptian Culture", href: "/culture" },
  { label: "The Collection", href: "/collection" },
  { label: "Community", href: "#" },
  { label: "Careers", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-[#FDF8EF] py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Eye className="h-7 w-7 text-[#C89D29]" />
              <span className="text-xl font-black hieroglyph-font tracking-widest">OHANNA</span>
            </Link>
            <p className="text-[#FDF8EF]/60 text-sm leading-relaxed">
              Ancient power. Modern form. Street rebellion with pharaonic heritage.
            </p>
            <div className="flex gap-3 pt-2">
              {["𓂀", "𓅃", "𓋹", "𓊖"].map((glyph, i) => (
                <span
                  key={i}
                  className="text-[#C89D29]/60 text-xl hover:text-[#C89D29] transition-colors cursor-default"
                >
                  {glyph}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black hieroglyph-font tracking-wider mb-5 text-sm">COLLECTION</h4>
            <ul className="space-y-3">
              {COLLECTION_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#FDF8EF]/60 hover:text-[#C89D29] transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black hieroglyph-font tracking-wider mb-5 text-sm">SUPPORT</h4>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#FDF8EF]/60 hover:text-[#C89D29] transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black hieroglyph-font tracking-wider mb-5 text-sm">DISCOVER</h4>
            <ul className="space-y-3">
              {DISCOVER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#FDF8EF]/60 hover:text-[#C89D29] transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FDF8EF]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#FDF8EF]/40 text-xs">
            © {new Date().getFullYear()} OHANNA. Ancient heritage, modern rebellion. All rights reserved.
          </p>
          <p className="text-[#FDF8EF]/30 text-xs">
            Prices in Egyptian Pounds (EGP) · Powered by Stripe · Secured by Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
