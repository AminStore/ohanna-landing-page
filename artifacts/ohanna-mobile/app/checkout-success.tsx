import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { BD, BTN_H, FS, GRID_PAD, RD, SP } from "@/constants/theme";
import { useCart } from "@/contexts/CartContext";
import { useColors } from "@/hooks/useColors";

export default function CheckoutSuccessScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { clearCart } = useCart();
  const params = useLocalSearchParams<{ order_id?: string; session_id?: string; total?: string }>();
  const orderId = params.order_id ?? params.session_id ?? `OHN-${Date.now()}`;

  useEffect(() => {
    clearCart();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.foreground,
          paddingTop: Platform.OS === "web" ? 67 + SP.xxxl : insets.top + SP.xxxl,
        },
      ]}
    >
      <Text style={[styles.glyphs, { color: colors.primary }]}>𓂀 𓋹 𓇯</Text>

      <View style={[styles.iconCircle, { borderColor: colors.primary }]}>
        <Feather name="check" size={40} color={colors.primary} />
      </View>

      <Text style={[styles.title, { color: colors.background }]}>ORDER CONFIRMED</Text>
      <Text style={[styles.sub, { color: "rgba(253,248,239,0.7)" }]}>
        Your order has been placed,{"\n"}Pharaoh.
      </Text>

      <GoldDivider />

      <View style={[styles.orderBox, { backgroundColor: "rgba(200,157,41,0.08)", borderColor: "rgba(200,157,41,0.3)" }]}>
        <Text style={[styles.orderLabel, { color: "rgba(253,248,239,0.5)" }]}>ORDER ID</Text>
        <Text style={[styles.orderId, { color: colors.primary }]}>{orderId}</Text>
        {params.total && (
          <>
            <Text style={[styles.orderLabel, { color: "rgba(253,248,239,0.5)" }]}>TOTAL PAID</Text>
            <Text style={[styles.orderId, { color: colors.background }]}>EGP {params.total}</Text>
          </>
        )}
      </View>

      <Text style={[styles.note, { color: "rgba(253,248,239,0.55)" }]}>
        A confirmation email will be sent to you shortly. Track your order using the Order ID above.
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.trackBtn,
            { borderColor: colors.primary, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => router.push("/track")}
        >
          <Feather name="package" size={14} color={colors.primary} />
          <Text style={[styles.trackBtnText, { color: colors.primary }]}>TRACK ORDER</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.shopBtn,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.replace("/(tabs)/shop")}
        >
          <Text style={[styles.shopBtnText, { color: colors.primaryForeground }]}>
            CONTINUE SHOPPING
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: GRID_PAD + SP.md,
    gap: GRID_PAD,
  },
  glyphs: { fontSize: FS.xxxl, letterSpacing: 8 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: RD.circle,
    borderWidth: BD.thick,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FS.h1,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 2,
    textAlign: "center",
  },
  sub: {
    fontSize: FS.xl - 1,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 23,
  },
  orderBox: {
    width: "100%",
    borderWidth: BD.thin,
    padding: GRID_PAD,
    alignItems: "center",
    gap: SP.xs,
  },
  orderLabel: { fontSize: FS.xxs, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  orderId: { fontSize: FS.xxl, fontFamily: "Cinzel_700Bold", letterSpacing: 1 },
  note: {
    fontSize: FS.md,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 19,
  },
  actions: { width: "100%", gap: SP.md, marginTop: SP.sm },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SP.sm,
    paddingVertical: SP.lg,
    borderWidth: BD.md,
    minHeight: BTN_H.lg,
  },
  trackBtnText: { fontSize: FS.sm, fontFamily: "Cinzel_700Bold", letterSpacing: 1.5 },
  shopBtn: {
    paddingVertical: SP.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: BTN_H.lg,
  },
  shopBtnText: { fontSize: FS.sm, fontFamily: "Cinzel_700Bold", letterSpacing: 1.5 },
});
