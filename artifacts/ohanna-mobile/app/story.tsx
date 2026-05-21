import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { useColors } from "@/hooks/useColors";

const TIMELINE = [
  { year: "3100 BC", title: "THE ANCIENT INSPIRATION", desc: "Egyptian pharaohs adorned themselves in symbols of power — the Ankh, the Eye of Horus, the Scarab. These weren't just decorations; they were statements of identity and authority." },
  { year: "2021", title: "THE VISION", desc: "In the streets of Cairo, two designers looked at ancient temple walls and asked: what if these symbols lived on hoodies, tees, and jackets? The seed of OHANNA was planted." },
  { year: "2022", title: "THE BRAND", desc: "OHANNA launched its first collection — 6 pieces, all sold out in 48 hours. Cairo's streets confirmed what we believed: people hunger for fashion that honors their heritage." },
  { year: "2023", title: "THE COMMUNITY", desc: "10,000 modern pharaohs joined the movement. OHANNA expanded to 12 core pieces and began shipping across Egypt and the Arab world." },
  { year: "2024+", title: "THE FUTURE", desc: "We're building more than a brand — we're building a cultural movement. Ancient power, modern form. The revolution continues." },
];

const VALUES = [
  { glyph: "𓋹", title: "HERITAGE FIRST", desc: "Every stitch honors thousands of years of Egyptian culture. We never compromise on cultural authenticity." },
  { glyph: "𓇳", title: "BUILT TO LAST", desc: "Like the pyramids, our garments are engineered for longevity. Premium materials, uncompromising construction." },
  { glyph: "𓂀", title: "STREET REBELLION", desc: "We blend ancient authority with modern defiance. Fashion is protest. Wear your roots loud." },
  { glyph: "𓅃", title: "MADE WITH PRIDE", desc: "Proudly designed in Cairo. We celebrate Egyptian craftsmanship and support local artisans." },
  { glyph: "𓊽", title: "FOR THE CULTURE", desc: "OHANNA is for anyone who carries the fire of Egyptian ancestry in their DNA — wherever they are in the world." },
  { glyph: "𓆣", title: "ALWAYS WATCHING", desc: "Like the Eye of Horus, we guard cultural integrity. No appropriation, only authentic celebration." },
];

export default function StoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? 67 + 16 : insets.top + 16, backgroundColor: "#1B1B1B" }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color="#FDF8EF" />
        </Pressable>
        <Text style={[styles.glyphs, { color: colors.primary }]}>𓂀 𓋹 𓇯</Text>
        <Text style={styles.title}>OUR STORY</Text>
        <Text style={[styles.sub, { color: "rgba(253,248,239,0.65)" }]}>
          Born from the cradle of civilization.{"\n"}Built for the streets of today.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>THE TIMELINE</Text>
        <GoldDivider />
        {TIMELINE.map((t, i) => (
          <View key={t.year} style={styles.timelineItem}>
            <View style={[styles.yearBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.yearText, { color: colors.primaryForeground }]}>{t.year}</Text>
            </View>
            <View style={[styles.timelineContent, { borderLeftColor: colors.border }]}>
              <Text style={[styles.timelineTitle, { color: colors.foreground }]}>{t.title}</Text>
              <Text style={[styles.timelineDesc, { color: colors.mutedForeground }]}>{t.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: "#1B1B1B" }]}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>OUR VALUES</Text>
        <GoldDivider />
        <View style={styles.valuesGrid}>
          {VALUES.map((v) => (
            <View key={v.title} style={[styles.valueCard, { borderColor: "rgba(200,157,41,0.3)" }]}>
              <Text style={[styles.valueGlyph, { color: colors.primary }]}>{v.glyph}</Text>
              <Text style={[styles.valueTitle, { color: "#FDF8EF" }]}>{v.title}</Text>
              <Text style={[styles.valueDesc, { color: "rgba(253,248,239,0.6)" }]}>{v.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingBottom: 32, gap: 8 },
  backBtn: { marginBottom: 8, width: 40 },
  glyphs: { fontSize: 18, letterSpacing: 6 },
  title: { fontSize: 30, fontFamily: "Cinzel_900Black", color: "#FDF8EF", letterSpacing: 2 },
  sub: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 21 },
  section: { padding: 20, gap: 16 },
  sectionTitle: { fontSize: 14, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  timelineItem: { flexDirection: "row", gap: 14, alignItems: "flex-start" },
  yearBadge: { paddingHorizontal: 8, paddingVertical: 4, minWidth: 60, alignItems: "center" },
  yearText: { fontSize: 10, fontFamily: "Cinzel_700Bold", letterSpacing: 0.5 },
  timelineContent: { flex: 1, borderLeftWidth: 2, paddingLeft: 14, paddingBottom: 20, gap: 4 },
  timelineTitle: { fontSize: 12, fontFamily: "Cinzel_700Bold", letterSpacing: 1 },
  timelineDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19 },
  valuesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  valueCard: { width: "47%", borderWidth: 1, padding: 14, gap: 6 },
  valueGlyph: { fontSize: 22 },
  valueTitle: { fontSize: 10, fontFamily: "Cinzel_700Bold", letterSpacing: 1.5 },
  valueDesc: { fontSize: 11, fontFamily: "Inter_400Regular", lineHeight: 16 },
});
