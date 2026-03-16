import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NotificationItem } from "../../types";
import { GlassCard } from "../ui/GlassCard";

interface NotificationCardProps {
  item: NotificationItem;
  onPress?: () => void;
}

export function NotificationCard({ item, onPress }: NotificationCardProps) {
  const toneIcon =
    item.tone === "success"
      ? { bg: "bg-emerald-500/15", color: "#34D399", icon: "sparkles-outline" as const }
      : item.tone === "warning"
      ? { bg: "bg-amber-500/15", color: "#F59E0B", icon: "alert-circle-outline" as const }
      : { bg: "bg-blue-500/15", color: "#60A5FA", icon: "notifications-outline" as const };

  return (
    <Pressable onPress={onPress}>
      <GlassCard className={`mb-4 ${item.read ? "" : "border-blue-400/20"}`}>
        <View className="flex-row items-start">
          <View className={`mr-4 rounded-2xl p-3 ${toneIcon.bg}`}>
            <Ionicons name={toneIcon.icon} size={18} color={toneIcon.color} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">{item.title}</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-300">{item.message}</Text>
            <Text className="mt-3 text-xs uppercase tracking-[1.5px] text-slate-500">
              {item.createdAt}
            </Text>
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}
