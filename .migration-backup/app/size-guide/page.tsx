import type { Metadata } from "next";
import Link from "next/link";
import { Ruler } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Size Guide — Find Your Perfect Fit",
  description: "OHANNA size guide for hoodies, t-shirts, jackets, bottoms, and accessories. Detailed measurements in centimeters to help you find your perfect Egyptian streetwear fit.",
  keywords: ["OHANNA size guide", "Egyptian streetwear sizing", "hoodie size chart Egypt", "streetwear measurements"],
};

const TOPS_SIZES = [
  { size: "XS", chest: "86–91", shoulder: "42", length: "66", sleeve: "59" },
  { size: "S",  chest: "91–97", shoulder: "44", length: "69", sleeve: "61" },
  { size: "M",  chest: "97–102", shoulder: "46", length: "72", sleeve: "63" },
  { size: "L",  chest: "107–112", shoulder: "49", length: "75", sleeve: "65" },
  { size: "XL", chest: "117–122", shoulder: "52", length: "78", sleeve: "67" },
  { size: "XXL", chest: "127–132", shoulder: "55", length: "81", sleeve: "69" },
];

const BOTTOMS_SIZES = [
  { size: "XS", waist: "68–72", hips: "88–92", inseam: "76", rise: "27" },
  { size: "S",  waist: "73–77", hips: "93–97", inseam: "77", rise: "28" },
  { size: "M",  waist: "78–82", hips: "98–102", inseam: "78", rise: "29" },
  { size: "L",  waist: "83–88", hips: "103–108", inseam: "79", rise: "30" },
  { size: "XL", waist: "89–94", hips: "109–114", inseam: "80", rise: "31" },
  { size: "XXL", waist: "95–100", hips: "115–120", inseam: "81", rise: "32" },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <Ruler className="h-10 w-10 text-[#C89D29] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            SIZE <span className="text-[#C89D29]">GUIDE</span>
          </h1>
          <p className="text-[#1B1B1B]/55 max-w-md mx-auto text-sm">
            All measurements in centimeters (cm). For the best fit, measure yourself and compare to the charts below.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">

          {/* How to measure */}
          <div className="ohanna-card p-8">
            <h2 className="text-xl font-black hieroglyph-font mb-6">HOW TO <span className="text-[#C89D29]">MEASURE</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "CHEST", desc: "Measure around the fullest part of your chest, keeping the tape parallel to the floor." },
                { label: "WAIST", desc: "Measure around your natural waistline, about 2.5cm above your navel." },
                { label: "HIPS", desc: "Stand with feet together and measure around the fullest part of your hips." },
                { label: "INSEAM", desc: "Measure from the crotch to the bottom of your ankle along the inside leg." },
              ].map(m => (
                <div key={m.label} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C89D29] flex items-center justify-center mx-auto mb-3">
                    <Ruler className="h-5 w-5 text-[#1B1B1B]" />
                  </div>
                  <h3 className="font-black hieroglyph-font text-xs mb-1">{m.label}</h3>
                  <p className="text-[#1B1B1B]/55 text-xs leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tops chart */}
          <div className="ohanna-card overflow-hidden">
            <div className="bg-[#1B1B1B] px-6 py-4">
              <h2 className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest">TOPS — HOODIES, T-SHIRTS, JACKETS, SWEATERS</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#E4D5B7]/40">
                  <tr>
                    {["SIZE", "CHEST (cm)", "SHOULDER (cm)", "LENGTH (cm)", "SLEEVE (cm)"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-black hieroglyph-font text-[#1B1B1B]/60 tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1B1B]/6">
                  {TOPS_SIZES.map((row, i) => (
                    <tr key={row.size} className={`${i % 2 === 0 ? "" : "bg-[#F8F4EA]"} hover:bg-[#E4D5B7]/30 transition-colors`}>
                      <td className="px-5 py-3.5 font-black text-sm text-[#C89D29]">{row.size}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.chest}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.shoulder}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.length}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottoms chart */}
          <div className="ohanna-card overflow-hidden">
            <div className="bg-[#1B1B1B] px-6 py-4">
              <h2 className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest">BOTTOMS — JOGGERS, TRACK PANTS, SHORTS</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#E4D5B7]/40">
                  <tr>
                    {["SIZE", "WAIST (cm)", "HIPS (cm)", "INSEAM (cm)", "RISE (cm)"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-black hieroglyph-font text-[#1B1B1B]/60 tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1B1B]/6">
                  {BOTTOMS_SIZES.map((row, i) => (
                    <tr key={row.size} className={`${i % 2 === 0 ? "" : "bg-[#F8F4EA]"} hover:bg-[#E4D5B7]/30 transition-colors`}>
                      <td className="px-5 py-3.5 font-black text-sm text-[#C89D29]">{row.size}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.waist}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.hips}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.inseam}</td>
                      <td className="px-5 py-3.5 text-[#1B1B1B]/70">{row.rise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "OVERSIZED FIT", desc: "Horus Hoodie, Ra Sweater, and Hieroglyph Bomber are designed to be worn oversized. Consider sizing up for the intended streetwear silhouette." },
              { title: "SLIM FIT", desc: "Ankh Tee and Sphinx Tee have a regular-to-slim cut. If you prefer a looser fit, size up one. Measurements match standard international sizing." },
              { title: "BETWEEN SIZES?", desc: "When between sizes, we recommend sizing up for tops and down for bottoms. Still unsure? Email sizing@ohanna.store — we'll help you pick the right fit." },
            ].map(t => (
              <div key={t.title} className="ohanna-card p-5">
                <h3 className="font-black hieroglyph-font text-xs text-[#C89D29] mb-2 tracking-wider">{t.title}</h3>
                <p className="text-sm text-[#1B1B1B]/60 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#1B1B1B]/40">
            Still not sure?{" "}
            <Link href="/contact" className="text-[#C89D29] font-semibold hover:underline">Contact us</Link>
            {" "}and we'll find your perfect size.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
