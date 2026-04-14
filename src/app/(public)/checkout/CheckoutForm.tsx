"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Banknote, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type PaymentMethod = "card" | "ramburs";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("ramburs");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  if (items.length === 0) {
    return (
      <div className="text-center py-20 col-span-full">
        <ShoppingBag size={48} className="mx-auto text-warm-300 mb-4" />
        <p className="text-lg text-navy-500 font-medium">Coșul tău este gol</p>
        <Link href="/magazin" className="inline-block mt-4 px-8 py-3 bg-russet-500 text-white font-bold rounded-full hover:bg-russet-600">
          Explorează magazinul
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          payment_method: payment,
          items: items.map((i) => ({
            product_id: i.product.id,
            quantity: i.quantity,
            unit_price: i.product.price,
            name: i.product.name,
          })),
        }),
      });
      const data = await res.json();
      if (payment === "card" && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        clearCart();
        router.push(`/comanda/${data.order_id}`);
      }
    } catch {
      alert("Eroare la plasarea comenzii. Încearcă din nou.");
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-[11px] bg-warm-50 border border-warm-300/80 rounded-[10px] text-[13px] font-light text-navy-700 focus:outline-none focus:border-russet-300 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-warm-300/40 space-y-4">
          <h2 className="font-semibold text-navy-700 text-lg font-[var(--font-body)]">Detalii livrare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Nume complet *</label>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Telefon *</label>
              <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Email *</label>
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-navy-700 mb-1.5">Adresă completă *</label>
            <textarea required rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Strada, număr, localitate, județ, cod poștal" className={`${inputCls} resize-none`} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-warm-300/40 space-y-4">
          <h2 className="font-semibold text-navy-700 text-lg font-[var(--font-body)]">Metodă de plată</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([
              { key: "ramburs" as const, icon: Banknote, label: "Ramburs", sub: "Plată la livrare" },
              { key: "card" as const, icon: CreditCard, label: "Card online", sub: "Plată securizată Stripe" },
            ]).map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setPayment(m.key)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  payment === m.key ? "border-russet-500 bg-russet-50" : "border-warm-300/60 hover:border-warm-400"
                }`}
              >
                <m.icon size={22} className={payment === m.key ? "text-russet-500" : "text-navy-300"} />
                <div className="text-left">
                  <p className="font-semibold text-[13px] text-navy-700">{m.label}</p>
                  <p className="text-[11px] text-navy-400 font-light">{m.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl p-6 border border-warm-300/40 sticky top-24">
          <h2 className="font-semibold text-navy-700 text-lg font-[var(--font-body)] mb-4">Sumar comandă</h2>
          <div className="space-y-3 divide-y divide-warm-200">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between pt-3 first:pt-0">
                <div className="min-w-0 pr-2">
                  <p className="text-[13px] text-navy-600 line-clamp-1 font-light">{product.name}</p>
                  <p className="text-[11px] text-navy-300">x{quantity}</p>
                </div>
                <p className="text-[13px] font-semibold text-navy-700 whitespace-nowrap">
                  {(product.price * quantity).toFixed(0)} RON
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-warm-300 flex justify-between items-center">
            <span className="text-lg font-bold text-navy-700">Total</span>
            <div className="font-[var(--font-heading)]">
              <span className="text-2xl font-bold text-navy-700">{totalPrice.toFixed(0)}</span>
              <span className="text-sm text-navy-400 ml-1 font-[var(--font-body)]">RON</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full py-[14px] bg-russet-500 text-white font-bold text-[14px] rounded-full hover:bg-russet-600 transition-colors disabled:opacity-50 shadow-[0_6px_20px_rgba(162,110,115,0.3)]"
          >
            {submitting ? "Se procesează..." : payment === "card" ? "Plătește cu cardul" : "Plasează comanda"}
          </button>
          <p className="mt-3 text-[11px] text-navy-300 text-center font-light">
            Prin plasarea comenzii, ești de acord cu termenii și condițiile noastre.
          </p>
        </div>
      </div>
    </form>
  );
}
