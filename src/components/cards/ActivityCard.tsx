import React from "react";
import { Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { Tag } from "../ui/Tag";
import { Activity } from "../../types";

interface ActivityCardProps {
  item: Activity;
}

export function ActivityCard({ item }: ActivityCardProps) {
  return (
    <GlassCard className="mb-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Tag label={item.kind} tone={item.verified ? "green" : "amber"} />
          <Text className="mt-3 text-lg font-semibold text-white">{item.title}</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {item.organization} • {item.period}
          </Text>
        </View>
        <Text className={`text-xs font-semibold ${item.verified ? "text-emerald-300" : "text-amber-300"}`}>
          {item.verified ? "Verified" : "Pending"}
        </Text>
      </View>

      <View className="mt-4">
        {item.bullets.map((bullet) => (
          <View className="mb-2 flex-row" key={bullet}>
            <View className="mt-2 mr-3 h-1.5 w-1.5 rounded-full bg-blue-300" />
            <Text className="flex-1 text-sm leading-6 text-slate-300">{bullet}</Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}
