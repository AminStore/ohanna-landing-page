"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { fmt } from "@/lib/products-data";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!items.length) return;
    setLoading(true);
    try {
      const origin = window.location.origin;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/cart`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        if (data.url.includes("stripe.com")) {
          window.location.href = data.url;
        } else {
          clearCart();
          router.push(data.url.replace(origin, ""));
        }
      } else {
        throw new Error(data.error ?? "Checkout failed");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="h-7 w-7 text-[#C89D29]" />
              <h1 className="text-3xl font-black hieroglyph-font">YOUR CART</h1>
              <span className="text-sm text-[#1B1B1B]/40 font-semibold">
                ({items.length} item{items.length !== 1 ? "s" : ""})
              </span>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-24 border-2 border-[#1B1B1B]/10 bg-white">
                <span className="text-7xl block mb-6 text-[#C89D29]/30">𓋹</span>
                <p className="font-black hieroglyph-font text-[#1B1B1B]/30 tracking-widest text-sm mb-6">
                  YOUR CART IS EMPTY
                </p>
                <Link href="/collection">
                  <Button className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    BROWSE COLLECTION
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Items list */}
                <div className="lg:col-span-2 space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size ?? "default"}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 bg-white border-2 border-[#1B1B1B] p-4"
                      >
                        <Link
                          href={`/product/${item.product.slug ?? item.product.id}`}
                          className="relative w-24 h-28 flex-shrink-0 border-2 border-[#1B1B1B] overflow-hidden bg-[#E4D5B7]"
                        >
                          <Image
                            src={item.product.image_url}
                            alt={item.product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </Link>
                        <div className="flex-1">
                          <span className="text-[10px] font-black hieroglyph-font text-[#C89D29]">
                            {item.product.category}
                          </span>
                          <h3 className="font-black hieroglyph-font text-sm mt-0.5">
                            {item.product.name}
                          </h3>
                          {item.size && (
                            <p className="text-xs text-[#1B1B1B]/40">Size: {item.size}</p>
                          )}
                          <p className="font-black text-[#C89D29] text-lg mt-1">
                            {fmt(item.product.price * item.quantity)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border-2 border-[#1B1B1B]">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-[#1B1B1B] hover:text-[#FDF8EF] transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-[#1B1B1B] hover:text-[#FDF8EF] transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                removeFromCart(item.product.id, item.size);
                                toast.success(`${item.product.name} removed`);
                              }}
                              className="text-[#1B1B1B]/30 hover:text-[#AE1C1C] transition-colors p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Link
                    href="/collection"
                    className="inline-flex items-center gap-2 text-sm text-[#1B1B1B]/50 hover:text-[#C89D29] transition-colors font-semibold mt-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>

                {/* Summary */}
                <div className="bg-[#E4D5B7] border-2 border-[#1B1B1B] p-6 h-fit space-y-4">
                  <h2 className="font-black hieroglyph-font tracking-wider text-sm border-b-2 border-[#1B1B1B]/20 pb-3">
                    ORDER SUMMARY
                  </h2>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-xs">
                        <span className="text-[#1B1B1B]/60 truncate mr-2">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-bold shrink-0">{fmt(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-[#1B1B1B]/20 pt-3 flex justify-between items-center">
                    <span className="font-black hieroglyph-font text-sm tracking-wider">TOTAL</span>
                    <span className="font-black text-[#C89D29] text-2xl">{fmt(total)}</span>
                  </div>
                  <p className="text-[10px] text-[#1B1B1B]/40">
                    Shipping calculated at checkout · Secure payment via Stripe
                  </p>
                  <Button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black tracking-wider py-3"
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> PROCESSING...</>
                    ) : (
                      <><ArrowRight className="h-4 w-4 mr-2" /> PROCEED TO CHECKOUT</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
