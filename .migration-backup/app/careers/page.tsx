import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Heart, Zap, Users, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Careers — Join the OHANNA Team",
  description:
    "Build the future of Egyptian streetwear with OHANNA. We're hiring passionate designers, marketers, and operations talent in Cairo, Egypt. View open positions and apply today.",
  keywords: ["OHANNA careers Egypt", "fashion jobs Cairo", "streetwear brand jobs Egypt", "Egyptian fashion designer jobs", "Cairo fashion careers"],
};

const OPENINGS = [
  { title: "Senior Graphic Designer", dept: "Creative", location: "Cairo, Egypt", type: "Full-time", desc: "Design premium Egyptian streetwear graphics, seasonal collections, and brand identity materials. Deep knowledge of Egyptian symbolism a major plus.", skills: ["Adobe Illustrator", "Photoshop", "Brand design", "Typography"] },
  { title: "Social Media & Content Manager", dept: "Marketing", location: "Cairo, Egypt", type: "Full-time", desc: "Build OHANNA's digital presence across Instagram, TikTok, and YouTube. Create viral Egyptian street culture content that resonates with Gen Z.", skills: ["Instagram/TikTok", "Video editing", "Copywriting", "Arabic & English"] },
  { title: "E-commerce & Fulfillment Specialist", dept: "Operations", location: "Cairo, Egypt", type: "Full-time", desc: "Manage order processing, inventory, and logistics for our rapidly growing online store. Experience with Egyptian delivery platforms essential.", skills: ["Inventory management", "Shipping logistics", "Customer service", "Excel"] },
  { title: "Fashion Photographer & Videographer", dept: "Creative", location: "Cairo, Egypt", type: "Freelance", desc: "Capture OHANNA's Egyptian streetwear aesthetic in editorial photoshoots and video campaigns. Portfolio of street/fashion photography required.", skills: ["DSLR/Mirrorless", "Lightroom", "Video production", "Street photography"] },
  { title: "Customer Experience Associate", dept: "Support", location: "Cairo, Egypt (Remote)", type: "Part-time", desc: "Be the voice of OHANNA for our community. Handle customer inquiries with warmth and expertise, turning every interaction into a positive brand experience.", skills: ["Customer service", "Arabic & English", "Problem-solving", "Communication"] },
];

const PERKS = [
  { icon: Heart, title: "Wear What You Make", desc: "Annual clothing allowance — wear OHANNA to work, every day." },
  { icon: Zap, title: "Move Fast, Build Real", desc: "Flat structure. Your ideas become products in weeks, not years." },
  { icon: Users, title: "Culture-Forward Team", desc: "Work with Egyptians passionate about heritage, design, and street culture." },
  { icon: Briefcase, title: "Grow With the Brand", desc: "Early team members grow as the brand grows. Equity for exceptional talent." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-20 bg-gradient-to-br from-[#1B1B1B] to-[#1D4D4F] text-[#FDF8EF] text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Briefcase className="h-12 w-12 text-[#C89D29] mx-auto mb-5" />
          <h1 className="text-5xl sm:text-7xl font-black hieroglyph-font hieroglyph-shadow mb-6">
            JOIN THE <span className="text-[#C89D29]">TEAM</span>
          </h1>
          <p className="text-[#FDF8EF]/70 text-lg max-w-xl mx-auto leading-relaxed">
            Help us build Egypt's defining streetwear brand. We're looking for people who are obsessed with culture, design, and making something that lasts.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-[#FDF8EF]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black hieroglyph-font text-center mb-10">WHY <span className="text-[#C89D29]">OHANNA</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map(p => (
              <div key={p.title} className="ohanna-card p-5 text-center">
                <p.icon className="h-8 w-8 text-[#C89D29] mx-auto mb-3" />
                <h3 className="font-black hieroglyph-font text-xs mb-2 tracking-wider">{p.title}</h3>
                <p className="text-sm text-[#1B1B1B]/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-16 bg-[#E4D5B7]/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black hieroglyph-font mb-10 text-center">
            OPEN <span className="text-[#C89D29]">POSITIONS</span>
          </h2>
          <div className="space-y-5">
            {OPENINGS.map((job, i) => (
              <div key={i} className="ohanna-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-black hieroglyph-font text-sm">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="text-xs text-[#C89D29] font-semibold">{job.dept}</span>
                      <span className="flex items-center gap-1 text-xs text-[#1B1B1B]/50">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#1B1B1B]/50">
                        <Clock className="h-3 w-3" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@ohanna.store?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="shrink-0 bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] px-5 py-2 font-black hieroglyph-font text-xs sketchy-button transition-all text-center"
                  >
                    APPLY
                  </a>
                </div>
                <p className="text-sm text-[#1B1B1B]/60 leading-relaxed mb-3">{job.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(s => (
                    <span key={s} className="text-xs bg-[#E4D5B7] text-[#1B1B1B]/70 px-2.5 py-1 rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="ohanna-card p-8 text-center mt-8">
            <p className="text-sm text-[#1B1B1B]/60 mb-4">Don't see the right role? We always want to hear from passionate people.</p>
            <a href="mailto:careers@ohanna.store" className="text-[#C89D29] font-black hieroglyph-font text-xs hover:underline">
              SEND A SPECULATIVE APPLICATION → careers@ohanna.store
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
