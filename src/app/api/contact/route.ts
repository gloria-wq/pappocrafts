import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Nume și email sunt obligatorii" }, { status: 400 });
    }

    const db = getSupabaseServer();
    const { error } = await db.from("contact_messages").insert({
      name,
      email,
      subject: subject || "",
      message: message || "",
    });

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json({ error: "Eroare la salvare" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 });
  }
}
