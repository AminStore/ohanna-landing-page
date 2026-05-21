import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json() as {
      name: string; email: string; subject?: string; message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    saveContactMessage({
      id: randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject ?? "").trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true, message: "Message received. We'll reply within 24 hours." });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
  }
}
