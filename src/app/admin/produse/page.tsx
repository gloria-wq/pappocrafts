"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import type { Product, Category } from "@/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);

  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const [{ data: p }, { data: c }] = await Promise.all([
      db.from("products").select("*").order("created_at", { ascending: false }),
      db.from("categories").select("*").order("sort_order"),
    ]);
    setProducts((p as Product[]) ?? []);
    setCategories((c as Category[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing?.name) return;
    const data = {
      name: editing.name,
      slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: editing.description || "",
      price: Number(editing.price) || 0,
      category_id: editing.category_id || null,
      featured: editing.featured ?? false,
      in_stock: editing.in_stock ?? true,
      images: editing.images ?? [],
    };

    if (editing.id) {
      await db.from("products").update(data).eq("id", editing.id);
    } else {
      await db.from("products").insert(data);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest produs?")) return;
    await db.from("products").delete().eq("id", id);
    load();
  };

  if (loading) return <div className="text-earth-500">Se încarcă...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Produse ({products.length})</h2>
        <button
          onClick={() => setEditing({ name: "", price: 0, in_stock: true, featured: false, images: [] })}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700"
        >
          <Plus size={16} /> Adaugă produs
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{editing.id ? "Editează" : "Adaugă"} produs</h3>
              <button onClick={() => setEditing(null)} className="text-earth-400 hover:text-earth-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Nume *</label>
                <input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Slug</label>
                <input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" placeholder="auto-generat" />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Descriere</label>
                <textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Preț (lei)</label>
                  <input type="number" step="0.01" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Categorie</label>
                  <select value={editing.category_id ?? ""} onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm">
                    <option value="">Fără categorie</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
                  Produs vedetă
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.in_stock ?? true} onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })} className="rounded" />
                  În stoc
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700">Salvează</button>
                <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-earth-200 rounded-lg text-sm hover:bg-earth-50">Anulează</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-earth-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-earth-100 bg-earth-50">
              <th className="text-left px-4 py-3 font-medium text-earth-600">Produs</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Preț</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600 hidden md:table-cell">Stoc</th>
              <th className="text-right px-4 py-3 font-medium text-earth-600">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-earth-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-earth-800 line-clamp-1">{p.name}</p>
                  {p.featured && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">VEDETĂ</span>}
                </td>
                <td className="px-4 py-3 text-earth-600">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.in_stock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {p.in_stock ? "În stoc" : "Epuizat"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(p)} className="p-1.5 text-earth-400 hover:text-brand-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-earth-400 hover:text-red-500 ml-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center py-10 text-earth-500">Nu există produse încă.</p>
        )}
      </div>
    </div>
  );
}
