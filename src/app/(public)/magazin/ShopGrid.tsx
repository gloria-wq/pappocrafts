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
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
          <input
            type="text"
            placeholder="Caută produse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          <option value="">Toate categoriile</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 bg-white border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          <option value="newest">Cele mai noi</option>
          <option value="price_asc">Preț: mic → mare</option>
          <option value="price_desc">Preț: mare → mic</option>
          <option value="rating">Cele mai apreciate</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-earth-100 rounded-xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-earth-500">
          <p className="text-lg">Nu am găsit produse.</p>
          <p className="text-sm mt-1">Încearcă să modifici filtrele.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
