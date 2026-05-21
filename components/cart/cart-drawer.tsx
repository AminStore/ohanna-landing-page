"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { fmt } from "@/lib/products-data";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = async () => {
    if (!items.length) return;
    closeCart();
    router.push("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1B1B1B]/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-50 bg-[#FDF8EF] border-l-4 border-[#1B1B1B] flex flex-col shadow-[-8px_0_0_rgba(0,0,0,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-4 border-[#1B1B1B] bg-[#E4D5B7]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#C89D29]" />
                <span className="font-black hieroglyph-font tracking-wider text-sm">
                  YOUR CART ({itemCount})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1 hover:text-[#C89D29] transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-16"
                  >
                    <span className="text-6xl text-[#C89D29]/30">𓋹</span>
                    <p className="font-black hieroglyph-font text-[#1B1B1B]/30 text-xs tracking-widest">
                      YOUR CART IS EMPTY
                    </p>
                    <Button
                      onClick={closeCart}
                      className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button text-xs font-black"
                    >
                      BROWSE COLLECTION
                    </Button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size ?? "default"}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-white border-2 border-[#1B1B1B] p-3 sketch-hover"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 border-2 border-[#1B1B1B] overflow-hidden bg-[#E4D5B7]">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black hieroglyph-font truncate">{item.product.name}</p>
                        {item.size && (
                          <p className="text-[10px] text-[#1B1B1B]/50">Size: {item.size}</p>
                        )}
                        <p className="text-[#C89D29] font-black text-sm mt-0.5">
                          {fmt(item.product.price * item.quantity)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.size)
                            }
                            className="w-6 h-6 border-2 border-[#1B1B1B] flex items-center justify-center hover:bg-[#1B1B1B] hover:text-[#FDF8EF] transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.size)
                            }
                            className="w-6 h-6 border-2 border-[#1B1B1B] flex items-center justify-center hover:bg-[#1B1B1B] hover:text-[#FDF8EF] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.product.id, item.size);
                          toast.success(`${item.product.name} removed`, {
                            icon: "🗑️",
                          });
                        }}
                        className="p-1 text-[#1B1B1B]/30 hover:text-[#AE1C1C] transition-colors self-start mt-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t-4 border-[#1B1B1B] p-5 bg-[#E4D5B7] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-black hieroglyph-font text-sm tracking-wider">SUBTOTAL</span>
                  <span className="font-black text-[#C89D29] text-xl">{fmt(total)}</span>
                </div>
                <p className="text-[10px] text-[#1B1B1B]/50">
                  Shipping & taxes calculated at checkout
                </p>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black py-3 text-sm tracking-wider"
                >
                  CHECKOUT
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Link
                  href="/collection"
                  onClick={closeCart}
                  className="block text-center text-xs text-[#1B1B1B]/50 hover:text-[#C89D29] transition-colors font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
