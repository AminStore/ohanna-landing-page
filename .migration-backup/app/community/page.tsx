import type { Metadata } from "next";
import Link from "next/link";
import { Users, Star, Heart, Instagram, Camera } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Community — The OHANNA Movement",
  description:
    "Join the OHANNA community — 10,000+ modern pharaohs across Egypt wearing ancient power in contemporary form. See how our community styles their OHANNA pieces and share your look.",
  keywords: ["OHANNA community Egypt", "Egyptian streetwear community", "pharaoh fashion movement", "OHANNA Instagram", "street style Egypt community"],
};

const TESTIMONIALS = [
  { name: "MAYA K.", location: "Zamalek, Cairo", quote: "OHANNA gave me a way to wear my Egyptian identity with pride. The Horus Hoodie is my signature piece everywhere I go.", rating: 5 },
  { name: "OMAR B.", location: "Alexandria", quote: "Finally, a brand that understands Egyptian culture on a deep level. Every symbol has meaning. I've learned so much about my heritage through the designs.", rating: 5 },
  { name: "SARA M.", location: "New Cairo", quote: "The quality is insane for the price. I've washed my Ankh Tee 30 times and it still looks brand new. OHANNA clearly invests in their craft.", rating: 5 },
  { name: "HASSAN R.", location: "Heliopolis, Cairo", quote: "Wearing OHANNA abroad always sparks conversations about Egypt. It's become my ambassador piece when I travel internationally.", rating: 5 },
  { name: "LAYLA A.", location: "Maadi, Cairo", quote: "The Nefertiti Hoodie was a birthday gift from my partner and it's my most-worn piece. Comfortable, meaningful, and always drawing compliments.", rating: 5 },
  { name: "KAREEM S.", location: "Giza", quote: "I've been waiting for an Egyptian streetwear brand this authentic my whole life. OHANNA bridges a gap that needed bridging.", rating: 5 },
];

const STATS = [
  { value: "10K+", label: "Modern Pharaohs" },
  { value: "50K+", label: "Instagram Followers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "30+", label: "Cities Reached" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#1B1B1B] to-[#2D1B00] text-[#FDF8EF] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden>
          {["𓋹","𓂀","𓅃"].map((g,i) => (
            <span key={i} className="absolute text-8xl" style={{top:`${15+i*30}%`,left:i%2===0?`${5+i*20}%`:undefined,right:i%2!==0?`${5+i*15}%`:undefined}}>{g}</span>
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Users className="h-12 w-12 text-[#C89D29] mx-auto mb-5" />
          <h1 className="text-5xl sm:text-7xl font-black hieroglyph-font hieroglyph-shadow mb-6">
            THE <span className="text-[#C89D29]">MOVEMENT</span>
          </h1>
          <p className="text-[#FDF8EF]/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            We're more than a brand. We're a cultural movement. 10,000+ modern pharaohs across Egypt and beyond, wearing their heritage with pride.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-[#C89D29]">{s.value}</div>
                <div className="text-[#FDF8EF]/50 text-xs hieroglyph-font tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community showcase */}
      <section className="py-20 bg-[#FDF8EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">STYLED BY THE <span className="text-[#C89D29]">PEOPLE</span></h2>
            <p className="text-[#1B1B1B]/55 text-sm max-w-md mx-auto">
              Our community styles OHANNA in ways we never imagined. Tag <strong>@ohanna.store</strong> to be featured.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { img: "/streetwear-egyptian-sketch.png", user: "@modern_pharaoh" },
              { img: "/abstract-geometric-shapes.png", user: "@cairo.streets" },
              { img: "/egyptian-streetwear-timeline.png", user: "@ankh.life" },
              { img: "/streetwear-egyptian-sketch.png", user: "@nile.drip" },
              { img: "/abstract-geometric-shapes.png", user: "@horus.fits" },
              { img: "/egyptian-streetwear-timeline.png", user: "@pyramid.style" },
              { img: "/streetwear-egyptian-sketch.png", user: "@pharaoh.look" },
              { img: "/abstract-geometric-shapes.png", user: "@egypt.fashion" },
            ].map((post, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden ohanna-card aspect-square">
                <Image src={post.img} alt={`OHANNA community member ${post.user} wearing Egyptian streetwear`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1B1B1B]/0 group-hover:bg-[#1B1B1B]/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-[#FDF8EF] text-xs font-bold">{post.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#E4D5B7]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">COMMUNITY <span className="text-[#C89D29]">SPEAKS</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="ohanna-card p-6">
                <div className="flex text-[#C89D29] mb-3">
                  {[...Array(t.rating)].map((_,j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-sm text-[#1B1B1B]/70 italic mb-4 leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-black hieroglyph-font text-xs">{t.name}</p>
                  <p className="text-xs text-[#1B1B1B]/40">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="py-16 bg-[#C89D29] text-center">
        <div className="container mx-auto px-4">
          <Heart className="h-8 w-8 text-[#1B1B1B] mx-auto mb-4" />
          <h2 className="text-3xl font-black hieroglyph-font text-[#1B1B1B] mb-4">JOIN THE MOVEMENT</h2>
          <p className="text-[#1B1B1B]/70 mb-8 max-w-md mx-auto text-sm">
            Share your OHANNA look on Instagram with <strong>@ohanna.store</strong> and <strong>#ModernPharaoh</strong> to be featured in our community gallery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/collection" className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#FDF8EF] hover:text-[#1B1B1B] px-8 py-3.5 font-black hieroglyph-font text-sm sketchy-button transition-all">
              SHOP NOW
            </Link>
            <a href="https://instagram.com/ohanna.store" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#C89D29] px-8 py-3.5 font-black hieroglyph-font text-sm rounded-md transition-all">
              <Instagram className="h-4 w-4" />
              @OHANNA.STORE
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
