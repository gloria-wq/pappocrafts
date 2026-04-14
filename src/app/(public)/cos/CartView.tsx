"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getImageUrl } from "@/lib/utils";

export default function CartView() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={48} className="mx-auto text-earth-300 mb-4" />
        <p className="text-lg text-earth-600">Coșul tău este gol</p>
        <Link
          href="/magazin"
          className="inline-block mt-4 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700"
        >
          Explorează magazinul
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="flex gap-4 bg-white rounded-xl p-4 border border-earth-100"
        >
          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-earth-100">
            <Image
              src={getImageUrl(product.images?.[0] ?? null)}
              alt={product.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/produs/${product.slug}`}
              className="text-sm font-medium text-earth-800 hover:text-brand-600 line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-sm font-bold text-brand-700 mt-1">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
                className="p-1.5 border border-earth-200 rounded text-earth-500 hover:text-earth-800 disabled:opacity-30"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="p-1.5 border border-earth-200 rounded text-earth-500 hover:text-earth-800"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <button
              onClick={() => removeItem(product.id)}
              className="p-1.5 text-earth-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
            <p className="text-sm font-bold text-earth-800">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl p-6 border border-earth-100 mt-6">
        <div className="flex items-center justify-between text-lg font-bold text-earth-900">
          <span>Total</span>
          <span className="text-brand-700">{formatPrice(totalPrice)}</span>
        </div>
        <Link
          href="/checkout"
          className="block mt-4 w-full py-3.5 bg-brand-600 text-white font-semibold rounded-xl text-center hover:bg-brand-700 transition-colors"
        >
          Finalizează comanda
        </Link>
        <Link
          href="/magazin"
          className="block mt-2 text-center text-sm text-brand-600 hover:underline"
        >
          Continuă cumpărăturile
        </Link>
      </div>
    </div>
  );
}
