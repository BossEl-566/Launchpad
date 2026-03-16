import React from "react";
import { Text, View } from "react-native";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <View className="mb-4 flex-row items-end justify-between">
      <View className="flex-1 pr-3">
        <Text className="text-xl font-bold text-slate-50">{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-sm leading-5 text-slate-400">{subtitle}</Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}
