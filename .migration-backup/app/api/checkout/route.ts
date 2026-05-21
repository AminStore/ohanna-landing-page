import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { items, successUrl, cancelUrl } = (await request.json()) as {
      items: CartItem[];
      successUrl: string;
      cancelUrl: string;
    };

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Try Stripe if key is valid
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey && stripeKey.startsWith("sk_")) {
      try {
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(stripeKey, { apiVersion: "2025-04-30.basil" });

        const lineItems = items.map((item) => ({
          price_data: {
            currency: "egp",
            product_data: {
              name: item.product.name,
              description: item.product.description?.slice(0, 200),
              images: item.product.image_url
                ? [`${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}${item.product.image_url}`]
                : [],
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: { source: "ohanna" },
        });

        return NextResponse.json({ url: session.url, sessionId: session.id });
      } catch (stripeErr: unknown) {
        console.error("Stripe error:", stripeErr);
      }
    }

    // Fallback: mock checkout
    const orderId = `OHN-${Date.now()}`;
    const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const mockUrl = `${successUrl}?order_id=${orderId}&total=${total}&mock=1`;
    return NextResponse.json({ url: mockUrl, sessionId: orderId });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
