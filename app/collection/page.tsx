"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, X, Filter, Eye } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product/product-card";
import { ProductGridSkeleton } from "@/components/product/product-skeleton";
import { PRODUCTS, CATEGORIES, getProductsByCategory } from "@/lib/products-data";
import type { Product } from "@/lib/types";

function useDebounce<T>(val: T, ms: number) {
  const [deb, setDeb] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => setDeb(val), ms);
    return () => clearTimeout(t);
  }, [val, ms]);
  return deb;
}

function getInitialCategory() {
  if (typeof window === "undefined") return "All";
  return new URLSearchParams(window.location.search).get("category") ?? "All";
}

export default function CollectionPage() {
  const [category, setCategory] = useState(getInitialCategory);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let results = getProductsByCategory(category);
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        );
      }
      setProducts(results);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [category, debouncedSearch]);

  const handleCategory = useCallback((cat: string) => {
    setCategory(cat);
    const url = new URL(window.location.href);
    if (cat === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", cat);
    window.history.replaceState(null, "", url.toString());
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="py-14 bg-gradient-to-b from-[#E4D5B7]/70 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 w-12 bg-[#C89D29] sketchy-line" />
              <Eye className="h-7 w-7 text-[#C89D29]" />
              <div className="h-1 w-12 bg-[#C89D29] sketchy-line" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-3">SACRED COLLECTION</h1>
            <p className="text-[#1B1B1B]/55 text-sm max-w-lg mx-auto">
              {products.length > 0
                ? `${products.length} premium Egyptian streetwear piece${products.length !== 1 ? "s" : ""}`
                : "Ancient power in modern form"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[61px] z-20 bg-[#FDF8EF]/95 backdrop-blur-sm border-b-2 border-[#1B1B1B]/10 py-3 shadow-sm">
        <div className="container mx-auto px-4 space-y-3">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B1B1B]/40 pointer-events-none" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search pieces..."
              className="w-full pl-9 pr-8 py-2 text-sm border-2 border-[#1B1B1B]/15 bg-white focus:outline-none focus:border-[#C89D29] transition-colors placeholder:text-[#1B1B1B]/30"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40 hover:text-[#1B1B1B]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Filter className="h-4 w-4 text-[#1B1B1B]/40 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`shrink-0 px-4 py-1.5 text-xs font-black hieroglyph-font border-2 transition-all ${
                  category === cat
                    ? "bg-[#1B1B1B] text-[#FDF8EF] border-[#1B1B1B]"
                    : "bg-white border-[#1B1B1B]/15 text-[#1B1B1B]/60 hover:border-[#C89D29] hover:text-[#C89D29]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <span className="text-6xl block mb-4 text-[#C89D29]/30">𓋹</span>
              <p className="font-black hieroglyph-font text-[#1B1B1B]/30 text-xs tracking-widest mb-2">
                NO PIECES FOUND
              </p>
              <p className="text-xs text-[#1B1B1B]/30">
                {searchInput ? `No results for "${searchInput}"` : "Try a different category"}
              </p>
              <button
                onClick={() => { setSearchInput(""); handleCategory("All"); }}
                className="mt-4 text-xs font-black hieroglyph-font text-[#C89D29] hover:underline"
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
