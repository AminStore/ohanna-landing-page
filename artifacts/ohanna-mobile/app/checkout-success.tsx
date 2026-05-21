import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
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
    <View style={[styles.container, { backgroundColor: "#1B1B1B", paddingTop: Platform.OS === "web" ? 67 + 40 : insets.top + 40 }]}>
      <Text style={[styles.glyphs, { color: colors.primary }]}>𓂀 𓋹 𓇯</Text>

      <View style={[styles.iconCircle, { borderColor: colors.primary }]}>
        <Feather name="check" size={40} color={colors.primary} />
      </View>

      <Text style={styles.title}>ORDER CONFIRMED</Text>
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
            <Text style={[styles.orderId, { color: "#FDF8EF" }]}>EGP {params.total}</Text>
          </>
        )}
      </View>

      <Text style={[styles.note, { color: "rgba(253,248,239,0.55)" }]}>
        A confirmation email will be sent to you shortly. You can track your order using the Order ID above.
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.trackBtn, { borderColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
          onPress={() => router.push("/track")}
        >
          <Feather name="package" size={14} color={colors.primary} />
          <Text style={[styles.trackBtnText, { color: colors.primary }]}>TRACK ORDER</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.shopBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}
          onPress={() => router.replace("/(tabs)/shop")}
        >
          <Text style={[styles.shopBtnText, { color: colors.primaryForeground }]}>CONTINUE SHOPPING</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 32, gap: 20 },
  glyphs: { fontSize: 20, letterSpacing: 8 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 26, fontFamily: "Cinzel_900Black", color: "#FDF8EF", letterSpacing: 2, textAlign: "center" },
  sub: { fontSize: 15, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
  orderBox: { width: "100%", borderWidth: 1, padding: 20, alignItems: "center", gap: 4 },
  orderLabel: { fontSize: 9, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  orderId: { fontSize: 18, fontFamily: "Cinzel_700Bold", letterSpacing: 1 },
  note: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 18 },
  actions: { width: "100%", gap: 12, marginTop: 8 },
  trackBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderWidth: 1.5 },
  trackBtnText: { fontSize: 11, fontFamily: "Cinzel_700Bold", letterSpacing: 1.5 },
  shopBtn: { paddingVertical: 14, alignItems: "center" },
  shopBtnText: { fontSize: 11, fontFamily: "Cinzel_700Bold", letterSpacing: 1.5 },
});
