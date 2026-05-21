import { NextRequest, NextResponse } from "next/server";
import { getOrderByEmailAndId } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();
  const email = searchParams.get("email")?.trim().toLowerCase();

  if (!id || !email) {
    return NextResponse.json({ error: "Order ID and email are required." }, { status: 400 });
  }

  const order = getOrderByEmailAndId(email, id);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
