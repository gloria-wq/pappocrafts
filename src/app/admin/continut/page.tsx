"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import { Save } from "lucide-react";

interface ContentEntry {
  section: string;
  key: string;
  value: Record<string, unknown>;
}

const SECTIONS = [
  { section: "hero", key: "main", label: "Hero - Pagina principală", fields: ["title", "subtitle", "description"] },
  { section: "about", key: "main", label: "Despre noi - Secțiune", fields: ["title", "description"] },
  { section: "cta", key: "main", label: "Call to Action", fields: ["title", "description"] },
];

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, ContentEntry>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const db = getSupabaseBrowser();

  const load = useCallback(async () => {
    const { data } = await db.from("site_content").select("section, key, value");
    const map: Record<string, ContentEntry> = {};
    data?.forEach((row: ContentEntry) => {
      map[`${row.section}:${row.key}`] = row;
    });
    setContent(map);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (section: string, key: string, fields: string[]) => {
    const id = `${section}:${key}`;
    setSaving(id);
    const entry = content[id];
    const value: Record<string, unknown> = {};
    fields.forEach((f) => { value[f] = entry?.value?.[f] ?? ""; });

    await db.from("site_content").upsert({
      section,
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: "section,key" });

    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const updateField = (section: string, key: string, field: string, val: string) => {
    const id = `${section}:${key}`;
    setContent((prev) => ({
      ...prev,
      [id]: {
        section,
        key,
        value: { ...(prev[id]?.value ?? {}), [field]: val },
      },
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-earth-900 mb-6">Conținut Site</h2>

      <div className="space-y-6">
        {SECTIONS.map(({ section, key, label, fields }) => {
          const id = `${section}:${key}`;
          const entry = content[id];
          return (
            <div key={id} className="bg-white rounded-xl p-6 border border-earth-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-earth-800">{label}</h3>
                <button
                  onClick={() => handleSave(section, key, fields)}
                  disabled={saving === id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    saved === id
                      ? "bg-green-600 text-white"
                      : "bg-brand-600 text-white hover:bg-brand-700"
                  }`}
                >
                  <Save size={14} />
                  {saving === id ? "Se salvează..." : saved === id ? "Salvat!" : "Salvează"}
                </button>
              </div>
              <div className="space-y-3">
                {fields.map((f) => (
                  <div key={f}>
                    <label className="block text-sm font-medium text-earth-600 mb-1 capitalize">{f}</label>
                    {f === "description" ? (
                      <textarea
                        rows={3}
                        value={(entry?.value?.[f] as string) ?? ""}
                        onChange={(e) => updateField(section, key, f, e.target.value)}
                        className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm"
                      />
                    ) : (
                      <input
                        value={(entry?.value?.[f] as string) ?? ""}
                        onChange={(e) => updateField(section, key, f, e.target.value)}
                        className="w-full px-3 py-2 border border-earth-200 rounded-lg text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
