import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Egyptian Culture — The Symbols That Inspire Us",
  description:
    "Explore the ancient Egyptian symbols, mythology, and cultural heritage that inspire every OHANNA design. Learn about the Ankh, Eye of Horus, Scarab, hieroglyphs, and pharaonic fashion history.",
  keywords: ["Egyptian symbols meaning", "Eye of Horus meaning", "Ankh symbol", "Egyptian hieroglyphs fashion", "pharaonic culture", "ancient Egyptian mythology streetwear"],
};

const SYMBOLS = [
  { symbol: "𓋹", name: "ANKH", meaning: "Eternal Life & Power", desc: "The Ankh is the ancient Egyptian symbol for life, immortality, and divine power. Carried by pharaohs and gods alike, it represents the key to eternal existence. In our designs, it reminds the wearer that they carry an unbreakable legacy." },
  { symbol: "𓂀", name: "EYE OF HORUS", meaning: "Protection & Royal Power", desc: "Wedjat — the Eye of Horus — is a symbol of protection, royal power, and good health. According to legend, Horus lost his eye in battle and it was restored, making it a symbol of healing and restoration. Our brand's guiding symbol." },
  { symbol: "𓁿", name: "SCARAB", meaning: "Transformation & Rebirth", desc: "The scarab beetle (Khepri) was the god of the rising sun and self-creation. Egyptians carved scarabs into amulets as symbols of regeneration. For us, it represents the transformation of culture into street art." },
  { symbol: "𓇳", name: "SUN DISC (RA)", meaning: "The Source of All Power", desc: "Ra, the sun god, was the most powerful deity in the Egyptian pantheon. The sun disc represents creation, warmth, and omnipotent power. Our Ra Sweater channels this limitless energy." },
  { symbol: "𓅃", name: "FALCON (HORUS)", meaning: "Kingship & Divine Authority", desc: "The falcon was the manifestation of Horus, god of the sky and kingship. Every Egyptian pharaoh was considered the living Horus. This symbol appears in our Pharaoh Jacket, granting its wearer celestial authority." },
  { symbol: "𓊖", name: "CARTOUCHE", meaning: "Identity & Immortality", desc: "A cartouche is an oval enclosure containing a pharaoh's royal name in hieroglyphs. To have your name in a cartouche meant immortality. OHANNA encodes cultural identity into every garment we make." },
];

const GODS = [
  { name: "HORUS", role: "Sky God & Protector", info: "God of the sky, war, and hunting. Patron of pharaohs. His eye (the Wedjat) is one of the most powerful symbols of protection in history." },
  { name: "RA", role: "Sun God & Creator", info: "The paramount deity of ancient Egypt. Creator of all life and order. He sailed the sky each day in a solar barque, dying at sunset and being reborn at dawn." },
  { name: "OSIRIS", role: "God of Death & Resurrection", info: "Ruler of the underworld and judge of the dead. His resurrection from death by Isis gave hope to all Egyptians of eternal life beyond death." },
  { name: "ANUBIS", role: "God of Mummification", info: "The jackal-headed guide of souls. He weighed the hearts of the dead against the feather of Ma'at to determine their worthiness for the afterlife." },
  { name: "THOTH", role: "God of Wisdom & Writing", info: "The ibis-headed god of knowledge, writing, science, and judgment. Inventor of hieroglyphs. Patron of scribes and scholars across all of Egypt." },
  { name: "SEKHMET", role: "Goddess of War & Healing", info: "The lion-headed goddess of war and pestilence, but also of healing. She embodied both destruction and protection — a powerful duality we honor in our designs." },
];

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#1D4D4F] to-[#1B1B1B] text-[#FDF8EF] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none" aria-hidden>
          {["𓂀", "𓅃", "𓋹", "𓊖", "𓏃", "𓁿"].map((g, i) => (
            <span key={i} className="absolute text-7xl" style={{ top: `${8 + i * 15}%`, left: i % 2 === 0 ? `${3 + i * 15}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 12}%` : undefined }}>{g}</span>
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#C89D29]/40" />
            <span className="text-4xl text-[#C89D29]">𓋹</span>
            <div className="h-px w-16 bg-[#C89D29]/40" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black hieroglyph-font hieroglyph-shadow mb-6">
            EGYPTIAN <span className="text-[#C89D29]">CULTURE</span>
          </h1>
          <p className="text-[#FDF8EF]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            5,000 years of civilization. Symbols that outlived empires. Culture that breathes through our designs.
            Understand the power you're wearing.
          </p>
        </div>
      </section>

      {/* Symbols */}
      <section className="py-20 bg-[#FDF8EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">SACRED <span className="text-[#C89D29]">SYMBOLS</span></h2>
            <p className="text-[#1B1B1B]/55 text-sm max-w-lg mx-auto">
              Every symbol in our collection carries thousands of years of meaning. Know what you wear.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SYMBOLS.map((s) => (
              <div key={s.name} className="ohanna-card p-6 group">
                <div className="text-5xl text-[#C89D29] mb-4 group-hover:scale-110 transition-transform inline-block">{s.symbol}</div>
                <h3 className="font-black hieroglyph-font text-sm mb-1">{s.name}</h3>
                <p className="text-[#C89D29] text-xs font-semibold mb-3">{s.meaning}</p>
                <p className="text-[#1B1B1B]/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gods */}
      <section className="py-20 bg-[#E4D5B7]/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">THE GODS <span className="text-[#C89D29]">BEHIND THE DESIGNS</span></h2>
            <p className="text-[#1B1B1B]/55 text-sm max-w-lg mx-auto">
              Our garments are named after Egyptian deities. Meet the divine forces inspiring our collection.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {GODS.map((g) => (
              <div key={g.name} className="ohanna-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#C89D29] flex items-center justify-center shrink-0">
                    <Eye className="h-5 w-5 text-[#1B1B1B]" />
                  </div>
                  <div>
                    <h3 className="font-black hieroglyph-font text-sm">{g.name}</h3>
                    <p className="text-[#C89D29] text-xs">{g.role}</p>
                  </div>
                </div>
                <p className="text-[#1B1B1B]/60 text-sm leading-relaxed">{g.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hieroglyphs explainer */}
      <section className="py-20 bg-[#1B1B1B] text-[#FDF8EF]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">READING THE <span className="text-[#C89D29]">WALLS</span></h2>
            <p className="text-[#FDF8EF]/55 text-sm max-w-lg mx-auto">
              Hieroglyphs were the divine writing of ancient Egypt — a sacred language that lasted 3,000 years.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-[#FDF8EF]/65 text-sm leading-relaxed">
              <p>Egyptian hieroglyphs are one of humanity's oldest writing systems, dating back to 3,100 BC. Over 700 distinct characters were used — a combination of phonetic elements, logograms, and determinatives.</p>
              <p>When Napoleon's scholars discovered the Rosetta Stone in 1799, they unlocked 1,400 years of silence. The hieroglyphs we use in our designs aren't random — each one is chosen for its specific meaning.</p>
              <p>At OHANNA, we treat hieroglyphs as the ultimate graphic design system: geometric, powerful, timeless. They're the original streetwear typography.</p>
            </div>
            <div className="bg-[#FDF8EF]/5 border border-[#FDF8EF]/10 rounded-xl p-6">
              <h3 className="font-black hieroglyph-font text-sm text-[#C89D29] mb-4 tracking-wider">OHANNA IN HIEROGLYPHS</h3>
              <div className="text-5xl tracking-[0.3em] text-[#C89D29] mb-4 select-none">𓂝𓉔𓈖𓈖𓂝</div>
              <p className="text-[#FDF8EF]/40 text-xs">Our brand name rendered in ancient Egyptian hieroglyphic script — connecting 5,000 years of history to today's streets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#C89D29] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black hieroglyph-font text-[#1B1B1B] mb-4">WEAR THE SYMBOLS</h2>
          <p className="text-[#1B1B1B]/70 mb-8 max-w-sm mx-auto text-sm">Carry the power of ancient Egypt in your daily armor.</p>
          <Link href="/collection" className="inline-flex items-center gap-2 bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#FDF8EF] hover:text-[#1B1B1B] px-8 py-3.5 font-black hieroglyph-font text-sm sketchy-button transition-all">
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
