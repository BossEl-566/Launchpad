import React, { PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientButtonProps extends PropsWithChildren {
  label?: string;
  onPress?: () => void;
  secondary?: boolean;
}

export function GradientButton({
  children,
  label,
  onPress,
  secondary = false,
}: GradientButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={secondary ? ["#111827", "#1E293B"] : ["#3B82F6", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 18,
          paddingVertical: 15,
          paddingHorizontal: 18,
          borderWidth: 1,
          borderColor: secondary ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)",
        }}
      >
        {children ?? (
          <Text className="text-center text-base font-semibold text-white">
            {label}
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}
