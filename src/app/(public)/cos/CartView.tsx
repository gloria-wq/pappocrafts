"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/lib/utils";

export default function CartView() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={48} className="mx-auto text-warm-300 mb-4" />
        <p className="text-lg text-navy-500 font-medium">Coșul tău este gol</p>
        <Link
          href="/magazin"
          className="inline-block mt-4 px-8 py-3 bg-russet-500 text-white font-bold rounded-full hover:bg-russet-600 transition-colors shadow-[0_6px_20px_rgba(162,110,115,0.3)]"
        >
          Explorează magazinul
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="flex gap-4 bg-white rounded-2xl p-4 border border-warm-300/40">
          <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-warm-100">
            <Image src={getImageUrl(product.images?.[0] ?? null)} alt={product.name} fill className="object-cover" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/produs/${product.slug}`} className="text-[13px] font-medium text-navy-700 hover:text-russet-500 line-clamp-2 transition-colors">
              {product.name}
            </Link>
            <div className="font-[var(--font-heading)] mt-1">
              <span className="text-sm font-bold text-navy-700">{product.price.toFixed(0)}</span>
              <span className="text-[11px] text-navy-400 ml-1 font-[var(--font-body)]">RON</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} disabled={quantity <= 1} className="p-1.5 border border-warm-300/80 rounded-full text-navy-400 hover:text-navy-700 disabled:opacity-30">
                <Minus size={12} />
              </button>
              <span className="w-7 text-center text-[13px] font-semibold">{quantity}</span>
              <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 border border-warm-300/80 rounded-full text-navy-400 hover:text-navy-700">
                <Plus size={12} />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <button onClick={() => removeItem(product.id)} className="p-1.5 text-warm-400 hover:text-red-500 transition-colors">
              <Trash2 size={15} />
            </button>
            <div className="font-[var(--font-heading)]">
              <span className="text-sm font-bold text-navy-700">{(product.price * quantity).toFixed(0)}</span>
              <span className="text-[10px] text-navy-400 ml-0.5 font-[var(--font-body)]">RON</span>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-2xl p-6 border border-warm-300/40 mt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-navy-700">Total</span>
          <div className="font-[var(--font-heading)]">
            <span className="text-2xl font-bold text-navy-700">{totalPrice.toFixed(0)}</span>
            <span className="text-sm text-navy-400 ml-1 font-[var(--font-body)]">RON</span>
          </div>
        </div>
        <Link href="/checkout" className="block w-full py-[14px] bg-russet-500 text-white font-bold text-[14px] rounded-full text-center hover:bg-russet-600 transition-colors shadow-[0_6px_20px_rgba(162,110,115,0.3)]">
          Finalizează comanda
        </Link>
        <Link href="/magazin" className="block mt-3 text-center text-[13px] text-russet-500 font-semibold hover:underline">
          Continuă cumpărăturile
        </Link>
      </div>
    </div>
  );
}
