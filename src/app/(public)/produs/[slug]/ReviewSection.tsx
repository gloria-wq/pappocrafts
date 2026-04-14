"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types";

export default function ReviewSection({
  reviews,
  productId,
}: {
  reviews: Review[];
  productId: string;
}) {
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

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-earth-900">
          Recenzii ({reviews.length})
        </h2>
        {!submitted && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {showForm ? "Anulează" : "Scrie o recenzie"}
          </button>
        )}
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm">
          Mulțumim pentru recenzie! Va fi publicată după verificare.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-earth-50 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Numele tău</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRating(v)}
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={
                      v <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-earth-200"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Recenzia ta</label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:opacity-50"
          >
            {submitting ? "Se trimite..." : "Trimite recenzia"}
          </button>
        </form>
      )}

      {reviews.length === 0 && !submitted ? (
        <p className="text-earth-500 text-center py-10">
          Nu există recenzii încă. Fii primul care lasă o recenzie!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-5 border border-earth-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
                    {r.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-earth-800">{r.author_name}</p>
                    {r.verified && (
                      <p className="text-[10px] text-green-600 font-medium">proprietar verificat</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.rating ? "fill-amber-400 text-amber-400" : "text-earth-200"
                      }
                    />
                  ))}
                </div>
              </div>
              {r.content && <p className="text-sm text-earth-600 mt-2">{r.content}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
