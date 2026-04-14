"use client";

import { useState, useEffect } from "react";
import { Package, ShoppingCart, Star, MessageSquare } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

interface Stats {
  products: number;
  orders: number;
  reviews: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, reviews: 0, messages: 0 });

  useEffect(() => {
    const db = getSupabaseBrowser();
    Promise.all([
      db.from("products").select("id", { count: "exact", head: true }),
      db.from("orders").select("id", { count: "exact", head: true }),
      db.from("reviews").select("id", { count: "exact", head: true }),
      db.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
    ]).then(([p, o, r, m]) => {
      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        reviews: r.count ?? 0,
        messages: m.count ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: "Produse", value: stats.products, icon: Package, color: "text-blue-600 bg-blue-50" },
    { label: "Comenzi", value: stats.orders, icon: ShoppingCart, color: "text-green-600 bg-green-50" },
    { label: "Recenzii", value: stats.reviews, icon: Star, color: "text-amber-600 bg-amber-50" },
    { label: "Mesaje necitite", value: stats.messages, icon: MessageSquare, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-earth-900 mb-6">Bun venit!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl p-5 border border-earth-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">{c.label}</p>
                <p className="text-3xl font-bold text-earth-900 mt-1">{c.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${c.color}`}>
                <c.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
