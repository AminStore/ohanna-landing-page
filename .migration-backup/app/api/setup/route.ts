import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { PRODUCTS } from "@/lib/products-data";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Create orders table via raw SQL
    const { error: tableError } = await supabase.rpc("exec_sql" as never, {
      sql: `
        CREATE TABLE IF NOT EXISTS orders (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          stripe_session_id TEXT,
          customer_email TEXT NOT NULL,
          customer_name TEXT NOT NULL,
          shipping_address JSONB NOT NULL,
          items JSONB NOT NULL,
          total INTEGER NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
        CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      `,
    } as never);

    // Try inserting products to Supabase (best effort)
    try {
      await supabase.from("products").upsert(
        PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          badge: p.badge,
          image_url: p.image_url,
          stock: p.stock,
          slug: p.slug,
        })),
        { onConflict: "id" },
      );
    } catch {}

    return NextResponse.json({ success: true, tableError: tableError?.message });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
