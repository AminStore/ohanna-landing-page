import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, getImageUrl } from "@/constants/products";
import { BD, BTN_H, FS, GRID_GAP, GRID_PAD, SP } from "@/constants/theme";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");
const FEATURED = PRODUCTS.filter((p) => p.badge === "BESTSELLER" || p.badge === "LIMITED").slice(0, 4);

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
    >
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: topPad + SP.lg }]}>
        <LinearGradient colors={["#1B1B1B", "#2A1F0A"]} style={StyleSheet.absoluteFill} />
        <Text style={styles.hieroglyphStrip}>𓂀 𓋹 𓇯 𓊽 𓆣 𓐍 𓌀 𓃀</Text>
        <View style={styles.heroContent}>
          <Image
            source={{ uri: getImageUrl("/streetwear-egyptian-sketch.png") }}
            style={[styles.heroImage, { borderColor: "rgba(200,157,41,0.4)" }]}
            resizeMode="cover"
          />
          <View style={styles.heroText}>
            <Text style={[styles.heroTag, { color: colors.primary }]}>ANCIENT POWER</Text>
            <Text style={[styles.heroTitle, { color: colors.background }]}>REVIVING{"\n"}ROOTS{"\n"}IN STYLE</Text>
            <Text style={[styles.heroSub, { color: "rgba(253,248,239,0.65)" }]}>
              5,000 years of pharaonic power meets modern urban fashion.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.heroBtn,
                { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={() => router.push("/(tabs)/shop")}
            >
              <Text style={[styles.heroBtnText, { color: colors.primaryForeground }]}>
                SHOP THE CULTURE
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View style={[styles.stats, { backgroundColor: colors.primary }]}>
        {[
          { value: "10K+", label: "PHARAOHS" },
          { value: "5000+", label: "YRS HERITAGE" },
          { value: "12+", label: "SACRED PIECES" },
          { value: "4.9★", label: "RATING" },
        ].map((s) => (
          <View key={s.label} style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.primaryForeground }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: colors.primaryForeground }]}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Featured */}
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <GoldDivider />
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>FEATURED</Text>
          <Pressable onPress={() => router.push("/(tabs)/shop")}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>SEE ALL →</Text>
          </Pressable>
        </View>
        <View style={styles.grid}>
          {FEATURED.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => router.push(`/product/${p.slug}`)}
            />
          ))}
        </View>
      </View>

      {/* Brand story teaser */}
      <View style={[styles.storyBanner, { backgroundColor: colors.foreground }]}>
        <Text style={[styles.storyTitle, { color: colors.primary }]}>OUR STORY</Text>
        <Text style={[styles.storyText, { color: colors.background }]}>
          Born from the cradle of civilization. Built for the streets of today.
        </Text>
        <GoldDivider glyph="𓋹" />
        <Text style={[styles.storyBody, { color: colors.secondary }]}>
          OHANNA — where 5,000 years of pharaonic power meets contemporary rebellion.
        </Text>
      </View>

      {/* Categories */}
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>SHOP BY CATEGORY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {[
            { label: "Hoodies", icon: "layers" as const },
            { label: "T-Shirts", icon: "user" as const },
            { label: "Jackets", icon: "wind" as const },
            { label: "Bottoms", icon: "minus" as const },
            { label: "Accessories", icon: "star" as const },
          ].map((cat) => (
            <Pressable
              key={cat.label}
              style={({ pressed }) => [
                styles.catChip,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() =>
                router.push({ pathname: "/(tabs)/shop", params: { category: cat.label } })
              }
            >
              <Feather name={cat.icon} size={18} color={colors.primary} />
              <Text style={[styles.catLabel, { color: colors.foreground }]}>{cat.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{ height: Platform.OS === "web" ? 100 : 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 420,
    overflow: "hidden",
  },
  hieroglyphStrip: {
    color: "rgba(200,157,41,0.2)",
    fontSize: FS.lg,
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: SP.sm,
  },
  heroContent: {
    flexDirection: "row",
    paddingHorizontal: GRID_PAD,
    paddingBottom: SP.xxl,
    gap: GRID_GAP + SP.xs,
    alignItems: "flex-end",
  },
  heroImage: {
    width: 150,
    height: 220,
    borderWidth: BD.thick,
  },
  heroText: {
    flex: 1,
    gap: SP.sm,
  },
  heroTag: {
    fontSize: FS.xs,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: FS.h1,
    fontFamily: "Cinzel_900Black",
    lineHeight: 34,
    letterSpacing: 1,
  },
  heroSub: {
    fontSize: FS.md,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  heroBtn: {
    paddingVertical: SP.md - 2,
    paddingHorizontal: GRID_PAD - SP.xs,
    alignItems: "center",
    marginTop: SP.xs,
    minHeight: BTN_H.sm,
    justifyContent: "center",
  },
  heroBtnText: {
    fontSize: FS.xs,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  stats: {
    flexDirection: "row",
    paddingVertical: SP.lg - 2,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FS.lg,
    fontFamily: "Cinzel_700Bold",
  },
  statLabel: {
    fontSize: FS.micro,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
    opacity: 0.8,
    marginTop: SP.xs - 2,
  },
  section: {
    padding: GRID_PAD,
    gap: SP.lg - 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: FS.lg,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  seeAll: {
    fontSize: FS.sm,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
    justifyContent: "space-between",
  },
  storyBanner: {
    paddingHorizontal: GRID_PAD,
    paddingVertical: SP.xxxl - SP.sm,
    gap: SP.md,
    alignItems: "center",
  },
  storyTitle: {
    fontSize: FS.xxl,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 3,
  },
  storyText: {
    fontSize: FS.base,
    fontFamily: "Cinzel_400Regular",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  storyBody: {
    fontSize: FS.md,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 18,
    opacity: 0.85,
  },
  catScroll: {
    marginHorizontal: -GRID_PAD,
    paddingHorizontal: GRID_PAD,
  },
  catChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: SP.sm,
    paddingHorizontal: GRID_PAD - SP.xs,
    paddingVertical: SP.md,
    borderWidth: BD.md,
    marginRight: SP.md - 2,
  },
  catLabel: {
    fontSize: FS.md,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 0.8,
  },
});
