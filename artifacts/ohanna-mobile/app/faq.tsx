import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { BD, FS, GRID_PAD, SP } from "@/constants/theme";
import { useColors } from "@/hooks/useColors";

const FAQ_CATEGORIES = [
  {
    category: "ORDERS & PAYMENTS",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards (Visa, Mastercard), PayPal, Fawry, and cash on delivery within Egypt." },
      { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. Contact us immediately at support@ohanna.store." },
      { q: "Is my payment information secure?", a: "All payments are processed by Stripe. We never store your card details." },
    ],
  },
  {
    category: "SHIPPING & DELIVERY",
    items: [
      { q: "How long does delivery take within Egypt?", a: "Standard delivery within Cairo/Giza takes 2–3 business days. Other governorates take 4–6 business days." },
      { q: "Do you ship internationally?", a: "Yes, we ship to Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Jordan. International orders take 7–14 business days." },
      { q: "How much does shipping cost?", a: "Free shipping on orders above EGP 1,500 within Egypt. Standard shipping costs EGP 50–80 depending on governorate." },
    ],
  },
  {
    category: "RETURNS & EXCHANGES",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unworn, unwashed items with original tags attached." },
      { q: "How do I initiate a return?", a: "Email returns@ohanna.store with your order ID and reason for return. We'll guide you through the process." },
      { q: "Do you offer exchanges?", a: "Yes! We exchange for different sizes or colors within 14 days. Availability depends on current stock." },
    ],
  },
  {
    category: "PRODUCTS",
    items: [
      { q: "Are OHANNA garments true to size?", a: "Most OHANNA pieces run slightly oversized for a streetwear fit. We recommend going one size down if you prefer a fitted look." },
      { q: "How do I care for my OHANNA pieces?", a: "Machine wash cold, inside out, gentle cycle. Tumble dry low or hang to dry. Do not bleach or iron directly over the print/embroidery." },
      { q: "Are the symbols authentic to Egyptian culture?", a: "Yes. Every symbol we use is researched and approved by Egyptologists and cultural consultants. We take authenticity very seriously." },
    ],
  },
];

export default function FAQScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    Haptics.selectionAsync();
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.header,
          {
            paddingTop: Platform.OS === "web" ? 67 + GRID_PAD : insets.top + GRID_PAD,
            borderBottomColor: colors.border,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>FAQ</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          FREQUENTLY ASKED QUESTIONS
        </Text>
      </View>

      <View style={{ padding: GRID_PAD, gap: SP.xxl }}>
        {FAQ_CATEGORIES.map((cat) => (
          <View key={cat.category} style={styles.catBlock}>
            <Text style={[styles.catTitle, { color: colors.primary }]}>{cat.category}</Text>
            <View style={[styles.catItems, { borderColor: colors.border }]}>
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`;
                const open = openItems[key];
                return (
                  <React.Fragment key={key}>
                    <Pressable
                      style={({ pressed }) => [styles.faqRow, { opacity: pressed ? 0.7 : 1 }]}
                      onPress={() => toggle(key)}
                    >
                      <Text style={[styles.faqQ, { color: colors.foreground, flex: 1 }]}>
                        {item.q}
                      </Text>
                      <Feather
                        name={open ? "chevron-up" : "chevron-down"}
                        size={16}
                        color={colors.mutedForeground}
                      />
                    </Pressable>
                    {open && (
                      <View style={[styles.faqA, { backgroundColor: colors.secondary }]}>
                        <Text style={[styles.faqAText, { color: colors.mutedForeground }]}>
                          {item.a}
                        </Text>
                      </View>
                    )}
                    {i < cat.items.length - 1 && (
                      <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: GRID_PAD,
    paddingBottom: GRID_PAD,
    borderBottomWidth: BD.thin,
    gap: SP.xs,
  },
  backBtn: { marginBottom: SP.sm, width: 40 },
  title: { fontSize: FS.h3, fontFamily: "Cinzel_900Black", letterSpacing: 2 },
  sub: { fontSize: FS.xs, fontFamily: "Inter_500Medium", letterSpacing: 1.5 },
  catBlock: { gap: SP.md - 2 },
  catTitle: { fontSize: FS.xs, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  catItems: { borderWidth: BD.md },
  faqRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SP.md,
    padding: GRID_PAD,
  },
  faqQ: { fontSize: FS.base, fontFamily: "Inter_500Medium", lineHeight: 20 },
  faqA: { paddingHorizontal: GRID_PAD, paddingBottom: GRID_PAD },
  faqAText: { fontSize: FS.base, fontFamily: "Inter_400Regular", lineHeight: 20 },
  divider: { height: 1, marginHorizontal: GRID_PAD },
});
