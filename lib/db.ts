import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), ".data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "ohanna.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");

  _db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      stripe_session_id TEXT,
      customer_email TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      items TEXT NOT NULL,
      total INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    );
    CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id);

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT DEFAULT '',
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    );
  `);

  return _db;
}

export function createOrder(data: {
  id: string;
  stripe_session_id?: string;
  customer_email: string;
  customer_name: string;
  shipping_address: object;
  items: object;
  total: number;
  status?: string;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO orders (id, stripe_session_id, customer_email, customer_name, shipping_address, items, total, status)
    VALUES (@id, @stripe_session_id, @customer_email, @customer_name, @shipping_address, @items, @total, @status)
  `);
  stmt.run({
    ...data,
    stripe_session_id: data.stripe_session_id ?? null,
    shipping_address: JSON.stringify(data.shipping_address),
    items: JSON.stringify(data.items),
    status: data.status ?? "pending",
  });
  return getOrderById(data.id);
}

export function getOrderById(id: string) {
  const db = getDb();
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as any;
  if (!row) return null;
  return {
    ...row,
    shipping_address: JSON.parse(row.shipping_address),
    items: JSON.parse(row.items),
  };
}

export function getOrderByEmailAndId(email: string, id: string) {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM orders WHERE id = ? AND customer_email = ?")
    .get(id, email) as any;
  if (!row) return null;
  return {
    ...row,
    shipping_address: JSON.parse(row.shipping_address),
    items: JSON.parse(row.items),
  };
}

export function saveContactMessage(data: {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const db = getDb();
  db.prepare(`
    INSERT INTO contact_messages (id, name, email, subject, message)
    VALUES (@id, @name, @email, @subject, @message)
  `).run(data);
}
