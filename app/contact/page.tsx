"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const FAQ_ITEMS = [
  { q: "How long does delivery take within Egypt?", a: "Standard delivery within Egypt takes 3–5 business days. Cairo and Giza orders often arrive in 2–3 business days. Expedited same-day delivery is available for select Cairo zones." },
  { q: "Do you ship internationally?", a: "Yes! We ship to Saudi Arabia, UAE, Kuwait, Qatar, and other Arab countries. International orders take 7–14 business days. Shipping rates are calculated at checkout based on destination." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unworn, unwashed items with original tags attached. To initiate a return, email returns@ohanna.store with your order ID and reason. See our full Shipping & Returns page for details." },
  { q: "How do I find my size?", a: "We recommend checking our Size Guide for detailed measurements. OHANNA pieces run true to size. For oversized fits (like our hoodies), we recommend sizing up one size. If you're between sizes, go larger." },
  { q: "Are your products made in Egypt?", a: "Absolutely. OHANNA is proudly Egyptian — designed in Cairo, manufactured with Egyptian cotton and premium fabrics. Supporting local craftsmanship is a core part of our mission." },
  { q: "How can I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also use our Track Order page with your order ID and email address to get real-time updates." },
  { q: "Do you offer gift wrapping?", a: "Yes! At checkout, select the gift wrap option for an additional fee. We use premium recycled packaging with a handwritten card option. Perfect for gifting Egyptian streetwear to someone special." },
  { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After that, we begin processing and cannot guarantee changes. Contact us immediately at support@ohanna.store if you need to make adjustments." },
];

function FAQItem({ item, index }: { item: typeof FAQ_ITEMS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1B1B1B]/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-[#C89D29] transition-colors group"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm leading-snug">{item.q}</span>
        {open
          ? <ChevronUp className="h-4 w-4 shrink-0 text-[#C89D29]" />
          : <ChevronDown className="h-4 w-4 shrink-0 text-[#1B1B1B]/40 group-hover:text-[#C89D29] transition-colors" />
        }
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-5 text-sm text-[#1B1B1B]/65 leading-relaxed overflow-hidden"
        >
          {item.a}
        </motion.div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        toast.success("Message sent! We'll get back to you within 24 hours. 𓋹");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Couldn't send message. Please email us directly at info@ohanna.store");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            GET IN <span className="text-[#C89D29]">TOUCH</span>
          </h1>
          <p className="text-[#1B1B1B]/55 max-w-md mx-auto text-sm">
            Have a question, a partnership idea, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* FIND US + SEND A MESSAGE — same row */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* FIND US */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="ohanna-card p-8 h-full">
                <h2 className="text-xl font-black hieroglyph-font mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#C89D29]" />
                  FIND US
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-[#C89D29] font-black hieroglyph-font tracking-widest mb-2">FLAGSHIP STORE</p>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-[#1B1B1B]/40 mt-0.5 shrink-0" />
                      <div className="text-sm text-[#1B1B1B]/70 leading-relaxed">
                        Street 9, Block 3<br />
                        Maadi, Cairo<br />
                        Egypt, 11728
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#C89D29] font-black hieroglyph-font tracking-widest mb-2">CONTACT</p>
                    <div className="space-y-2.5">
                      <a href="tel:+20123456789" className="flex items-center gap-3 text-sm text-[#1B1B1B]/70 hover:text-[#C89D29] transition-colors">
                        <Phone className="h-4 w-4 shrink-0" />
                        +20 12 345 6789
                      </a>
                      <a href="mailto:info@ohanna.store" className="flex items-center gap-3 text-sm text-[#1B1B1B]/70 hover:text-[#C89D29] transition-colors">
                        <Mail className="h-4 w-4 shrink-0" />
                        info@ohanna.store
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#C89D29] font-black hieroglyph-font tracking-widest mb-2">STORE HOURS</p>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-[#1B1B1B]/40 mt-0.5 shrink-0" />
                      <div className="text-sm text-[#1B1B1B]/70 space-y-1">
                        <p>Sunday – Thursday: 10am – 9pm</p>
                        <p>Friday: 2pm – 9pm</p>
                        <p>Saturday: 11am – 9pm</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#C89D29] font-black hieroglyph-font tracking-widest mb-2">ONLINE SUPPORT</p>
                    <p className="text-sm text-[#1B1B1B]/60">
                      Email responses within 24 hours.<br />
                      Live chat available on weekdays 10am–6pm.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEND A MESSAGE */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="ohanna-card p-8 h-full">
                <h2 className="text-xl font-black hieroglyph-font mb-6 flex items-center gap-2">
                  <Send className="h-5 w-5 text-[#C89D29]" />
                  SEND A MESSAGE
                </h2>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="text-5xl text-[#C89D29] mb-4">𓋹</div>
                    <h3 className="font-black hieroglyph-font text-sm mb-2">MESSAGE SENT!</h3>
                    <p className="text-[#1B1B1B]/55 text-sm mb-6">We'll reply within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="text-xs text-[#C89D29] font-bold hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black hieroglyph-font text-[#1B1B1B]/60 mb-1.5 tracking-wider">
                          NAME <span className="text-[#AE1C1C]">*</span>
                        </label>
                        <input
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          required
                          className="ohanna-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black hieroglyph-font text-[#1B1B1B]/60 mb-1.5 tracking-wider">
                          EMAIL <span className="text-[#AE1C1C]">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="you@email.com"
                          required
                          className="ohanna-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black hieroglyph-font text-[#1B1B1B]/60 mb-1.5 tracking-wider">
                        SUBJECT
                      </label>
                      <input
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        placeholder="What's this about?"
                        className="ohanna-input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black hieroglyph-font text-[#1B1B1B]/60 mb-1.5 tracking-wider">
                        MESSAGE <span className="text-[#AE1C1C]">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        required
                        className="ohanna-input resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] py-3 px-6 font-black hieroglyph-font text-sm sketchy-button transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {sending ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ — below FIND US and SEND A MESSAGE */}
      <section className="py-12 bg-[#E4D5B7]/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black hieroglyph-font mb-2">FREQUENTLY ASKED <span className="text-[#C89D29]">QUESTIONS</span></h2>
            <p className="text-[#1B1B1B]/50 text-sm">Quick answers to the questions we hear most often.</p>
          </div>
          <div className="ohanna-card p-6 sm:p-8">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
          <p className="text-center text-sm text-[#1B1B1B]/40 mt-6">
            Still have questions?{" "}
            <a href="mailto:support@ohanna.store" className="text-[#C89D29] font-semibold hover:underline">
              Email support@ohanna.store
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
