import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

interface CheckoutItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, address, payment_method, items } = body as {
      name: string;
      email: string;
      phone: string;
      address: string;
      payment_method: "card" | "ramburs";
      items: CheckoutItem[];
    };

    if (!name || !email || !items?.length) {
      return NextResponse.json({ error: "Date lipsă" }, { status: 400 });
    }

    const total = items.reduce(
      (sum: number, i: CheckoutItem) => sum + i.unit_price * i.quantity,
      0
    );

    const db = getSupabaseServer();

    const { data: order, error: orderErr } = await db
      .from("orders")
      .insert({
        customer_name: name,
        customer_email: email,
        customer_phone: phone || "",
        shipping_address: address || "",
        payment_method,
        status: payment_method === "ramburs" ? "confirmed" : "pending",
        total,
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      console.error("Order insert error:", orderErr);
      return NextResponse.json({ error: "Eroare la creare comandă" }, { status: 500 });
    }

    const orderItems = items.map((i: CheckoutItem) => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
    }));

    await db.from("order_items").insert(orderItems);

    if (payment_method === "card") {
      const stripe = getStripe();
      if (!stripe) {
        return NextResponse.json({ error: "Plata cu cardul nu este configurată" }, { status: 500 });
      }

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        currency: "ron",
        customer_email: email,
        line_items: items.map((i: CheckoutItem) => ({
          price_data: {
            currency: "ron",
            product_data: { name: i.name },
            unit_amount: Math.round(i.unit_price * 100),
          },
          quantity: i.quantity,
        })),
        success_url: `${siteUrl}/comanda/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/cos`,
        metadata: { order_id: order.id },
      });

      await db
        .from("orders")
        .update({ stripe_session_id: session.id })
        .eq("id", order.id);

      return NextResponse.json({ checkout_url: session.url, order_id: order.id });
    }

    return NextResponse.json({ order_id: order.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 });
  }
}
