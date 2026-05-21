import type { Metadata } from "next";
import Link from "next/link";
import { Truck, RotateCcw, Shield, Clock } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Shipping & Returns — Fast Delivery Across Egypt & Arab World",
  description:
    "OHANNA shipping policy: free delivery on orders over EGP 1,500, standard 3–5 day delivery across Egypt, international shipping to GCC countries, and 14-day returns on all items.",
  keywords: ["OHANNA shipping policy", "free shipping Egypt", "Egyptian streetwear delivery", "return policy Egypt", "EGP shipping rates"],
};

const EGYPT_ZONES = [
  { zone: "Cairo & Giza", time: "2–3 business days", cost: "EGP 50", express: "Same-day available" },
  { zone: "Alexandria", time: "3–4 business days", cost: "EGP 60", express: "Next-day available" },
  { zone: "Nile Delta (Mansoura, Tanta, Zagazig)", time: "3–5 business days", cost: "EGP 65", express: "2-day available" },
  { zone: "Upper Egypt (Luxor, Aswan, Qena)", time: "4–6 business days", cost: "EGP 75", express: "—" },
  { zone: "North Coast & Red Sea", time: "4–6 business days", cost: "EGP 75", express: "—" },
  { zone: "Sinai", time: "5–7 business days", cost: "EGP 85", express: "—" },
];

const INTERNATIONAL_ZONES = [
  { zone: "Saudi Arabia", time: "7–10 business days", cost: "EGP 350" },
  { zone: "UAE", time: "7–10 business days", cost: "EGP 380" },
  { zone: "Kuwait", time: "8–12 business days", cost: "EGP 390" },
  { zone: "Qatar & Bahrain", time: "8–12 business days", cost: "EGP 390" },
  { zone: "Jordan & Lebanon", time: "9–14 business days", cost: "EGP 420" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <Truck className="h-10 w-10 text-[#C89D29] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            SHIPPING & <span className="text-[#C89D29]">RETURNS</span>
          </h1>
          <p className="text-[#1B1B1B]/55 max-w-md mx-auto text-sm">
            Free shipping on orders above EGP 1,500. Fast delivery across Egypt and the Arab world.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: "FREE SHIPPING", desc: "On all orders over EGP 1,500 within Egypt" },
              { icon: Clock, title: "FAST DELIVERY", desc: "Cairo & Giza in 2–3 business days" },
              { icon: RotateCcw, title: "14-DAY RETURNS", desc: "Easy returns on unworn items" },
              { icon: Shield, title: "FULLY INSURED", desc: "All packages tracked & insured" },
            ].map(h => (
              <div key={h.title} className="ohanna-card p-5 text-center">
                <h.icon className="h-8 w-8 text-[#C89D29] mx-auto mb-3" />
                <h3 className="font-black hieroglyph-font text-xs mb-1 tracking-wider">{h.title}</h3>
                <p className="text-[#1B1B1B]/55 text-xs leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          {/* Egypt Shipping */}
          <div className="ohanna-card overflow-hidden">
            <div className="bg-[#1B1B1B] px-6 py-4">
              <h2 className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest flex items-center gap-2">
                <span>🇪🇬</span> SHIPPING WITHIN EGYPT
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#E4D5B7]/40">
                  <tr>
                    {["ZONE", "DELIVERY TIME", "STANDARD COST", "EXPRESS"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-black hieroglyph-font text-[#1B1B1B]/60 tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1B1B]/6">
                  {EGYPT_ZONES.map((row, i) => (
                    <tr key={row.zone} className={`${i % 2 === 0 ? "" : "bg-[#F8F4EA]"} hover:bg-[#E4D5B7]/30 transition-colors`}>
                      <td className="px-5 py-3.5 font-semibold text-sm">{row.zone}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/65">{row.time}</td>
                      <td className="px-5 py-3.5 text-[#C89D29] font-bold">{row.cost}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/55 text-xs">{row.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-[#E4D5B7]/20 text-xs text-[#1B1B1B]/55">
              Free standard shipping on all orders above EGP 1,500. Orders placed before 2pm EET ship the same day (weekdays).
            </div>
          </div>

          {/* International */}
          <div className="ohanna-card overflow-hidden">
            <div className="bg-[#1B1B1B] px-6 py-4">
              <h2 className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest">INTERNATIONAL SHIPPING</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#E4D5B7]/40">
                  <tr>
                    {["DESTINATION", "DELIVERY TIME", "SHIPPING COST"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-black hieroglyph-font text-[#1B1B1B]/60 tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1B1B]/6">
                  {INTERNATIONAL_ZONES.map((row, i) => (
                    <tr key={row.zone} className={`${i % 2 === 0 ? "" : "bg-[#F8F4EA]"} hover:bg-[#E4D5B7]/30 transition-colors`}>
                      <td className="px-5 py-3.5 font-semibold">{row.zone}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/65">{row.time}</td>
                      <td className="px-5 py-3.5 text-[#C89D29] font-bold">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Returns policy */}
          <div className="ohanna-card overflow-hidden">
            <div className="bg-[#1B1B1B] px-6 py-4">
              <h2 className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest">RETURNS & EXCHANGES POLICY</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-black hieroglyph-font text-xs text-[#C89D29] mb-3 tracking-wider">ELIGIBLE FOR RETURN</h3>
                  <ul className="space-y-2 text-sm text-[#1B1B1B]/65">
                    {["Unworn, unwashed items", "Original tags attached", "Within 14 days of delivery", "Defective or wrong items", "Size exchanges (free first exchange)"].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D4D4F] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-black hieroglyph-font text-xs text-[#AE1C1C] mb-3 tracking-wider">NOT ELIGIBLE FOR RETURN</h3>
                  <ul className="space-y-2 text-sm text-[#1B1B1B]/65">
                    {["Items worn, washed, or altered", "Items without original tags", "Returns after 14 days", "Sale or clearance items", "Accessories (hygiene items)"].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AE1C1C] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#E4D5B7]/30 rounded-lg p-5 text-sm text-[#1B1B1B]/65 leading-relaxed">
                <strong className="text-[#1B1B1B] font-black hieroglyph-font text-xs">HOW TO RETURN:</strong>
                <p className="mt-2">Email <a href="mailto:returns@ohanna.store" className="text-[#C89D29] font-semibold">returns@ohanna.store</a> with your order ID and reason. We'll send instructions within 24 hours. Refunds are processed within 3–5 business days after receiving your return.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-[#1B1B1B]/40">
            Questions about your order?{" "}
            <Link href="/contact" className="text-[#C89D29] font-semibold hover:underline">Contact us</Link> or{" "}
            <Link href="/track-order" className="text-[#C89D29] font-semibold hover:underline">track your order</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
