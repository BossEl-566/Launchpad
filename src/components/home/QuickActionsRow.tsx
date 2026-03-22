import { router } from "expo-router";
import {
    BriefcaseBusiness,
    FileText,
    Microscope,
    Sparkles,
    Users,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text } from "react-native";

type Item = {
  id: string;
  label: string;
  icon: "file" | "briefcase" | "microscope" | "sparkles" | "users";
  route: string;
};

type Props = {
  items: Item[];
};

function getIcon(icon: Item["icon"]) {
  switch (icon) {
    case "file":
      return FileText;
    case "briefcase":
      return BriefcaseBusiness;
    case "microscope":
      return Microscope;
    case "sparkles":
      return Sparkles;
    case "users":
      return Users;
  }
}

function getStyles(icon: Item["icon"]) {
  switch (icon) {
    case "file":
      return {
        bg: "#111A20",
        border: "#1E6D87",
        color: "#66D9FF",
      };
    case "briefcase":
      return {
        bg: "#17160F",
        border: "#7A6A18",
        color: "#FFD95C",
      };
    case "microscope":
      return {
        bg: "#101A16",
        border: "#216B4C",
        color: "#62E6A3",
      };
    case "sparkles":
      return {
        bg: "#161222",
        border: "#5A3FA3",
        color: "#B59CFF",
      };
    case "users":
      return {
        bg: "#1A1310",
        border: "#8B4A2D",
        color: "#FFB089",
      };
  }
}

export function QuickActionsRow({ items }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 20 }}
    >
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        const styles = getStyles(item.icon);

        return (
          <Pressable
            key={item.id}
            onPress={() => router.push(item.route as never)}
            className="mr-3 flex-row items-center rounded-full px-4 py-3"
            style={{
              backgroundColor: styles.bg,
              borderWidth: 1,
              borderColor: styles.border,
            }}
          >
            <Icon size={16} color={styles.color} strokeWidth={2.3} />
            <Text
              className="ml-2 text-[15px] font-medium"
              style={{ color: styles.color }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
