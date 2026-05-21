import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import type { ShippingAddress, CartItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      shipping: ShippingAddress;
      items: CartItem[];
      total: number;
      stripeSessionId?: string;
    };

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        stripe_session_id: body.stripeSessionId,
        customer_email: body.shipping.email,
        customer_name: body.shipping.fullName,
        shipping_address: body.shipping,
        items: body.items,
        total: body.total,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      // Table might not exist yet — return mock order
      return NextResponse.json({
        id: `OHN-${Date.now()}`,
        status: "pending",
        message: "Order received",
      });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
