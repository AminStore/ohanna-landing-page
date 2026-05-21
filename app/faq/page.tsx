import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/faq-accordion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "FAQs — Frequently Asked Questions",
  description:
    "Find answers to the most common questions about OHANNA Egyptian Streetwear — sizing, shipping, returns, payments, order tracking, and more. We ship across Egypt and the Arab world.",
  keywords: ["OHANNA FAQ", "Egyptian streetwear questions", "shipping Egypt", "return policy Egypt", "size guide streetwear"],
};

export const FAQ_CATEGORIES = [
  {
    category: "ORDERS & PAYMENTS",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards (Visa, Mastercard), PayPal, Fawry, and cash on delivery within Egypt. All online payments are secured by Stripe's PCI-DSS compliant infrastructure." },
      { q: "How do I place an order?", a: "Browse our collection, select your size and quantity, and add items to your cart. When ready, proceed to checkout and complete payment. You'll receive an email confirmation immediately after." },
      { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After that, we begin processing. Contact us immediately at support@ohanna.store if you need changes." },
      { q: "Is my payment information secure?", a: "Absolutely. All payments are processed by Stripe, the world's leading payment infrastructure used by millions of businesses globally. We never store your card details." },
      { q: "Do you offer installment payments?", a: "Yes, we partner with Valu and Sympl for installment options on orders above EGP 2,000. These options appear at checkout when available for your location." },
    ],
  },
  {
    category: "SHIPPING & DELIVERY",
    items: [
      { q: "How long does delivery take within Egypt?", a: "Standard delivery within Cairo/Giza takes 2–3 business days. Other Egyptian governorates take 4–6 business days. Expedited same-day delivery is available in select Cairo areas for an additional fee." },
      { q: "Do you ship internationally?", a: "Yes, we ship to Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Jordan. International orders take 7–14 business days. Rates are shown at checkout based on your location." },
      { q: "How much does shipping cost?", a: "Free shipping on orders above EGP 1,500 within Egypt. Standard shipping within Egypt costs EGP 50–80 depending on governorate. International shipping starts at EGP 350." },
      { q: "How do I track my order?", a: "After dispatch, you'll receive an SMS and email with your tracking number. Use our Track Order page or the courier's website to check your delivery status in real time." },
      { q: "What if my package is lost or damaged?", a: "If your order arrives damaged or is lost in transit, contact us within 48 hours at support@ohanna.store with photos (if damaged). We'll send a replacement at no extra cost." },
    ],
  },
  {
    category: "RETURNS & EXCHANGES",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for items in their original condition — unworn, unwashed, with all tags attached. Sale items and underwear are final sale." },
      { q: "How do I start a return or exchange?", a: "Email returns@ohanna.store with your order ID, item name, and reason for return. We'll send a prepaid return label for defective items. For size exchanges, shipping costs are the customer's responsibility." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 3–5 business days after we receive your return. Depending on your bank, funds may take an additional 2–5 days to appear in your account." },
      { q: "Can I exchange for a different size?", a: "Yes, size exchanges are free for the first exchange on any order. Simply contact us within 14 days. If the new size is unavailable, we'll issue a store credit." },
    ],
  },
  {
    category: "PRODUCTS & SIZING",
    items: [
      { q: "How do your sizes run?", a: "OHANNA pieces generally run true to size. Our hoodies and oversized pieces are intentionally cut large — check the product description for specific fit notes. When in doubt, our Size Guide has exact measurements." },
      { q: "What materials do you use?", a: "We use premium Egyptian cotton (300–400gsm), high-quality polyester blends, and sustainable recycled fabrics where possible. Every product page lists the specific fabric composition." },
      { q: "How should I care for my OHANNA pieces?", a: "Machine wash cold (30°C), inside out, with similar colors. Tumble dry low or hang dry. Do not bleach or iron on prints. Following these instructions ensures your pieces maintain quality for years." },
      { q: "Will out-of-stock items return?", a: "Popular items get restocked periodically. Sign up for our newsletter or follow @ohanna.store on Instagram to be notified when your size or a sold-out item returns." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            FREQUENTLY ASKED <span className="text-[#C89D29]">QUESTIONS</span>
          </h1>
          <p className="text-[#1B1B1B]/55 max-w-lg mx-auto text-sm">
            Everything you need to know about ordering, shipping, returns, and more from OHANNA Egyptian Streetwear.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQAccordion categories={FAQ_CATEGORIES} />

          <div className="mt-12 ohanna-card p-8 text-center">
            <p className="text-sm text-[#1B1B1B]/60 mb-4">
              Can't find what you're looking for? Our support team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] px-6 py-2.5 font-black hieroglyph-font text-xs sketchy-button transition-all">
                CONTACT US
              </Link>
              <a href="mailto:support@ohanna.store" className="text-sm text-[#C89D29] font-semibold hover:underline">
                support@ohanna.store
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
