import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { useColors } from "@/hooks/useColors";

const OPENINGS = [
  {
    title: "Senior Graphic Designer",
    dept: "Creative",
    location: "Cairo, Egypt",
    type: "Full-time",
    desc: "Design premium Egyptian streetwear graphics, seasonal collections, and brand identity materials.",
    skills: ["Adobe Illustrator", "Photoshop", "Brand design", "Typography"],
  },
  {
    title: "Social Media Manager",
    dept: "Marketing",
    location: "Cairo, Egypt",
    type: "Full-time",
    desc: "Build OHANNA's digital presence across Instagram, TikTok, and YouTube.",
    skills: ["Instagram/TikTok", "Video editing", "Copywriting", "Arabic & English"],
  },
  {
    title: "E-commerce Specialist",
    dept: "Operations",
    location: "Cairo, Egypt",
    type: "Full-time",
    desc: "Manage order processing, inventory, and logistics for our rapidly growing online store.",
    skills: ["Inventory management", "Shipping logistics", "Customer service"],
  },
  {
    title: "Fashion Photographer",
    dept: "Creative",
    location: "Cairo, Egypt",
    type: "Freelance",
    desc: "Capture OHANNA's Egyptian streetwear aesthetic in editorial photoshoots and video campaigns.",
    skills: ["DSLR/Mirrorless", "Lightroom", "Street photography"],
  },
];

export default function CareersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? 67 + 16 : insets.top + 16, backgroundColor: "#1B1B1B" }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color="#FDF8EF" />
        </Pressable>
        <Text style={styles.title}>JOIN THE TEAM</Text>
        <Text style={[styles.sub, { color: "rgba(253,248,239,0.65)" }]}>
          Build the future of Egyptian streetwear with us
        </Text>
      </View>

      <View style={[styles.perks, { backgroundColor: colors.primary }]}>
        {["COMPETITIVE PAY", "CREATIVE FREEDOM", "CULTURAL IMPACT", "TEAM FIRST"].map((p) => (
          <Text key={p} style={[styles.perk, { color: colors.primaryForeground }]}>{p}</Text>
        ))}
      </View>

      <View style={{ padding: 20, gap: 16 }}>
        <GoldDivider />
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>OPEN POSITIONS</Text>
        {OPENINGS.map((job) => (
          <View key={job.title} style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.jobHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.jobTitle, { color: colors.foreground }]}>{job.title}</Text>
                <Text style={[styles.jobDept, { color: colors.primary }]}>{job.dept}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: job.type === "Freelance" ? colors.accent : colors.foreground }]}>
                <Text style={[styles.typeText, { color: job.type === "Freelance" ? colors.accentForeground : colors.background }]}>
                  {job.type.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={[styles.jobLocation, { color: colors.mutedForeground }]}>
              <Feather name="map-pin" size={11} color={colors.mutedForeground} /> {job.location}
            </Text>
            <Text style={[styles.jobDesc, { color: colors.mutedForeground }]}>{job.desc}</Text>
            <View style={styles.skills}>
              {job.skills.map((s) => (
                <View key={s} style={[styles.skillChip, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                  <Text style={[styles.skillText, { color: colors.mutedForeground }]}>{s}</Text>
                </View>
              ))}
            </View>
            <Pressable
              style={({ pressed }) => [styles.applyBtn, { backgroundColor: colors.foreground, opacity: pressed ? 0.8 : 1 }]}
              onPress={() => router.push("/contact")}
            >
              <Text style={[styles.applyBtnText, { color: colors.background }]}>APPLY NOW</Text>
            </Pressable>
          </View>
        ))}
        <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingBottom: 24, gap: 6 },
  backBtn: { marginBottom: 8, width: 40 },
  title: { fontSize: 24, fontFamily: "Cinzel_900Black", color: "#FDF8EF", letterSpacing: 2 },
  sub: { fontSize: 13, fontFamily: "Inter_400Regular" },
  perks: { flexDirection: "row", flexWrap: "wrap", paddingVertical: 12, paddingHorizontal: 8 },
  perk: { fontSize: 9, fontFamily: "Cinzel_700Bold", letterSpacing: 1, paddingHorizontal: 10, paddingVertical: 4 },
  sectionTitle: { fontSize: 13, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  jobCard: { borderWidth: 1.5, padding: 16, gap: 10 },
  jobHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  jobTitle: { fontSize: 13, fontFamily: "Cinzel_700Bold", letterSpacing: 0.5 },
  jobDept: { fontSize: 10, fontFamily: "Inter_500Medium" },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4 },
  typeText: { fontSize: 8, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  jobLocation: { fontSize: 12, fontFamily: "Inter_400Regular" },
  jobDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillChip: { paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1 },
  skillText: { fontSize: 10, fontFamily: "Inter_400Regular" },
  applyBtn: { paddingVertical: 12, alignItems: "center" },
  applyBtnText: { fontSize: 10, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
});
