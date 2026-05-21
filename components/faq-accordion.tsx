"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem { q: string; a: string; }
interface FAQCategory { category: string; items: FAQItem[]; }

export default function FAQAccordion({ categories }: { categories: FAQCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.category} className="ohanna-card overflow-hidden">
          <div className="bg-[#1B1B1B] px-6 py-4">
            <h2 className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest">{cat.category}</h2>
          </div>
          <div className="divide-y divide-[#1B1B1B]/6">
            {cat.items.map((item, i) => {
              const key = `${cat.category}-${i}`;
              const isOpen = openKey === key;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#FDF8EF]/50 transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm leading-snug">{item.q}</span>
                    {isOpen
                      ? <ChevronUp className="h-4 w-4 shrink-0 text-[#C89D29]" />
                      : <ChevronDown className="h-4 w-4 shrink-0 text-[#1B1B1B]/30 group-hover:text-[#C89D29] transition-colors" />
                    }
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-[#1B1B1B]/60 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
