"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, CheckCircle2, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { getProductById, fmt, BADGE_STYLES, PRODUCTS } from "@/lib/products-data";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) notFound();

  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    setAdded(true);
    toast.success(`${product.name} (${selectedSize}) × ${quantity} added! 𓋹`, {
      action: { label: "View Cart", onClick: openCart },
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-sm text-[#1B1B1B]/50 hover:text-[#C89D29] transition-colors font-semibold mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] border-4 border-[#1B1B1B] overflow-hidden bg-[#E4D5B7] shadow-[8px_8px_0_#1B1B1B]">
                <Image
                  src={product.image_url}
                  alt={`${product.name} — OHANNA Egyptian Streetwear`}
                  fill
                  className="object-cover"
                  priority
                />
                <Badge
                  className={`absolute top-4 left-4 text-xs font-black sketchy-border ${
                    BADGE_STYLES[product.badge] ?? "bg-[#1B1B1B] text-[#FDF8EF]"
                  }`}
                >
                  {product.badge}
                </Badge>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-black hieroglyph-font text-[#C89D29] tracking-widest">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black hieroglyph-font mt-1 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89D29] text-[#C89D29]" />
                  ))}
                  <span className="text-xs text-[#1B1B1B]/40 ml-1">4.9 (128 reviews)</span>
                </div>
              </div>

              <div className="text-4xl font-black text-[#C89D29]">{fmt(product.price)}</div>

              <p className="text-[#1B1B1B]/70 leading-relaxed text-sm">{product.description}</p>

              {/* Size selector */}
              <div>
                <p className="text-xs font-black hieroglyph-font tracking-wider mb-2">
                  SIZE — <span className="text-[#C89D29]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 text-xs font-black border-2 transition-all ${
                        selectedSize === s
                          ? "bg-[#1B1B1B] text-[#FDF8EF] border-[#1B1B1B]"
                          : "bg-white border-[#1B1B1B]/25 hover:border-[#C89D29] hover:text-[#C89D29]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs font-black hieroglyph-font tracking-wider mb-2">QUANTITY</p>
                <div className="flex items-center border-2 border-[#1B1B1B] w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#1B1B1B] hover:text-[#FDF8EF] transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#1B1B1B] hover:text-[#FDF8EF] transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <Button
                onClick={handleAdd}
                size="lg"
                className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black text-sm tracking-wider py-4"
              >
                {added ? (
                  <><CheckCircle2 className="h-5 w-5 mr-2" /> ADDED TO CART!</>
                ) : (
                  <><ShoppingBag className="h-5 w-5 mr-2" /> ADD TO CART — {fmt(product.price * quantity)}</>
                )}
              </Button>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: "𓋹", label: "FREE RETURNS" },
                  { icon: "𓂀", label: "SECURE PAYMENT" },
                  { icon: "𓅃", label: "FAST SHIPPING" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="text-center bg-[#E4D5B7] border-2 border-[#1B1B1B]/15 p-3"
                  >
                    <div className="text-xl text-[#C89D29]/60 mb-1">{item.icon}</div>
                    <p className="text-[9px] font-black hieroglyph-font text-[#1B1B1B]/50 tracking-wider">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-8 bg-[#C89D29] sketchy-line" />
                <h2 className="text-xl font-black hieroglyph-font">YOU MAY ALSO LIKE</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
