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
      <button
        disabled
        className="w-full py-3.5 bg-earth-200 text-earth-500 font-semibold rounded-xl cursor-not-allowed"
      >
        Stoc Epuizat
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-earth-200 rounded-lg">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="p-3 text-earth-500 hover:text-earth-800"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-medium text-sm">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="p-3 text-earth-500 hover:text-earth-800"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={`flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
          added
            ? "bg-green-600 text-white"
            : "bg-brand-600 text-white hover:bg-brand-700"
        }`}
      >
        {added ? (
          <>
            <Check size={18} /> Adăugat în coș
          </>
        ) : (
          <>
            <ShoppingCart size={18} /> Adaugă în coș
          </>
        )}
      </button>
    </div>
  );
}
