"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { fmt, BADGE_STYLES } from "@/lib/products-data";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 𓋹`, {
      action: { label: "View Cart", onClick: openCart },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.36) }}
      className="bg-white border-2 border-[#1B1B1B] overflow-hidden group sketch-hover"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[3/4] relative bg-[#E4D5B7]">
          <Image
            src={imgError ? "/placeholder.jpg" : product.image_url}
            alt={`${product.name} — OHANNA Egyptian Streetwear`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <Badge
          className={`absolute top-3 left-3 text-[10px] font-black tracking-wider sketchy-border ${
            BADGE_STYLES[product.badge] ?? "bg-[#1B1B1B] text-[#FDF8EF]"
          }`}
        >
          {product.badge}
        </Badge>
        <Link
          href={`/product/${product.slug ?? product.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1B1B1B]/40"
          aria-label={`View ${product.name}`}
        >
          <span className="bg-[#FDF8EF] text-[#1B1B1B] border-2 border-[#1B1B1B] px-4 py-2 text-xs font-black hieroglyph-font flex items-center gap-2 sketchy-button">
            <Eye className="h-3.5 w-3.5" />
            QUICK VIEW
          </span>
        </Link>
      </div>

      <div className="p-4">
        <span className="text-[10px] font-black hieroglyph-font text-[#C89D29] tracking-widest">
          {product.category}
        </span>
        <h3 className="text-sm font-black hieroglyph-font mt-0.5 mb-1 leading-tight text-[#1B1B1B]">
          {product.name}
        </h3>
        <p className="text-xs text-[#1B1B1B]/50 line-clamp-2 leading-relaxed mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-black text-[#C89D29]">{fmt(product.price)}</span>
          <Button
            size="sm"
            onClick={handleAdd}
            className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button text-[11px] font-black px-3 transition-all"
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1" />
            ADD
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
