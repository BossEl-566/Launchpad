import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  secondary?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
}

export function GradientButton({
  label,
  onPress,
  secondary = false,
  style,
  disabled = false,
}: GradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <LinearGradient
        colors={secondary ? ["#1F2937", "#111827"] : ["#3B82F6", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderWidth: 1,
            borderColor: secondary
              ? "rgba(255,255,255,0.1)"
              : "rgba(255,255,255,0.2)",
          },
          style,
        ]}
      >
        <Text className="text-center text-base font-semibold text-white">
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
