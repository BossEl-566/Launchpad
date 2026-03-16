import React from "react";
import { Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";

interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <GlassCard className="mr-3 min-w-[132px] p-4">
      <Text className="text-2xl font-bold text-white">{value}</Text>
      <Text className="mt-2 text-sm text-slate-400">{label}</Text>
    </GlassCard>
  );
}
