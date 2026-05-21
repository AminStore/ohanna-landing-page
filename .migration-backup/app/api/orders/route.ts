import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/db";
import { randomUUID } from "crypto";
import type { ShippingAddress, CartItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      shipping: ShippingAddress;
      items: CartItem[];
      total: number;
      stripeSessionId?: string;
    };

    if (!body.shipping?.email || !body.shipping?.fullName) {
      return NextResponse.json({ error: "Missing required order fields." }, { status: 400 });
    }

    const id = `OHN-${Date.now()}`;
    const order = createOrder({
      id,
      stripe_session_id: body.stripeSessionId,
      customer_email: body.shipping.email,
      customer_name: body.shipping.fullName,
      shipping_address: body.shipping,
      items: body.items,
      total: body.total,
      status: "confirmed",
    });

    return NextResponse.json(order ?? { id, status: "confirmed" });
  } catch (err) {
    console.error("Order save error:", err);
    return NextResponse.json({ error: "Failed to save order." }, { status: 500 });
  }
}
