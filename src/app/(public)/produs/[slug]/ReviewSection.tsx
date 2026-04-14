"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types";

export default function ReviewSection({ reviews, productId }: { reviews: Review[]; productId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, author_name: name, rating, content }),
      });
      setSubmitted(true);
      setShowForm(false);
    } catch {
      alert("Eroare la trimitere. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-[11px] bg-warm-50 border border-warm-300/80 rounded-[10px] text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors";

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-navy-700">Recenzii ({reviews.length})</h2>
        {!submitted && (
          <button onClick={() => setShowForm(!showForm)} className="text-[13px] font-semibold text-russet-500 hover:text-russet-600">
            {showForm ? "Anulează" : "Scrie o recenzie"}
          </button>
        )}
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-teal-50 text-teal-700 rounded-2xl text-[13px] border border-teal-200">
          Mulțumim pentru recenzie! Va fi publicată după verificare.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-warm-100 rounded-2xl p-6 space-y-4 border border-warm-300/40">
          <div>
            <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Numele tău</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <button key={v} type="button" onClick={() => setRating(v)} className="p-1">
                  <Star size={24} className={v <= rating ? "fill-amber-400 text-amber-400" : "text-warm-200"} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Recenzia ta</label>
            <textarea rows={3} value={content} onChange={(e) => setContent(e.target.value)} className={`${inputCls} resize-none`} />
          </div>
          <button type="submit" disabled={submitting} className="px-6 py-[11px] bg-russet-500 text-white font-bold text-[13px] rounded-full hover:bg-russet-600 disabled:opacity-50 shadow-[0_4px_12px_rgba(162,110,115,0.3)]">
            {submitting ? "Se trimite..." : "Trimite recenzia"}
          </button>
        </form>
      )}

      {reviews.length === 0 && !submitted ? (
        <p className="text-navy-400 text-center py-10 font-light">
          Nu există recenzii încă. Fii primul care lasă o recenzie!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-5 border border-warm-300/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-russet-50 flex items-center justify-center text-[11px] font-bold text-russet-500">
                    {r.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-navy-700">{r.author_name}</p>
                    {r.verified && <p className="text-[10px] text-teal-500 font-semibold">proprietar verificat</p>}
                  </div>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < r.rating ? "fill-amber-400" : "text-warm-200 fill-warm-200"} />
                  ))}
                </div>
              </div>
              {r.content && <p className="text-[13px] text-navy-500 mt-2 font-light leading-relaxed">{r.content}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
