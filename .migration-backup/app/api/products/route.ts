import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "12", 10), 48);

  let products = [...PRODUCTS];

  if (category && category !== "All") {
    products = products.filter((p) => p.category === category);
  }
  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search),
    );
  }

  const total = products.length;
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const items = products.slice(offset, offset + limit);

  return NextResponse.json({ items, total, page, limit, pages });
}
