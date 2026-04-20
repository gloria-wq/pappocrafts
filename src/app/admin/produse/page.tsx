"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import type { Product, Category } from "@/types";
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

// ── Image uploader sub-component ────────────────────────────────────────────
function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const db = getSupabaseBrowser();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await db.storage.from("images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (!error) {
        const { data } = db.storage.from("images").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }
    }

    onChange([...images, ...newUrls]);
    setUploading(false);
  };

  const removeImage = async (url: string, idx: number) => {
    // Try to delete from storage if it's our bucket
    const match = url.match(/\/storage\/v1\/object\/public\/images\/(.+)$/);
    if (match) {
      await db.storage.from("images").remove([match[1]]);
    }
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-earth-700">Fotografii</label>

      {/* Existing images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url, idx) => (
            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-earth-200 bg-earth-50">
              <Image
                src={url}
                alt={`Foto ${idx + 1}`}
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />
              <button
                type="button"
                onClick={() => removeImage(url, idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
              >
                <X size={10} />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded font-medium">
                  PRINCIPAL
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer transition-colors ${
          dragOver ? "border-brand-400 bg-brand-50" : "border-earth-200 hover:border-brand-300 hover:bg-earth-50"
        }`}
      >
        {uploading ? (
          <Loader2 size={24} className="text-brand-500 animate-spin" />
        ) : (
          <Upload size={24} className="text-earth-400" />
        )}
        <p className="text-sm text-earth-500 text-center">
          {uploading
            ? "Se încarcă..."
            : images.length === 0
              ? "Click sau trage fotografiile aici"
              : "Adaugă mai multe fotografii"}
        </p>
        <p className="text-[11px] text-earth-400">JPG, PNG, WEBP · max 10 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => uploadFiles(e.target.files)}
      />

      {/* URL input as fallback */}
      <details className="text-xs">
        <summary className="cursor-pointer text-earth-400 hover:text-earth-600 select-none">
          Sau adaugă URL extern
        </summary>
        <div className="mt-2 flex gap-2">
          <input
            type="url"
            placeholder="https://..."
            className="flex-1 px-2 py-1.5 border border-earth-200 rounded text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val) { onChange([...images, val]); (e.target as HTMLInputElement).value = ""; }
              }
            }}
          />
          <button
            type="button"
            className="px-3 py-1.5 bg-earth-100 text-earth-700 rounded text-xs hover:bg-earth-200"
            onClick={(e) => {
              const input = (e.currentTarget.previousSibling as HTMLInputElement);
              const val = input.value.trim();
              if (val) { onChange([...images, val]); input.value = ""; }
            }}
          >
            Adaugă
          </button>
        </div>
      </details>
    </div>
  );
}

// ── Main admin page ──────────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

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
    setSaving(true);
    const data = {
      name: editing.name,
      slug: editing.slug || editing.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
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
    setSaving(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest produs?")) return;
    await db.from("products").delete().eq("id", id);
    load();
  };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-earth-500 py-8 text-center">Se încarcă...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-2xl font-bold text-earth-900">Produse ({products.length})</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Caută produs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-earth-200 rounded-lg text-sm w-52"
          />
          <button
            onClick={() => setEditing({ name: "", price: 0, in_stock: true, featured: false, images: [] })}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700"
          >
            <Plus size={16} /> Adaugă produs
          </button>
        </div>
      </div>

      {/* Edit / Add modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-earth-100">
              <h3 className="font-semibold text-lg text-earth-900">
                {editing.id ? "Editează produs" : "Adaugă produs nou"}
              </h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-full hover:bg-earth-100 text-earth-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* ── Photos ── */}
              <ImageUploader
                images={(editing.images as string[]) ?? []}
                onChange={(imgs) => setEditing({ ...editing, images: imgs })}
              />

              <hr className="border-earth-100" />

              {/* ── Name & slug ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Nume *</label>
                  <input
                    value={editing.name ?? ""}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Slug (URL)</label>
                  <input
                    value={editing.slug ?? ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm focus:outline-none focus:border-brand-400"
                    placeholder="auto-generat"
                  />
                </div>
              </div>

              {/* ── Description ── */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Descriere</label>
                <textarea
                  rows={3}
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm focus:outline-none focus:border-brand-400 resize-none"
                />
              </div>

              {/* ── Price & category ── */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Preț (lei)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editing.price ?? 0}
                    onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Categorie</label>
                  <select
                    value={editing.category_id ?? ""}
                    onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })}
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm focus:outline-none focus:border-brand-400"
                  >
                    <option value="">Fără categorie</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Toggles ── */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editing.featured ?? false}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    className="rounded"
                  />
                  Produs vedetă (apare pe homepage)
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editing.in_stock ?? true}
                    onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })}
                    className="rounded"
                  />
                  În stoc
                </label>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-earth-100">
              <button
                onClick={handleSave}
                disabled={saving || !editing.name}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Se salvează..." : "Salvează"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2.5 border border-earth-200 rounded-lg text-sm hover:bg-earth-50"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white rounded-xl border border-earth-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-earth-100 bg-earth-50">
              <th className="text-left px-4 py-3 font-medium text-earth-600 w-12"></th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Produs</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Preț</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600 hidden md:table-cell">Stoc</th>
              <th className="text-right px-4 py-3 font-medium text-earth-600">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50">
            {filtered.map((p) => {
              const thumb = (p.images as string[])?.[0];
              return (
                <tr key={p.id} className="hover:bg-earth-50/50">
                  <td className="pl-4 py-2">
                    {thumb ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-earth-100 relative shrink-0">
                        <Image src={thumb} alt="" fill className="object-cover" sizes="40px" unoptimized />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-earth-100 flex items-center justify-center">
                        <ImageIcon size={16} className="text-earth-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-earth-800 line-clamp-1">{p.name}</p>
                    {p.featured && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">VEDETĂ</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-earth-600">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.in_stock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {p.in_stock ? "În stoc" : "Epuizat"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="p-1.5 text-earth-400 hover:text-brand-600 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-earth-400 hover:text-red-500 ml-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-10 text-earth-500">
            {search ? "Niciun produs găsit." : "Nu există produse încă."}
          </p>
        )}
      </div>
    </div>
  );
}
