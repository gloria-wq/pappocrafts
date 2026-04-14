"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      alert("Eroare la trimitere. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-teal-50 rounded-2xl p-8 text-center border border-teal-200">
        <p className="text-teal-700 font-semibold text-lg">Mesaj trimis cu succes!</p>
        <p className="text-teal-600 text-sm mt-2 font-light">
          Vom reveni cu un răspuns în cel mai scurt timp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-warm-300/40 space-y-5">
      <div>
        <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Numele tău *</label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full px-4 py-[11px] bg-warm-50 border border-warm-300/80 rounded-[10px] text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Adresa ta de email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full px-4 py-[11px] bg-warm-50 border border-warm-300/80 rounded-[10px] text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Subiect</label>
        <input
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className="w-full px-4 py-[11px] bg-warm-50 border border-warm-300/80 rounded-[10px] text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Mesajul tău</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full px-4 py-[11px] bg-warm-50 border border-warm-300/80 rounded-[10px] text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-[14px] bg-russet-500 text-white font-bold text-[14px] rounded-full hover:bg-russet-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_6px_20px_rgba(162,110,115,0.3)]"
      >
        <Send size={15} />
        {submitting ? "Se trimite..." : "Trimite mesajul"}
      </button>
    </form>
  );
}
