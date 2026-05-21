import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { getApiBase } from "@/constants/products";
import { BD, BTN_H, FS, GRID_PAD, RD, SP } from "@/constants/theme";
import { useColors } from "@/hooks/useColors";

type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "confirmed";

const STATUS_LABELS: Record<
  OrderStatus | string,
  { label: string; icon: "clock" | "check-circle" | "truck" | "package" }
> = {
  pending:   { label: "PENDING",   icon: "clock" },
  confirmed: { label: "CONFIRMED", icon: "check-circle" },
  paid:      { label: "PAID",      icon: "check-circle" },
  shipped:   { label: "SHIPPED",   icon: "truck" },
  delivered: { label: "DELIVERED", icon: "package" },
};

export default function TrackScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim() || !email.trim()) {
      setError("Order ID and email are required.");
      return;
    }
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(
        `${getApiBase()}/track-order?id=${encodeURIComponent(orderId.trim())}&email=${encodeURIComponent(email.trim())}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order not found");
      setOrder(data.order);
    } catch (e: any) {
      setError(e.message ?? "Order not found. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = order ? (STATUS_LABELS[order.status] ?? STATUS_LABELS.pending) : null;

  return (
    <KeyboardAwareScrollViewCompat
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
      bottomOffset={16}
      keyboardShouldPersistTaps="handled"
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
        <Text style={[styles.headerTitle, { color: colors.background }]}>TRACK ORDER</Text>
        <Text style={[styles.headerSub, { color: colors.primary }]}>𓂀 SACRED DELIVERY</Text>
      </View>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <GoldDivider />
        <Text style={[styles.formTitle, { color: colors.foreground }]}>FIND YOUR ORDER</Text>

        <TextInput
          value={orderId}
          onChangeText={setOrderId}
          placeholder="Order ID (e.g. OHN-1234567)"
          placeholderTextColor={colors.mutedForeground}
          style={[
            styles.input,
            {
              color: colors.foreground,
              borderColor: colors.border,
              backgroundColor: colors.card,
              fontFamily: "Inter_400Regular",
            },
          ]}
          autoCapitalize="characters"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor={colors.mutedForeground}
          style={[
            styles.input,
            {
              color: colors.foreground,
              borderColor: colors.border,
              backgroundColor: colors.card,
              fontFamily: "Inter_400Regular",
            },
          ]}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {error ? (
          <View
            style={[
              styles.errorBox,
              { backgroundColor: "rgba(174,28,28,0.1)", borderColor: colors.destructive },
            ]}
          >
            <Feather name="alert-circle" size={14} color={colors.destructive} />
            <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.trackBtn,
            { backgroundColor: colors.foreground, opacity: pressed || loading ? 0.85 : 1 },
          ]}
          onPress={handleTrack}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <>
              <Feather name="search" size={16} color={colors.background} />
              <Text style={[styles.trackBtnText, { color: colors.background }]}>TRACK ORDER</Text>
            </>
          )}
        </Pressable>

        {order && (
          <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
            <GoldDivider />
            <View style={styles.orderHeader}>
              <View>
                <Text style={[styles.orderId, { color: colors.foreground }]}>{order.id}</Text>
                <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>
                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}
                </Text>
              </View>
              {statusInfo && (
                <View style={[styles.statusBadge, { backgroundColor: colors.accent }]}>
                  <Feather name={statusInfo.icon} size={12} color={colors.accentForeground} />
                  <Text style={[styles.statusText, { color: colors.accentForeground }]}>
                    {statusInfo.label}
                  </Text>
                </View>
              )}
            </View>

            {order.items?.length > 0 && (
              <View style={styles.orderItems}>
                {order.items.map((item: any, i: number) => (
                  <Text key={i} style={[styles.orderItem, { color: colors.mutedForeground }]}>
                    • {item.product?.name ?? "Item"} × {item.quantity}
                  </Text>
                ))}
              </View>
            )}

            {order.total && (
              <Text style={[styles.orderTotal, { color: colors.primary }]}>
                TOTAL: EGP {order.total.toLocaleString()}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  header: { padding: GRID_PAD, paddingBottom: SP.xxl, gap: SP.xs },
  backBtn: { marginBottom: SP.sm, width: 40 },
  headerTitle: { fontSize: FS.h3, fontFamily: "Cinzel_900Black", letterSpacing: 2 },
  headerSub: { fontSize: FS.xs, fontFamily: "Cinzel_700Bold", letterSpacing: 3 },
  content: { padding: GRID_PAD, gap: SP.lg - 2, flex: 1 },
  formTitle: { fontSize: FS.base, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  input: {
    borderWidth: BD.md,
    paddingHorizontal: SP.lg - 2,
    paddingVertical: SP.md + 1,
    fontSize: FS.lg,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SP.sm,
    padding: SP.md,
    borderWidth: BD.thin,
  },
  errorText: { fontSize: FS.base, fontFamily: "Inter_400Regular", flex: 1 },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SP.md - 2,
    paddingVertical: SP.lg,
    minHeight: BTN_H.lg,
  },
  trackBtnText: { fontSize: FS.sm, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  orderCard: { borderWidth: BD.md, padding: GRID_PAD, gap: SP.md, marginTop: SP.sm },
  orderHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  orderId: { fontSize: FS.lg, fontFamily: "Cinzel_700Bold", letterSpacing: 1 },
  orderDate: { fontSize: FS.sm, fontFamily: "Inter_400Regular", marginTop: SP.xs - 2 },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: SP.xs,
    paddingHorizontal: SP.md - 2,
    paddingVertical: SP.xs + 1,
    borderRadius: RD.badge,
  },
  statusText: { fontSize: FS.xxs, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  orderItems: { gap: SP.xs },
  orderItem: { fontSize: FS.base, fontFamily: "Inter_400Regular", lineHeight: 20 },
  orderTotal: { fontSize: FS.lg, fontFamily: "Inter_700Bold" },
});
