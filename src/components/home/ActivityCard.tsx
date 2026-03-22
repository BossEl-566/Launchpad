import {
    BriefcaseBusiness,
    FileText,
    Microscope,
    Users,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type IconType = "briefcase" | "file" | "microscope" | "users";

type Props = {
  title: string;
  subtitle: string;
  icon: IconType;
  onPress?: () => void;
};

function getIcon(icon: IconType) {
  switch (icon) {
    case "briefcase":
      return BriefcaseBusiness;
    case "file":
      return FileText;
    case "microscope":
      return Microscope;
    case "users":
      return Users;
  }
}

function getStyles(icon: IconType) {
  switch (icon) {
    case "briefcase":
      return { bg: "#1A2138", color: "#8AB4FF" };
    case "file":
      return { bg: "#18273C", color: "#74D2FF" };
    case "microscope":
      return { bg: "#182A25", color: "#72E4A5" };
    case "users":
      return { bg: "#2B1F1A", color: "#FFB78B" };
  }
}

export function ActivityCard({ title, subtitle, icon, onPress }: Props) {
  const Icon = getIcon(icon);
  const styles = getStyles(icon);

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 flex-row items-start rounded-[22px] border border-white/8 bg-[#11182A] px-4 py-4"
    >
      <View
        className="mr-4 h-12 w-12 items-center justify-center rounded-[16px]"
        style={{ backgroundColor: styles.bg }}
      >
        <Icon size={20} color={styles.color} strokeWidth={2.3} />
      </View>

      <View className="flex-1">
        <Text className="text-[16px] font-semibold text-white">{title}</Text>
        <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
