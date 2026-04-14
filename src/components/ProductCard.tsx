"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getImageUrl } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const imgSrc = getImageUrl(product.images?.[0] ?? null);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-earth-100">
      <Link href={`/produs/${product.slug}`} className="block relative aspect-square overflow-hidden bg-earth-100">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-earth-800 text-xs font-semibold px-3 py-1 rounded-full">
              Stoc epuizat
            </span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/produs/${product.slug}`}>
          <h3 className="text-sm font-medium text-earth-800 line-clamp-2 leading-snug hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.review_count > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-earth-500">
              {product.rating_avg.toFixed(2)} ({product.review_count})
            </span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-bold text-brand-700">
            {formatPrice(product.price)}
          </span>
          {product.in_stock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
              title="Adaugă în coș"
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
