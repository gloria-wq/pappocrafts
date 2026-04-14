"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { Category } from "@/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const { data } = await db.from("categories").select("*").order("sort_order");
    setCategories((data as Category[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing?.name) return;
    const payload = {
      name: editing.name,
      slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: editing.description || "",
      icon: editing.icon || null,
      sort_order: editing.sort_order ?? 0,
    };
    if (editing.id) {
      await db.from("categories").update(payload).eq("id", editing.id);
    } else {
      await db.from("categories").insert(payload);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi această categorie?")) return;
    await db.from("categories").delete().eq("id", id);
    load();
  };

  if (loading) return <div className="text-earth-500">Se încarcă...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Categorii ({categories.length})</h2>
        <button onClick={() => setEditing({ name: "", sort_order: 0 })} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700">
          <Plus size={16} /> Adaugă categorie
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{editing.id ? "Editează" : "Adaugă"} categorie</h3>
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
                <input value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Emoji</label>
                  <input value={editing.icon ?? ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" placeholder="🪶" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Ordine</label>
                  <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700">Salvează</button>
                <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-earth-200 rounded-lg text-sm hover:bg-earth-50">Anulează</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-5 border border-earth-100">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">{c.icon ?? "📦"}</span>
                <h3 className="font-semibold text-earth-800 mt-2">{c.name}</h3>
                <p className="text-xs text-earth-500 mt-1">{c.description}</p>
                <p className="text-[10px] text-earth-400 mt-1">/{c.slug}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(c)} className="p-1.5 text-earth-400 hover:text-brand-600"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 text-earth-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && <p className="text-earth-500 col-span-full text-center py-10">Nu există categorii încă.</p>}
      </div>
    </div>
  );
}
