"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: { label: "În așteptare", cls: "bg-yellow-50 text-yellow-700" },
  paid: { label: "Plătită", cls: "bg-green-50 text-green-700" },
  confirmed: { label: "Confirmată", cls: "bg-blue-50 text-blue-700" },
  shipped: { label: "Expediată", cls: "bg-purple-50 text-purple-700" },
  delivered: { label: "Livrată", cls: "bg-green-100 text-green-800" },
  cancelled: { label: "Anulată", cls: "bg-red-50 text-red-700" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const { data } = await db.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await db.from("orders").update({ status }).eq("id", id);
    load();
  };

  if (loading) return <div className="text-earth-500">Se încarcă...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-earth-900 mb-6">Comenzi ({orders.length})</h2>

      <div className="bg-white rounded-xl border border-earth-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-earth-100 bg-earth-50">
              <th className="text-left px-4 py-3 font-medium text-earth-600">ID</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Client</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Total</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Plată</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-earth-600">Data</th>
              <th className="text-right px-4 py-3 font-medium text-earth-600">Actualizează</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50">
            {orders.map((o) => {
              const st = STATUS_LABELS[o.status] ?? STATUS_LABELS.pending;
              return (
                <tr key={o.id} className="hover:bg-earth-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-earth-500">{o.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-earth-800">{o.customer_name}</p>
                    <p className="text-xs text-earth-500">{o.customer_email}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-xs">{o.payment_method === "ramburs" ? "Ramburs" : "Card"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-earth-500">{new Date(o.created_at).toLocaleDateString("ro-RO")}</td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="text-xs border border-earth-200 rounded px-2 py-1"
                    >
                      {Object.entries(STATUS_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-center py-10 text-earth-500">Nu există comenzi încă.</p>}
      </div>
    </div>
  );
}
