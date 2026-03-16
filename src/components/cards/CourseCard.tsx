import React from "react";
import { Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { Course } from "../../types";

interface CourseCardProps {
  item: Course;
}

export function CourseCard({ item }: CourseCardProps) {
  return (
    <GlassCard className="mr-3 w-[220px]">
      <Text className="text-xs uppercase tracking-[1.5px] text-slate-500">
        {item.category}
      </Text>
      <Text className="mt-3 text-lg font-bold text-white">{item.code}</Text>
      <Text className="mt-1 text-sm leading-6 text-slate-300">{item.title}</Text>
      <View className="mt-5">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xs text-slate-500">Course fit</Text>
          <Text className="text-xs font-medium text-slate-300">{item.progress}%</Text>
        </View>
        <View className="h-2 overflow-hidden rounded-full bg-white/8">
          <View
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${item.progress}%` }}
          />
        </View>
      </View>
    </GlassCard>
  );
}
