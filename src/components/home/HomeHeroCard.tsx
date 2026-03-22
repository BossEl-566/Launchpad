import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
};

export function HomeHeroCard({ title, subtitle, buttonText, onPress }: Props) {
  return (
    <LinearGradient
      colors={["#2D6BFF", "#5CA7FF", "#EEF3FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="overflow-hidden rounded-[30px] px-5 py-5"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-[20px] font-semibold text-white">{title}</Text>
          <Text className="mt-2 text-[15px] leading-6 text-[#DCE7FF]">
            {subtitle}
          </Text>

          <Pressable
            onPress={onPress}
            className="mt-5 self-start rounded-full bg-[#304FFE] px-5 py-3"
          >
            <Text className="text-[16px] font-semibold text-white">
              {buttonText}
            </Text>
          </Pressable>
        </View>

        <View className="items-center justify-center">
          <LinearGradient
            colors={["#85C4FF", "#2D6BFF", "#1B49D4"]}
            className="h-28 w-28 items-center justify-center rounded-[28px]"
            style={{ transform: [{ rotate: "18deg" }] }}
          >
            <View className="h-16 w-16 rounded-[20px] bg-white/20" />
            <Sparkles
              size={24}
              color="#EAF2FF"
              style={{ position: "absolute" }}
            />
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}
