import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { useColors } from "@/hooks/useColors";

const SYMBOLS = [
  { symbol: "𓋹", name: "ANKH", meaning: "Eternal Life & Power", desc: "The Ankh is the ancient Egyptian symbol for life, immortality, and divine power. Carried by pharaohs and gods alike." },
  { symbol: "𓂀", name: "EYE OF HORUS", meaning: "Protection & Royal Power", desc: "Wedjat — the Eye of Horus — is a symbol of protection, royal power, and good health. Our brand's guiding symbol." },
  { symbol: "𓁿", name: "SCARAB", meaning: "Transformation & Rebirth", desc: "The scarab beetle (Khepri) was the god of the rising sun. Egyptians carved scarabs as symbols of regeneration." },
  { symbol: "𓇳", name: "SUN DISC (RA)", meaning: "The Source of All Power", desc: "Ra, the sun god, was the most powerful deity. The sun disc represents creation, warmth, and omnipotent power." },
  { symbol: "𓅃", name: "FALCON (HORUS)", meaning: "Kingship & Divine Authority", desc: "The falcon was the manifestation of Horus, god of the sky and kingship. Every pharaoh was the living Horus." },
  { symbol: "𓊖", name: "CARTOUCHE", meaning: "Identity & Immortality", desc: "A cartouche is an oval enclosure containing a pharaoh's royal name in hieroglyphs — a mark of immortality." },
];

const GODS = [
  { name: "HORUS", role: "Sky God & Protector", info: "God of the sky, war, and hunting. Patron of pharaohs. His eye (the Wedjat) is one of the most powerful symbols of protection in history." },
  { name: "RA", role: "Sun God & Creator", info: "The paramount deity of ancient Egypt. Creator of all life and order." },
  { name: "OSIRIS", role: "God of Death & Resurrection", info: "Ruler of the underworld and judge of the dead. His resurrection gave hope of eternal life beyond death." },
  { name: "ANUBIS", role: "God of Mummification", info: "The jackal-headed guide of souls. He weighed the hearts of the dead against the feather of Ma'at." },
  { name: "THOTH", role: "God of Wisdom & Writing", info: "The ibis-headed god of knowledge, writing, science, and judgment. Inventor of hieroglyphs." },
  { name: "SEKHMET", role: "Goddess of War & Healing", info: "The lion-headed goddess of war — also of healing. She embodied both destruction and protection." },
];

export default function CultureScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? 67 + 16 : insets.top + 16, backgroundColor: "#1D4D4F" }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color="#FDF8EF" />
        </Pressable>
        <Text style={[styles.glyphs, { color: colors.primary }]}>𓂀 𓋹 𓇳 𓅃</Text>
        <Text style={styles.title}>EGYPTIAN CULTURE</Text>
        <Text style={[styles.sub, { color: "rgba(253,248,239,0.7)" }]}>The symbolism behind the streetwear</Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>SACRED SYMBOLS</Text>
        <GoldDivider />
        {SYMBOLS.map((s) => (
          <View key={s.name} style={[styles.symbolCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.symbolGlyph, { color: colors.primary }]}>{s.symbol}</Text>
            <View style={styles.symbolInfo}>
              <Text style={[styles.symbolName, { color: colors.foreground }]}>{s.name}</Text>
              <Text style={[styles.symbolMeaning, { color: colors.primary }]}>{s.meaning}</Text>
              <Text style={[styles.symbolDesc, { color: colors.mutedForeground }]}>{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: "#1B1B1B" }]}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>THE GODS</Text>
        <GoldDivider />
        {GODS.map((g) => (
          <View key={g.name} style={[styles.godCard, { borderColor: "rgba(200,157,41,0.3)" }]}>
            <Text style={[styles.godName, { color: colors.primary }]}>{g.name}</Text>
            <Text style={[styles.godRole, { color: "#E4D5B7" }]}>{g.role}</Text>
            <Text style={[styles.godInfo, { color: "rgba(253,248,239,0.6)" }]}>{g.info}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingBottom: 28, gap: 6 },
  backBtn: { marginBottom: 8, width: 40 },
  glyphs: { fontSize: 18, letterSpacing: 6 },
  title: { fontSize: 24, fontFamily: "Cinzel_900Black", color: "#FDF8EF", letterSpacing: 2 },
  sub: { fontSize: 13, fontFamily: "Inter_400Regular" },
  section: { padding: 20, gap: 14 },
  sectionTitle: { fontSize: 14, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  symbolCard: { flexDirection: "row", borderWidth: 1.5, padding: 14, gap: 14, alignItems: "flex-start" },
  symbolGlyph: { fontSize: 32, width: 40, textAlign: "center" },
  symbolInfo: { flex: 1, gap: 3 },
  symbolName: { fontSize: 12, fontFamily: "Cinzel_700Bold", letterSpacing: 1 },
  symbolMeaning: { fontSize: 10, fontFamily: "Inter_500Medium", letterSpacing: 0.5 },
  symbolDesc: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  godCard: { borderWidth: 1, padding: 16, gap: 5 },
  godName: { fontSize: 14, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  godRole: { fontSize: 11, fontFamily: "Inter_500Medium" },
  godInfo: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
