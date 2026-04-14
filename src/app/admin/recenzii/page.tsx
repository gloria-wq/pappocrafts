"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { Review } from "@/types";
import { Star, Check, Trash2 } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const { data } = await db
      .from("reviews")
      .select("*, product:products(name)")
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const toggleVerified = async (id: string, current: boolean) => {
    await db.from("reviews").update({ verified: !current }).eq("id", id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi această recenzie?")) return;
    await db.from("reviews").delete().eq("id", id);
    load();
  };

  if (loading) return <div className="text-earth-500">Se încarcă...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-earth-900 mb-6">Recenzii ({reviews.length})</h2>

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-xl p-5 border border-earth-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-earth-800">{r.author_name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-earth-200"} />
                    ))}
                  </div>
                  {r.verified && <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">Verificat</span>}
                </div>
                <p className="text-xs text-earth-400 mb-2">
                  {(r.product as unknown as { name: string })?.name ?? "Produs necunoscut"} &bull; {new Date(r.created_at).toLocaleDateString("ro-RO")}
                </p>
                {r.content && <p className="text-sm text-earth-600">{r.content}</p>}
              </div>
              <div className="flex gap-1 shrink-0 ml-4">
                <button
                  onClick={() => toggleVerified(r.id, r.verified)}
                  className={`p-1.5 rounded ${r.verified ? "text-green-600 bg-green-50" : "text-earth-400 hover:text-green-600"}`}
                  title={r.verified ? "Anulează verificarea" : "Verifică"}
                >
                  <Check size={16} />
                </button>
                <button onClick={() => handleDelete(r.id)} className="p-1.5 text-earth-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center py-10 text-earth-500">Nu există recenzii încă.</p>}
      </div>
    </div>
  );
}
