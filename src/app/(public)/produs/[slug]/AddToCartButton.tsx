"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.in_stock) {
    return (
      <button disabled className="w-full py-[15px] bg-warm-200 text-navy-400 font-bold text-[15px] rounded-full cursor-not-allowed">
        Stoc Epuizat
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-warm-300/80 rounded-full overflow-hidden">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-navy-400 hover:text-navy-700">
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-semibold text-[13px] text-navy-700">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-navy-400 hover:text-navy-700">
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={`flex-1 py-[15px] rounded-full font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all shadow-[0_6px_20px_rgba(162,110,115,0.3)] ${
          added
            ? "bg-teal-500 text-white"
            : "bg-russet-500 text-white hover:bg-russet-600"
        }`}
      >
        {added ? (
          <><Check size={18} /> Adăugat în coș</>
        ) : (
          <><ShoppingCart size={18} /> Adaugă în coș</>
        )}
      </button>
    </div>
  );
}
