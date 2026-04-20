import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

const db = getSupabaseServer();

export async function PATCH(req: NextRequest) {
  const { id, verified } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await db.from("reviews").update({ verified }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await db.from("reviews").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
