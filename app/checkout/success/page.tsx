"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("order_id") ?? params.get("session_id") ?? `OHN-${Date.now()}`;
  const total = params.get("total");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center max-w-lg w-full bg-white border-4 border-[#1B1B1B] p-10 shadow-[8px_8px_0_#1B1B1B]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-[#C89D29] border-4 border-[#1B1B1B] flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-[#1B1B1B]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-4"
          >
            <div className="text-4xl text-[#C89D29]/50 mb-2">𓋹</div>
            <h1 className="text-3xl font-black hieroglyph-font">ORDER CONFIRMED!</h1>
            <p className="text-[#1B1B1B]/60 text-sm leading-relaxed">
              Your sacred streetwear is on its way. The pharaohs approve.
            </p>

            <div className="bg-[#E4D5B7] border-2 border-[#1B1B1B] p-4 space-y-2 text-left mt-6">
              <div className="flex justify-between text-sm">
                <span className="font-black hieroglyph-font text-xs tracking-wider">ORDER ID</span>
                <span className="font-bold text-[#C89D29]">{orderId.slice(0, 20)}</span>
              </div>
              {total && (
                <div className="flex justify-between text-sm">
                  <span className="font-black hieroglyph-font text-xs tracking-wider">TOTAL PAID</span>
                  <span className="font-bold">
                    EGP {parseInt(total).toLocaleString("en-EG")}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="font-black hieroglyph-font text-xs tracking-wider">STATUS</span>
                <span className="text-[#1D4D4F] font-bold text-xs">CONFIRMED ✓</span>
              </div>
            </div>

            <p className="text-xs text-[#1B1B1B]/40 mt-2">
              A confirmation email will be sent to your inbox. Estimated delivery: 3-5 business days.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/collection" className="flex-1">
                <Button className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black text-xs tracking-wider">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  SHOP MORE
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#FDF8EF] font-black text-xs tracking-wider"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  HOME
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
