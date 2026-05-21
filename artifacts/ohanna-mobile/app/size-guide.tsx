import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

const TOPS = [
  { size: "XS", chest: "86–91", shoulder: "42", length: "66" },
  { size: "S",  chest: "91–97", shoulder: "44", length: "69" },
  { size: "M",  chest: "97–102", shoulder: "46", length: "72" },
  { size: "L",  chest: "107–112", shoulder: "49", length: "75" },
  { size: "XL", chest: "117–122", shoulder: "52", length: "78" },
  { size: "XXL", chest: "127–132", shoulder: "55", length: "81" },
];

const BOTTOMS = [
  { size: "XS", waist: "68–72", hips: "88–92", inseam: "76" },
  { size: "S",  waist: "73–77", hips: "93–97", inseam: "77" },
  { size: "M",  waist: "78–82", hips: "98–102", inseam: "78" },
  { size: "L",  waist: "83–88", hips: "103–108", inseam: "79" },
  { size: "XL", waist: "89–94", hips: "109–114", inseam: "80" },
  { size: "XXL", waist: "95–100", hips: "115–120", inseam: "81" },
];

export default function SizeGuideScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<"tops" | "bottoms">("tops");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? 67 + 16 : insets.top + 16, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>SIZE GUIDE</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>All measurements in centimeters (cm)</Text>
      </View>

      <View style={{ padding: 20, gap: 16 }}>
        <View style={[styles.tabs, { backgroundColor: colors.secondary }]}>
          {(["tops", "bottoms"] as const).map((t) => (
            <Pressable
              key={t}
              style={[styles.tabBtn, { backgroundColor: tab === t ? colors.foreground : "transparent" }]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabBtnText, { color: tab === t ? colors.background : colors.mutedForeground }]}>
                {t.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.table, { borderColor: colors.border }]}>
          {tab === "tops" ? (
            <>
              <View style={[styles.tableHeader, { backgroundColor: colors.foreground }]}>
                {["SIZE", "CHEST", "SHOULDER", "LENGTH"].map((h) => (
                  <Text key={h} style={[styles.th, { color: colors.background }]}>{h}</Text>
                ))}
              </View>
              {TOPS.map((row, i) => (
                <View key={row.size} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? colors.card : colors.secondary }]}>
                  <Text style={[styles.td, styles.tdBold, { color: colors.primary }]}>{row.size}</Text>
                  <Text style={[styles.td, { color: colors.foreground }]}>{row.chest}</Text>
                  <Text style={[styles.td, { color: colors.foreground }]}>{row.shoulder}</Text>
                  <Text style={[styles.td, { color: colors.foreground }]}>{row.length}</Text>
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={[styles.tableHeader, { backgroundColor: colors.foreground }]}>
                {["SIZE", "WAIST", "HIPS", "INSEAM"].map((h) => (
                  <Text key={h} style={[styles.th, { color: colors.background }]}>{h}</Text>
                ))}
              </View>
              {BOTTOMS.map((row, i) => (
                <View key={row.size} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? colors.card : colors.secondary }]}>
                  <Text style={[styles.td, styles.tdBold, { color: colors.primary }]}>{row.size}</Text>
                  <Text style={[styles.td, { color: colors.foreground }]}>{row.waist}</Text>
                  <Text style={[styles.td, { color: colors.foreground }]}>{row.hips}</Text>
                  <Text style={[styles.td, { color: colors.foreground }]}>{row.inseam}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={[styles.tip, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="info" size={14} color={colors.primary} />
          <Text style={[styles.tipText, { color: colors.mutedForeground }]}>
            Most OHANNA pieces run slightly oversized for a streetwear fit. We recommend going one size down if you prefer a fitted look.
          </Text>
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
  sub: { fontSize: 11, fontFamily: "Inter_400Regular" },
  tabs: { flexDirection: "row", padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: "center" },
  tabBtnText: { fontSize: 10, fontFamily: "Cinzel_700Bold", letterSpacing: 1.5 },
  table: { borderWidth: 1.5, overflow: "hidden" },
  tableHeader: { flexDirection: "row" },
  th: { flex: 1, padding: 10, fontSize: 9, fontFamily: "Cinzel_700Bold", letterSpacing: 0.5, textAlign: "center" },
  tableRow: { flexDirection: "row" },
  td: { flex: 1, padding: 10, fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center" },
  tdBold: { fontFamily: "Inter_700Bold" },
  tip: { flexDirection: "row", gap: 10, borderWidth: 1.5, padding: 14, alignItems: "flex-start" },
  tipText: { flex: 1, fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
