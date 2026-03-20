import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabIcon({
  focused,
  icon,
  color,
  isCenter = false,
}: {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  isCenter?: boolean;
}) {
  if (isCenter) {
    return (
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: focused ? "#132B73" : "#0F172A",
          borderWidth: 1.4,
          borderColor: focused
            ? "rgba(96,165,250,0.95)"
            : "rgba(96,165,250,0.28)",
          shadowColor: "#3B82F6",
          shadowOpacity: focused ? 0.65 : 0.3,
          shadowRadius: focused ? 20 : 10,
          shadowOffset: { width: 0, height: 0 },
          elevation: focused ? 16 : 8,
        }}
      >
        <View
          style={{
            position: "absolute",
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor: focused
              ? "rgba(59,130,246,0.22)"
              : "rgba(59,130,246,0.08)",
          }}
        />
        <Ionicons
          name={icon}
          size={24}
          color={focused ? "#EAF2FF" : "#C7D2FE"}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        width: 50,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? "rgba(37,99,235,0.22)" : "transparent",
        borderWidth: focused ? 1.2 : 0,
        borderColor: focused ? "rgba(96,165,250,0.9)" : "transparent",
        shadowColor: "#3B82F6",
        shadowOpacity: focused ? 0.45 : 0,
        shadowRadius: focused ? 14 : 0,
        shadowOffset: { width: 0, height: 0 },
        elevation: focused ? 8 : 0,
      }}
    >
      <Ionicons name={icon} size={22} color={focused ? "#F8FBFF" : color} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#EAF2FF",
        tabBarInactiveTintColor: "#AEB8CC",
        tabBarStyle: {
          position: "absolute",
          left: 14,
          right: 14,
          bottom: Math.max(insets.bottom, 10),
          height: 80,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "rgba(10,15,28,0.96)",
          borderTopWidth: 1.2,
          borderTopColor: "rgba(96,165,250,0.35)",
          borderRadius: 40,

          // blue glowing border feel
          shadowColor: "#2563EB",
          shadowOpacity: 0.22,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 0 },
          elevation: 18,
        },
        tabBarItemStyle: {
          flex: 1,
          marginHorizontal: -2,
          paddingHorizontal: 0,
          height: 58,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarIcon: ({ color, focused }) => {
          const config: Record<
            string,
            {
              icon: keyof typeof Ionicons.glyphMap;
              isCenter?: boolean;
            }
          > = {
            home: {
              icon: focused ? "home" : "home-outline",
            },
            opportunities: {
              icon: focused ? "briefcase" : "briefcase-outline",
            },
            roadmap: {
              icon: focused ? "sparkles" : "sparkles-outline",
              isCenter: true,
            },
            cv: {
              icon: focused ? "document-text" : "document-text-outline",
            },
            profile: {
              icon: focused ? "person" : "person-outline",
            },
          };

          const item = config[route.name];

          return (
            <TabIcon
              focused={focused}
              color={color}
              icon={item.icon}
              isCenter={item.isCenter}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="opportunities" options={{ title: "Jobs" }} />
      <Tabs.Screen name="roadmap" />
      <Tabs.Screen name="cv" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
