import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
  Bot,
  BriefcaseBusiness,
  FileText,
  Home,
  UserRound,
} from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function DefaultTabIcon({
  focused,
  Icon,
}: {
  focused: boolean;
  Icon: LucideIcon;
}) {
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
        borderColor: focused ? "rgba(96,165,250,0.95)" : "transparent",
        shadowColor: "#3B82F6",
        shadowOpacity: focused ? 0.45 : 0,
        shadowRadius: focused ? 14 : 0,
        shadowOffset: { width: 0, height: 0 },
        elevation: focused ? 8 : 0,
      }}
    >
      <Icon
        size={22}
        color={focused ? "#F8FBFF" : "#AEB8CC"}
        strokeWidth={focused ? 2.4 : 2}
      />
    </View>
  );
}

function CenterOrbTabButton(props: BottomTabBarButtonProps) {
  const { accessibilityState, onPress, onLongPress } = props;
  const focused = !!accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      style={{
        top: -18,
        width: 82,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* outer glow */}
      <View
        style={{
          position: "absolute",
          width: 82,
          height: 82,
          borderRadius: 41,
          backgroundColor: focused
            ? "rgba(59,130,246,0.20)"
            : "rgba(96,165,250,0.10)",
          transform: [{ scale: 1.04 }],
        }}
      />

      {/* colored glow ring */}
      <LinearGradient
        colors={
          focused
            ? ["rgba(59,130,246,0.55)", "rgba(125,211,252,0.28)"]
            : ["rgba(59,130,246,0.28)", "rgba(125,211,252,0.16)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          width: 74,
          height: 74,
          borderRadius: 37,
        }}
      />

      {/* glass edge */}
      <LinearGradient
        colors={["rgba(255,255,255,0.34)", "rgba(255,255,255,0.08)"]}
        start={{ x: 0.15, y: 0.1 }}
        end={{ x: 0.9, y: 1 }}
        style={{
          width: 68,
          height: 68,
          borderRadius: 34,
          padding: 2,
        }}
      >
        {/* main orb */}
        <LinearGradient
          colors={
            focused
              ? ["#0F3BFF", "#2563EB", "#60A5FA"]
              : ["#0B1220", "#172554", "#1E3A8A"]
          }
          start={{ x: 0.12, y: 0.12 }}
          end={{ x: 0.88, y: 0.88 }}
          style={{
            flex: 1,
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: focused
              ? "rgba(147,197,253,0.65)"
              : "rgba(147,197,253,0.20)",
          }}
        >
          {/* top shine */}
          <View
            style={{
              position: "absolute",
              top: 7,
              left: 11,
              width: 30,
              height: 14,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.18)",
            }}
          />

          <Bot size={24} color="#F8FAFC" strokeWidth={2.4} />
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const config: Record<
          string,
          {
            icon?: LucideIcon;
            center?: boolean;
          }
        > = {
          home: { icon: Home },
          opportunities: { icon: BriefcaseBusiness },
          roadmap: { center: true },
          cv: { icon: FileText },
          profile: { icon: UserRound },
        };

        const item = config[route.name];

        return {
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
          tabBarIcon: ({ focused }) => {
            if (item?.center) return null;
            if (!item?.icon) return null;

            return <DefaultTabIcon focused={focused} Icon={item.icon} />;
          },
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="opportunities" options={{ title: "Jobs" }} />
      <Tabs.Screen
        name="roadmap"
        options={{
          tabBarButton: (props) => <CenterOrbTabButton {...props} />,
        }}
      />
      <Tabs.Screen name="cv" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
