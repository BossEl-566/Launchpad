import React from "react";
import { Text, View } from "react-native";

interface TagProps {
  label: string;
  tone?: "default" | "blue" | "green" | "amber";
}

export function Tag({ label, tone = "default" }: TagProps) {
  const containerClasses =
    tone === "blue"
      ? "bg-blue-500/15 border-blue-400/20"
      : tone === "green"
      ? "bg-emerald-500/15 border-emerald-400/20"
      : tone === "amber"
      ? "bg-amber-500/15 border-amber-400/20"
      : "bg-white/5 border-white/10";

  const textClasses =
    tone === "blue"
      ? "text-blue-200"
      : tone === "green"
      ? "text-emerald-200"
      : tone === "amber"
      ? "text-amber-200"
      : "text-slate-200";

  return (
    <View className={`mr-2 rounded-full border px-3 py-1 ${containerClasses}`}>
      <Text className={`text-xs font-medium ${textClasses}`}>{label}</Text>
    </View>
  );
}
