import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { product_id, author_name, rating, content } = await req.json();

    if (!product_id || !author_name || !rating) {
      return NextResponse.json({ error: "Date lipsă" }, { status: 400 });
    }

    const db = getSupabaseServer();
    const { error } = await db.from("reviews").insert({
      product_id,
      author_name,
      rating: Math.min(5, Math.max(1, Number(rating))),
      content: content || "",
      verified: false,
    });

    if (error) {
      console.error("Review insert error:", error);
      return NextResponse.json({ error: "Eroare la salvare" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Review error:", err);
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 });
  }
}
