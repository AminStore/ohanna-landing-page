import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { useColors } from "@/hooks/useColors";

const EGYPT_ZONES = [
  { zone: "Cairo & Giza", time: "2–3 days", cost: "EGP 50", express: "Same-day" },
  { zone: "Alexandria", time: "3–4 days", cost: "EGP 60", express: "Next-day" },
  { zone: "Nile Delta", time: "3–5 days", cost: "EGP 65", express: "2-day" },
  { zone: "Upper Egypt", time: "4–6 days", cost: "EGP 75", express: "—" },
  { zone: "North Coast", time: "4–6 days", cost: "EGP 75", express: "—" },
  { zone: "Sinai", time: "5–7 days", cost: "EGP 85", express: "—" },
];

const INTL_ZONES = [
  { zone: "Saudi Arabia", time: "7–10 days", cost: "EGP 350" },
  { zone: "UAE", time: "7–10 days", cost: "EGP 380" },
  { zone: "Kuwait", time: "8–12 days", cost: "EGP 390" },
  { zone: "Qatar & Bahrain", time: "8–12 days", cost: "EGP 390" },
  { zone: "Jordan & Lebanon", time: "9–14 days", cost: "EGP 420" },
];

const INFOCARDS = [
  { icon: "truck" as const, title: "FREE SHIPPING", desc: "On all orders above EGP 1,500 within Egypt." },
  { icon: "refresh-cw" as const, title: "FREE RETURNS", desc: "Return within 14 days, no questions asked." },
  { icon: "shield" as const, title: "SECURE PACKAGING", desc: "Every piece is wrapped in branded OHANNA packaging." },
  { icon: "clock" as const, title: "PROCESSING TIME", desc: "Orders are processed within 24 hours of placement." },
];

export default function ShippingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? 67 + 16 : insets.top + 16, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>SHIPPING & RETURNS</Text>
      </View>

      <View style={{ padding: 20, gap: 20 }}>
        <View style={styles.infoCards}>
          {INFOCARDS.map((c) => (
            <View key={c.title} style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name={c.icon} size={18} color={colors.primary} />
              <Text style={[styles.infoCardTitle, { color: colors.foreground }]}>{c.title}</Text>
              <Text style={[styles.infoCardDesc, { color: colors.mutedForeground }]}>{c.desc}</Text>
            </View>
          ))}
        </View>

        <GoldDivider />
        <Text style={[styles.tableTitle, { color: colors.foreground }]}>WITHIN EGYPT</Text>
        <View style={[styles.table, { borderColor: colors.border }]}>
          <View style={[styles.tableHeader, { backgroundColor: colors.foreground }]}>
            {["ZONE", "TIME", "COST", "EXPRESS"].map((h) => (
              <Text key={h} style={[styles.tableHeaderCell, { color: colors.background }]}>{h}</Text>
            ))}
          </View>
          {EGYPT_ZONES.map((row, i) => (
            <View key={row.zone} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? colors.card : colors.secondary }]}>
              <Text style={[styles.tableCell, { color: colors.foreground }]}>{row.zone}</Text>
              <Text style={[styles.tableCell, { color: colors.mutedForeground }]}>{row.time}</Text>
              <Text style={[styles.tableCell, { color: colors.primary }]}>{row.cost}</Text>
              <Text style={[styles.tableCell, { color: colors.accent }]}>{row.express}</Text>
            </View>
          ))}
        </View>

        <GoldDivider glyph="𓋹" />
        <Text style={[styles.tableTitle, { color: colors.foreground }]}>INTERNATIONAL</Text>
        <View style={[styles.table, { borderColor: colors.border }]}>
          <View style={[styles.tableHeader, { backgroundColor: colors.foreground }]}>
            {["DESTINATION", "TIME", "COST"].map((h) => (
              <Text key={h} style={[styles.tableHeaderCell, { color: colors.background }]}>{h}</Text>
            ))}
          </View>
          {INTL_ZONES.map((row, i) => (
            <View key={row.zone} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? colors.card : colors.secondary }]}>
              <Text style={[styles.tableCell, { color: colors.foreground }]}>{row.zone}</Text>
              <Text style={[styles.tableCell, { color: colors.mutedForeground }]}>{row.time}</Text>
              <Text style={[styles.tableCell, { color: colors.primary }]}>{row.cost}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.returnPolicy, { backgroundColor: "#1B1B1B" }]}>
          <Text style={[styles.returnTitle, { color: colors.primary }]}>𓋹 RETURN POLICY</Text>
          {[
            "Items must be returned within 14 days of delivery.",
            "All items must be unworn, unwashed, with original tags attached.",
            "Email returns@ohanna.store with your order ID to start the process.",
            "Refunds are processed within 5–7 business days.",
          ].map((t, i) => (
            <View key={i} style={styles.returnPoint}>
              <Text style={[styles.returnDot, { color: colors.primary }]}>•</Text>
              <Text style={[styles.returnText, { color: "#E4D5B7" }]}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingBottom: 16, borderBottomWidth: 1, gap: 4 },
  backBtn: { marginBottom: 8, width: 40 },
  title: { fontSize: 20, fontFamily: "Cinzel_900Black", letterSpacing: 2 },
  infoCards: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  infoCard: { width: "47%", padding: 14, borderWidth: 1.5, gap: 6 },
  infoCardTitle: { fontSize: 10, fontFamily: "Cinzel_700Bold", letterSpacing: 1 },
  infoCardDesc: { fontSize: 11, fontFamily: "Inter_400Regular", lineHeight: 16 },
  tableTitle: { fontSize: 12, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  table: { borderWidth: 1.5, overflow: "hidden" },
  tableHeader: { flexDirection: "row" },
  tableHeaderCell: { flex: 1, padding: 8, fontSize: 8, fontFamily: "Cinzel_700Bold", letterSpacing: 0.5, textAlign: "center" },
  tableRow: { flexDirection: "row" },
  tableCell: { flex: 1, padding: 8, fontSize: 10, fontFamily: "Inter_400Regular", textAlign: "center" },
  returnPolicy: { padding: 20, gap: 10 },
  returnTitle: { fontSize: 12, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  returnPoint: { flexDirection: "row", gap: 8 },
  returnDot: { fontSize: 13, lineHeight: 19 },
  returnText: { flex: 1, fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19 },
});
