"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const imgSrc = getImageUrl(product.images?.[0] ?? null);

  return (
    <div className="group bg-white rounded-[18px] overflow-hidden shadow-[0_2px_16px_rgba(0,38,58,0.06)] border border-warm-300/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,38,58,0.13)]">
      <Link
        href={`/produs/${product.slug}`}
        className="block relative aspect-[4/5] overflow-hidden bg-warm-100"
      >
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-navy-700/50 flex items-center justify-center">
            <span className="bg-white text-navy-700 text-xs font-bold px-4 py-1.5 rounded-full">
              Stoc epuizat
            </span>
          </div>
        )}
        {product.featured && product.in_stock && (
          <span className="absolute top-3 left-3 bg-russet-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            Bestseller
          </span>
        )}
      </Link>

      <div className="p-4">
        {product.category && (
          <span className="text-[11px] font-semibold text-russet-400 uppercase tracking-wider">
            {product.category.name}
          </span>
        )}
        <Link href={`/produs/${product.slug}`}>
          <h3 className="text-sm font-medium text-navy-700 line-clamp-2 leading-snug mt-1 hover:text-russet-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.review_count > 0 && (
          <div className="flex items-center gap-0.5 mt-2 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(product.rating_avg)
                    ? "fill-amber-400"
                    : "text-warm-200 fill-warm-200"
                }
              />
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="font-[var(--font-heading)]">
            <span className="text-lg font-bold text-navy-700">
              {product.price.toFixed(0)}
            </span>
            <span className="text-xs font-normal text-navy-500 ml-1 font-[var(--font-body)]">
              RON
            </span>
          </div>
          {product.in_stock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="w-9 h-9 rounded-full bg-russet-500 text-white flex items-center justify-center hover:bg-russet-600 transition-colors shadow-[0_4px_12px_rgba(162,110,115,0.3)]"
              title="Adaugă în coș"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
