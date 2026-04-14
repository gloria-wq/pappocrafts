"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Banknote, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

type PaymentMethod = "card" | "ramburs";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("ramburs");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={48} className="mx-auto text-earth-300 mb-4" />
        <p className="text-lg text-earth-600">Coșul tău este gol</p>
        <Link
          href="/magazin"
          className="inline-block mt-4 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700"
        >
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

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        {/* Shipping Info */}
        <div className="bg-white rounded-xl p-6 border border-earth-100 space-y-4">
          <h2 className="font-semibold text-earth-800 text-lg">Detalii livrare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">Nume complet *</label>
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">Telefon *</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Adresă completă *</label>
            <textarea
              required
              rows={3}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Strada, număr, bloc, scară, apartament, localitate, județ, cod poștal"
              className="w-full px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-6 border border-earth-100 space-y-4">
          <h2 className="font-semibold text-earth-800 text-lg">Metodă de plată</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPayment("ramburs")}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                payment === "ramburs"
                  ? "border-brand-600 bg-brand-50"
                  : "border-earth-200 hover:border-earth-300"
              }`}
            >
              <Banknote size={24} className={payment === "ramburs" ? "text-brand-600" : "text-earth-400"} />
              <div className="text-left">
                <p className="font-medium text-sm text-earth-800">Ramburs</p>
                <p className="text-xs text-earth-500">Plată la livrare</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPayment("card")}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                payment === "card"
                  ? "border-brand-600 bg-brand-50"
                  : "border-earth-200 hover:border-earth-300"
              }`}
            >
              <CreditCard size={24} className={payment === "card" ? "text-brand-600" : "text-earth-400"} />
              <div className="text-left">
                <p className="font-medium text-sm text-earth-800">Card online</p>
                <p className="text-xs text-earth-500">Plată securizată prin Stripe</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl p-6 border border-earth-100 sticky top-24">
          <h2 className="font-semibold text-earth-800 text-lg mb-4">Sumar comandă</h2>
          <div className="space-y-3 divide-y divide-earth-100">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between pt-3 first:pt-0">
                <div className="min-w-0 pr-2">
                  <p className="text-sm text-earth-700 line-clamp-1">{product.name}</p>
                  <p className="text-xs text-earth-400">x{quantity}</p>
                </div>
                <p className="text-sm font-medium text-earth-800 whitespace-nowrap">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-earth-200 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-brand-700">{formatPrice(totalPrice)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {submitting
              ? "Se procesează..."
              : payment === "card"
                ? "Plătește cu cardul"
                : "Plasează comanda"}
          </button>
          <p className="mt-3 text-xs text-earth-400 text-center">
            Prin plasarea comenzii, ești de acord cu termenii și condițiile noastre.
          </p>
        </div>
      </div>
    </form>
  );
}
