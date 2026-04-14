"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/get-data";
import type { Product, Category } from "@/types";
import { Search } from "lucide-react";

export default function ShopGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      search: search || undefined,
      sort,
      categorySlug: categoryFilter || undefined,
    }).then(({ products: p }) => {
      setProducts(p);
      setLoading(false);
    });
  }, [search, sort, categoryFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            type="text"
            placeholder="Caută produse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-warm-300/80 rounded-full text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {[{ value: "", label: "Toate" }, ...categories.map((c) => ({ value: c.slug, label: c.name }))].map(
            (f) => (
              <button
                key={f.value}
                onClick={() => setCategoryFilter(f.value)}
                className={`px-[18px] py-2 rounded-full text-[12px] font-semibold border transition-all ${
                  categoryFilter === f.value
                    ? "bg-russet-500 text-white border-russet-500"
                    : "bg-white text-navy-700 border-warm-300/80 hover:border-russet-300"
                }`}
              >
                {f.label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 bg-white border border-warm-300/80 rounded-full text-[12px] font-semibold text-navy-700 focus:outline-none focus:border-russet-300"
        >
          <option value="newest">Cele mai noi</option>
          <option value="price_asc">Preț: mic → mare</option>
          <option value="price_desc">Preț: mare → mic</option>
          <option value="rating">Cele mai apreciate</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-warm-100 rounded-2xl aspect-[4/5] animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-navy-400">
          <p className="text-lg font-medium">Nu am găsit produse.</p>
          <p className="text-sm mt-1 font-light">Încearcă să modifici filtrele.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
