import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { BD, BTN_H, FS, GRID_PAD, SP } from "@/constants/theme";
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
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Dark hero header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: Platform.OS === "web" ? 67 + GRID_PAD : insets.top + GRID_PAD,
            backgroundColor: colors.foreground,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.background} />
        </Pressable>
        <Text style={[styles.title, { color: colors.background }]}>JOIN THE TEAM</Text>
        <Text style={[styles.sub, { color: "rgba(253,248,239,0.65)" }]}>
          Build the future of Egyptian streetwear with us
        </Text>
      </View>

      {/* Perks banner */}
      <View style={[styles.perks, { backgroundColor: colors.primary }]}>
        {["COMPETITIVE PAY", "CREATIVE FREEDOM", "CULTURAL IMPACT", "TEAM FIRST"].map((p) => (
          <Text key={p} style={[styles.perk, { color: colors.primaryForeground }]}>{p}</Text>
        ))}
      </View>

      <View style={{ padding: GRID_PAD, gap: GRID_PAD }}>
        <GoldDivider />
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>OPEN POSITIONS</Text>

        {OPENINGS.map((job) => (
          <View
            key={job.title}
            style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.jobHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.jobTitle, { color: colors.foreground }]}>{job.title}</Text>
                <Text style={[styles.jobDept, { color: colors.primary }]}>{job.dept}</Text>
              </View>
              <View
                style={[
                  styles.typeBadge,
                  {
                    backgroundColor:
                      job.type === "Freelance" ? colors.accent : colors.foreground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    {
                      color:
                        job.type === "Freelance" ? colors.accentForeground : colors.background,
                    },
                  ]}
                >
                  {job.type.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Feather name="map-pin" size={11} color={colors.mutedForeground} />
              <Text style={[styles.jobLocation, { color: colors.mutedForeground }]}>
                {job.location}
              </Text>
            </View>

            <Text style={[styles.jobDesc, { color: colors.mutedForeground }]}>{job.desc}</Text>

            <View style={styles.skills}>
              {job.skills.map((s) => (
                <View
                  key={s}
                  style={[styles.skillChip, { backgroundColor: colors.secondary, borderColor: colors.border }]}
                >
                  <Text style={[styles.skillText, { color: colors.mutedForeground }]}>{s}</Text>
                </View>
              ))}
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.applyBtn,
                { backgroundColor: colors.foreground, opacity: pressed ? 0.8 : 1 },
              ]}
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
  header: { padding: GRID_PAD, paddingBottom: SP.xxl, gap: SP.xs + 2 },
  backBtn: { marginBottom: SP.sm, width: 40 },
  title: { fontSize: FS.h2, fontFamily: "Cinzel_900Black", letterSpacing: 2 },
  sub: { fontSize: FS.base, fontFamily: "Inter_400Regular" },
  perks: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: SP.md,
    paddingHorizontal: SP.sm,
  },
  perk: {
    fontSize: FS.xxs,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1,
    paddingHorizontal: SP.md - 2,
    paddingVertical: SP.xs,
  },
  sectionTitle: { fontSize: FS.base, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  jobCard: { borderWidth: BD.md, padding: GRID_PAD, gap: SP.md - 2 },
  jobHeader: { flexDirection: "row", alignItems: "flex-start", gap: SP.md },
  jobTitle: { fontSize: FS.base, fontFamily: "Cinzel_700Bold", letterSpacing: 0.5 },
  jobDept: { fontSize: FS.xs, fontFamily: "Inter_500Medium" },
  typeBadge: { paddingHorizontal: SP.sm, paddingVertical: SP.xs },
  typeText: { fontSize: FS.micro, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: SP.xs },
  jobLocation: { fontSize: FS.md, fontFamily: "Inter_400Regular" },
  jobDesc: { fontSize: FS.base, fontFamily: "Inter_400Regular", lineHeight: 20 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: SP.xs + 2 },
  skillChip: { paddingHorizontal: SP.sm, paddingVertical: SP.xs - 1, borderWidth: BD.thin },
  skillText: { fontSize: FS.xs, fontFamily: "Inter_400Regular" },
  applyBtn: {
    paddingVertical: SP.md,
    alignItems: "center",
    minHeight: BTN_H.md,
    justifyContent: "center",
  },
  applyBtnText: { fontSize: FS.xs, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
});
