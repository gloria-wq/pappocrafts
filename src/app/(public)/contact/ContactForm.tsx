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
      <div className="bg-green-50 rounded-xl p-8 text-center">
        <p className="text-green-700 font-semibold text-lg">Mesaj trimis cu succes!</p>
        <p className="text-green-600 text-sm mt-2">
          Vom reveni cu un răspuns în cel mai scurt timp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-earth-100 space-y-5">
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Numele tău *</label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Adresa ta de email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Subiect</label>
        <input
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1">Mesajul tău</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send size={16} />
        {submitting ? "Se trimite..." : "Trimite mesajul"}
      </button>
    </form>
  );
}
