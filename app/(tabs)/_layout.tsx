import React from "react";
import { Tabs, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

export default function TabsLayout() {
  const { unreadCount } = useLaunchpad();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#020617" },
        headerShadowVisible: false,
        headerTintColor: "#F8FAFC",
        tabBarStyle: {
          backgroundColor: "#020617",
          borderTopColor: "rgba(255,255,255,0.06)",
          height: 82,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: "#64748B",
        headerRight: () => (
          <Pressable
            onPress={() => router.push("/notifications")}
            style={{ marginRight: 18 }}
          >
            <Ionicons name="notifications-outline" size={22} color="#E2E8F0" />
            {unreadCount ? (
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  right: -8,
                  top: -6,
                  backgroundColor: "#2563EB",
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text style={{ color: "white", fontSize: 10, fontWeight: "700" }}>
                  {Math.min(unreadCount, 9)}
                </Text>
              </View>
            ) : null}
          </Pressable>
        ),
        tabBarIcon: ({ color, focused }) => {
          const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
            home: focused ? "home" : "home-outline",
            opportunities: focused ? "briefcase" : "briefcase-outline",
            roadmap: focused ? "sparkles" : "sparkles-outline",
            cv: focused ? "document-text" : "document-text-outline",
            profile: focused ? "person-circle" : "person-circle-outline",
          };

          return <Ionicons name={iconMap[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="opportunities" options={{ title: "Matches", headerShown: false }} />
      <Tabs.Screen name="roadmap" options={{ title: "Roadmap", headerShown: false }} />
      <Tabs.Screen name="cv" options={{ title: "CV", headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false }} />
    </Tabs>
  );
}
