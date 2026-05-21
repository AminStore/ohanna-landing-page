import { Router, type Request, type Response } from "express";
import { randomUUID } from "crypto";
import { asyncHandler } from "../middlewares";
import { products, orders, contacts } from "../db/queries";
import { logger } from "../lib/logger";

const router = Router();

// In-memory fallback storage when database is not available
const inMemoryContacts: any[] = [];
const inMemoryOrders: any[] = [];

/**
 * Products endpoints
 */
router.get(
  "/products",
  asyncHandler(async (_req: Request, res: Response) => {
    try {
      const allProducts = await products.getAll();
      res.json({ products: allProducts });
    } catch (err) {
      logger.warn("Database unavailable, returning empty products");
      res.json({ products: [] });
    }
  })
);

router.get(
  "/products/:id",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const product = await products.getById(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json(product);
    } catch (err) {
      logger.warn("Database unavailable for product lookup");
      res.status(404).json({ error: "Product not found" });
    }
  })
);

router.get(
  "/products/category/:category",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const categoryProducts = await products.getByCategory(req.params.category);
      res.json({ products: categoryProducts });
    } catch (err) {
      logger.warn("Database unavailable, returning empty products");
      res.json({ products: [] });
    }
  })
);

/**
 * Checkout endpoint
 */
router.post(
  "/checkout",
  asyncHandler(async (req: Request, res: Response) => {
    const { items, successUrl, cancelUrl, customerEmail, customerName, shippingAddress } =
      req.body as {
        items: any[];
        successUrl: string;
        cancelUrl: string;
        customerEmail: string;
        customerName: string;
        shippingAddress: any;
      };

    if (!items?.length) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    let sessionId: string;
    let checkoutUrl: string;

    if (stripeKey && stripeKey.startsWith("sk_")) {
      try {
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(stripeKey, { apiVersion: "2024-04-10" } as any);

        const lineItems = items.map((item: any) => ({
          price_data: {
            currency: "egp",
            product_data: {
              name: item.product.name,
              description: item.product.description?.slice(0, 200),
            },
            unit_amount: item.product.price,
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

        sessionId = session.id;
        checkoutUrl = session.url || "";
      } catch (stripeErr: unknown) {
        logger.error({ err: stripeErr }, "Stripe error");
        // Fall back to mock order
        sessionId = `mock_${randomUUID()}`;
        checkoutUrl = successUrl;
      }
    } else {
      // Mock checkout
      sessionId = `mock_${randomUUID()}`;
      checkoutUrl = successUrl;
    }

    // Create order in database or in-memory
    const orderId = `OHN-${Date.now()}`;
    const total = items.reduce((s: number, i: any) => s + i.product.price * i.quantity, 0);

    try {
      await orders.create({
        id: orderId,
        stripeSessionId: sessionId,
        customerEmail,
        customerName,
        shippingAddress,
        items,
        total,
        status: "pending",
      });
    } catch (err) {
      logger.warn("Database unavailable, storing order in memory");
      inMemoryOrders.push({
        id: orderId,
        stripeSessionId: sessionId,
        customerEmail,
        customerName,
        shippingAddress,
        items,
        total,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    res.json({ url: checkoutUrl, sessionId, orderId });
  })
);

/**
 * Contact endpoint
 */
router.post(
  "/contact",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }

    const contactData = {
      id: randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject ?? "").trim(),
      message: message.trim(),
    };

    try {
      await contacts.create(contactData);
    } catch (err) {
      logger.warn("Database unavailable, storing contact in memory");
      inMemoryContacts.push({
        ...contactData,
        createdAt: new Date(),
      });
    }

    res.json({ success: true, message: "Message received. We'll reply within 24 hours." });
  })
);

/**
 * Order tracking endpoint
 */
router.get(
  "/track-order",
  asyncHandler(async (req: Request, res: Response) => {
    const id = (req.query["id"] as string)?.trim();
    const email = (req.query["email"] as string)?.trim().toLowerCase();

    if (!id || !email) {
      res.status(400).json({ error: "Order ID and email are required." });
      return;
    }

    try {
      const order = await orders.getById(id);

      if (!order || order.customerEmail !== email) {
        res.status(404).json({ error: "Order not found." });
        return;
      }

      res.json({ order });
    } catch (err) {
      logger.warn("Database unavailable, checking in-memory orders");
      const order = inMemoryOrders.find((o) => o.id === id && o.customerEmail === email);

      if (!order) {
        res.status(404).json({ error: "Order not found." });
        return;
      }

      res.json({ order });
    }
  })
);

/**
 * Setup endpoint
 */
router.get(
  "/setup",
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ status: "ok", message: "OHANNA API ready" });
  })
);

export default router;
