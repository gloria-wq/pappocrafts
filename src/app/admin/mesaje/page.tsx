"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { ContactMessage } from "@/types";
import { Mail, MailOpen, Trash2 } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const { data } = await db.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages((data as ContactMessage[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const toggleRead = async (id: string, current: boolean) => {
    await db.from("contact_messages").update({ read: !current }).eq("id", id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest mesaj?")) return;
    await db.from("contact_messages").delete().eq("id", id);
    load();
  };

  if (loading) return <div className="text-earth-500">Se încarcă...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-earth-900 mb-6">
        Mesaje ({messages.filter((m) => !m.read).length} necitite)
      </h2>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`bg-white rounded-xl p-5 border transition-colors ${m.read ? "border-earth-100" : "border-brand-200 bg-brand-50/30"}`}>
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-earth-800">{m.name}</span>
                  {!m.read && <span className="w-2 h-2 bg-brand-600 rounded-full" />}
                </div>
                <p className="text-xs text-earth-400 mb-1">
                  {m.email} &bull; {new Date(m.created_at).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
                {m.subject && <p className="text-sm font-medium text-earth-700 mb-1">{m.subject}</p>}
                <p className="text-sm text-earth-600">{m.message}</p>
              </div>
              <div className="flex gap-1 shrink-0 ml-4">
                <button
                  onClick={() => toggleRead(m.id, m.read)}
                  className="p-1.5 text-earth-400 hover:text-brand-600"
                  title={m.read ? "Marchează ca necitit" : "Marchează ca citit"}
                >
                  {m.read ? <Mail size={16} /> : <MailOpen size={16} />}
                </button>
                <button onClick={() => handleDelete(m.id)} className="p-1.5 text-earth-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center py-10 text-earth-500">Nu există mesaje.</p>}
      </div>
    </div>
  );
}
