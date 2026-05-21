import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useColors } from "@/hooks/useColors";
import { BADGE_COLORS, fmt, getImageUrl } from "@/constants/products";
import { BD, COL2, FS, RD, SP } from "@/constants/theme";
import type { Product } from "@/constants/products";

interface Props {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: Props) {
  const colors = useColors();
  const badge = BADGE_COLORS[product.badge];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          width: COL2,
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.imageWrapper, { backgroundColor: colors.secondary }]}>
        <Image
          source={{ uri: getImageUrl(product.image_url) }}
          style={styles.image}
          resizeMode="cover"
        />
        {badge && (
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>{product.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={[styles.category, { color: colors.mutedForeground }]}>
          {product.category}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          {fmt(product.price)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: BD.md,
    borderRadius: RD.none,
    overflow: "hidden",
    marginBottom: SP.md,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: SP.sm,
    left: SP.sm,
    paddingHorizontal: SP.sm - 1,
    paddingVertical: SP.xs - 1,
    borderRadius: RD.badge,
  },
  badgeText: {
    fontSize: FS.micro,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.8,
  },
  info: {
    padding: SP.md - 2,
    gap: SP.xs - 2,
  },
  name: {
    fontSize: FS.md,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 0.5,
  },
  category: {
    fontSize: FS.sm,
    fontFamily: "Inter_400Regular",
  },
  price: {
    fontSize: FS.base,
    fontFamily: "Inter_700Bold",
    marginTop: SP.xs - 2,
  },
});
