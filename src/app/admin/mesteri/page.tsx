"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { Artisan } from "@/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [editing, setEditing] = useState<Partial<Artisan> | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const { data } = await db.from("artisans").select("*").order("sort_order");
    setArtisans((data as Artisan[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing?.name) return;
    const payload = {
      name: editing.name,
      role: editing.role || "",
      quote: editing.quote || null,
      sort_order: editing.sort_order ?? 0,
    };
    if (editing.id) {
      await db.from("artisans").update(payload).eq("id", editing.id);
    } else {
      await db.from("artisans").insert(payload);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest meșter?")) return;
    await db.from("artisans").delete().eq("id", id);
    load();
  };

  if (loading) return <div className="text-earth-500">Se încarcă...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Meșteri ({artisans.length})</h2>
        <button onClick={() => setEditing({ name: "", role: "", sort_order: 0 })} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700">
          <Plus size={16} /> Adaugă meșter
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{editing.id ? "Editează" : "Adaugă"} meșter</h3>
              <button onClick={() => setEditing(null)} className="text-earth-400 hover:text-earth-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Nume *</label>
                <input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Rol</label>
                <input value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" placeholder="Meșter popular" />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Citat</label>
                <textarea rows={3} value={editing.quote ?? ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Ordine</label>
                <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700">Salvează</button>
                <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-earth-200 rounded-lg text-sm hover:bg-earth-50">Anulează</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {artisans.map((a) => (
          <div key={a.id} className="bg-white rounded-xl p-5 border border-earth-100">
            <div className="flex justify-end gap-1 mb-2">
              <button onClick={() => setEditing(a)} className="p-1.5 text-earth-400 hover:text-brand-600"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(a.id)} className="p-1.5 text-earth-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 mx-auto flex items-center justify-center text-xl font-bold text-brand-700">
                {a.name.charAt(0)}
              </div>
              <h3 className="mt-3 font-semibold text-earth-800">{a.name}</h3>
              <p className="text-sm text-brand-600">{a.role}</p>
              {a.quote && <p className="text-xs text-earth-500 italic mt-2 line-clamp-3">{a.quote}</p>}
            </div>
          </div>
        ))}
        {artisans.length === 0 && <p className="text-earth-500 col-span-full text-center py-10">Nu există meșteri încă.</p>}
      </div>
    </div>
  );
}
