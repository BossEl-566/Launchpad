import React, { PropsWithChildren } from "react";
import { View } from "react-native";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <View
      className={`rounded-[28px] border border-white/10 bg-slate-900/95 p-4 ${className}`}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        elevation: 10,
      }}
    >
      {children}
    </View>
  );
}
