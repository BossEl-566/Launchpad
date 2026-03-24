import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import type { LucideIcon } from "lucide-react-native";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Link2,
  MessageSquare,
  Mic,
  Plus,
  Sparkles,
  Target,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

function fontStyle(weight: "400" | "500" | "700" = "400") {
  return {
    fontFamily:
      weight === "700"
        ? "Roboto_700Bold"
        : weight === "500"
          ? "Roboto_500Medium"
          : "Roboto_400Regular",
  } as const;
}

type ModeItem = {
  id: string;
  label?: string;
  icon: LucideIcon;
  active?: boolean;
  colors: [string, string, string];
};

type PromptCardItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  colors: [string, string, string];
};

type HistoryItem = {
  id: string;
  title: string;
  icon: LucideIcon;
  colors: [string, string, string];
};

function GlowShell({
  children,
  colors,
  radius = 28,
  innerRadius,
  innerBg = "#0C1322",
  outerStyle,
  innerStyle,
}: {
  children: React.ReactNode;
  colors: [string, string, string];
  radius?: number;
  innerRadius?: number;
  innerBg?: string;
  outerStyle?: any;
  innerStyle?: any;
}) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderRadius: radius,
          padding: 1.2,
        },
        outerStyle,
      ]}
    >
      <View
        style={[
          {
            borderRadius: innerRadius ?? radius - 2,
            backgroundColor: innerBg,
            overflow: "hidden",
          },
          innerStyle,
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
}

function ModeChip({ item }: { item: ModeItem }) {
  const Icon = item.icon;

  if (item.active) {
    return (
      <View style={{ marginRight: 12 }}>
        <GlowShell
          colors={item.colors}
          radius={999}
          innerRadius={999}
          innerBg="#101829"
        >
          <Pressable
            style={{
              height: 64,
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 999,
            }}
          >
            <Icon size={20} color="#F8FBFF" strokeWidth={2.3} />
            <Text
              style={[
                fontStyle("500"),
                {
                  color: "#F8FBFF",
                  fontSize: 17,
                  marginLeft: 10,
                },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>

          <View
            style={{
              position: "absolute",
              right: -15,
              top: -10,
              width: 70,
              height: 70,
              borderRadius: 999,
              backgroundColor: "rgba(96,165,250,0.12)",
            }}
          />
        </GlowShell>
      </View>
    );
  }

  return (
    <View style={{ marginRight: 12 }}>
      <GlowShell
        colors={item.colors}
        radius={999}
        innerRadius={999}
        innerBg="#0F1728"
      >
        <Pressable
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color="#DCE6F4" strokeWidth={2.3} />
        </Pressable>

        <View
          style={{
            position: "absolute",
            left: -12,
            bottom: -12,
            width: 52,
            height: 52,
            borderRadius: 999,
            backgroundColor: "rgba(139,92,246,0.08)",
          }}
        />
      </GlowShell>
    </View>
  );
}

function PromptCard({ item }: { item: PromptCardItem }) {
  const Icon = item.icon;

  return (
    <View style={{ width: 240, marginRight: 14 }}>
      <GlowShell
        colors={item.colors}
        radius={30}
        innerRadius={28}
        innerBg="#0D1424"
        outerStyle={{
          shadowColor: "#7C3AED",
          shadowOpacity: 0.18,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 7,
        }}
      >
        <Pressable style={{ padding: 16, minHeight: 210 }}>
          <View
            style={{
              position: "absolute",
              right: -22,
              top: -18,
              width: 110,
              height: 110,
              borderRadius: 999,
              backgroundColor: "rgba(37,99,235,0.10)",
            }}
          />
          <View
            style={{
              position: "absolute",
              left: -16,
              bottom: -18,
              width: 90,
              height: 90,
              borderRadius: 999,
              backgroundColor: "rgba(168,85,247,0.08)",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.iconBg,
              }}
            >
              <Icon size={22} color="#F8FAFC" strokeWidth={2.2} />
            </View>

            <GlowShell
              colors={["#60A5FA", "#8B5CF6", "#22D3EE"]}
              radius={999}
              innerRadius={999}
              innerBg="#121B2E"
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowUpRight size={20} color="#ECF3FF" strokeWidth={2.4} />
              </View>
            </GlowShell>
          </View>

          <Text
            style={[
              fontStyle("700"),
              {
                color: "#F8FAFC",
                fontSize: 18,
                lineHeight: 24,
                marginTop: 28,
              },
            ]}
          >
            {item.title}
          </Text>

          <Text
            style={[
              fontStyle("400"),
              {
                color: "#95A1B5",
                fontSize: 13,
                lineHeight: 21,
                marginTop: 10,
              },
            ]}
          >
            {item.subtitle}
          </Text>
        </Pressable>
      </GlowShell>
    </View>
  );
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const Icon = item.icon;

  return (
    <View style={{ marginBottom: 12 }}>
      <GlowShell
        colors={item.colors}
        radius={26}
        innerRadius={24}
        innerBg="#0F1728"
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <GlowShell
            colors={["#60A5FA", "#A855F7", "#22D3EE"]}
            radius={999}
            innerRadius={999}
            innerBg="#111A2D"
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={22} color="#EAF2FF" strokeWidth={2.2} />
            </View>
          </GlowShell>

          <Text
            style={[
              fontStyle("400"),
              {
                color: "#F3F6FB",
                fontSize: 15,
                lineHeight: 23,
                flex: 1,
                marginLeft: 14,
                marginRight: 12,
              },
            ]}
          >
            {item.title}
          </Text>

          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={20} color="#E5ECF6" strokeWidth={2.4} />
          </View>
        </Pressable>
      </GlowShell>
    </View>
  );
}

export default function RoadmapScreen() {
  const { profile } = useLaunchpad();
  const tabBarHeight = useBottomTabBarHeight();

  const goal = profile?.goal?.trim?.() || "your career goal";

  const modes: ModeItem[] = [
    {
      id: "chat",
      label: "Career Chat",
      icon: MessageSquare,
      active: true,
      colors: ["#60A5FA", "#8B5CF6", "#22D3EE"],
    },
    {
      id: "voice",
      icon: Mic,
      colors: ["#22D3EE", "#60A5FA", "#8B5CF6"],
    },
    {
      id: "image",
      icon: ImageIcon,
      colors: ["#8B5CF6", "#EC4899", "#60A5FA"],
    },
    {
      id: "link",
      icon: Link2,
      colors: ["#34D399", "#22D3EE", "#60A5FA"],
    },
  ];

  const promptCards: PromptCardItem[] = [
    {
      id: "goal",
      title: "Let’s talk about your career goal",
      subtitle: `Use AI to shape a clearer path toward ${goal}.`,
      icon: Target,
      iconBg: "#102A63",
      colors: ["#60A5FA", "#8B5CF6", "#22D3EE"],
    },
    {
      id: "internship",
      title: "Build my internship path",
      subtitle:
        "Find the right next step based on your current profile and strengths.",
      icon: BriefcaseBusiness,
      iconBg: "#0F3B2D",
      colors: ["#22D3EE", "#34D399", "#60A5FA"],
    },
    {
      id: "cv",
      title: "Turn my activities into CV points",
      subtitle:
        "Let AI rewrite your work into stronger professional statements.",
      icon: FileText,
      iconBg: "#31124E",
      colors: ["#A855F7", "#EC4899", "#60A5FA"],
    },
    {
      id: "courses",
      title: "Recommend courses I should take",
      subtitle:
        "Get course ideas that support your target role and long-term growth.",
      icon: GraduationCap,
      iconBg: "#123B72",
      colors: ["#60A5FA", "#22D3EE", "#34D399"],
    },
  ];

  const history: HistoryItem[] = [
    {
      id: "1",
      title: "Map out the best courses for my career direction",
      icon: GraduationCap,
      colors: ["#60A5FA", "#8B5CF6", "#22D3EE"],
    },
    {
      id: "2",
      title: "Find internships that match my current profile",
      icon: BriefcaseBusiness,
      colors: ["#22D3EE", "#34D399", "#60A5FA"],
    },
    {
      id: "3",
      title: "Rewrite my experience into strong CV bullet points",
      icon: FileText,
      colors: ["#A855F7", "#EC4899", "#60A5FA"],
    },
    {
      id: "4",
      title: "Help me plan a smarter path before graduation",
      icon: Sparkles,
      colors: ["#60A5FA", "#A855F7", "#22D3EE"],
    },
  ];

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: tabBarHeight + 120,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: -50,
            top: -20,
            width: 220,
            height: 220,
            borderRadius: 999,
            backgroundColor: "rgba(37,99,235,0.12)",
          }}
        />
        <View
          style={{
            position: "absolute",
            right: -20,
            top: 80,
            width: 180,
            height: 180,
            borderRadius: 999,
            backgroundColor: "rgba(168,85,247,0.10)",
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 40,
            top: 540,
            width: 150,
            height: 150,
            borderRadius: 999,
            backgroundColor: "rgba(34,211,238,0.08)",
          }}
        />
        <View
          style={{
            position: "absolute",
            right: 20,
            top: 760,
            width: 120,
            height: 120,
            borderRadius: 999,
            backgroundColor: "rgba(52,211,153,0.07)",
          }}
        />

        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          {/* top */}
          <View
            style={{
              marginBottom: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <LinearGradient
              colors={["#2563EB", "#8B5CF6", "#22D3EE"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 68,
                height: 68,
                borderRadius: 999,
                padding: 1.5,
                shadowColor: "#8B5CF6",
                shadowOpacity: 0.2,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 8 },
                elevation: 7,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 999,
                  backgroundColor: "#0E1526",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={30} color="#FFFFFF" strokeWidth={2.2} />
              </View>
            </LinearGradient>
          </View>

          {/* heading */}
          <View style={{ marginBottom: 28 }}>
            <Text
              style={[
                fontStyle("700"),
                {
                  color: "#F8FAFC",
                  fontSize: 26,
                  lineHeight: 32,
                },
              ]}
            >
              Hello,{" "}
              <Text style={[fontStyle("700"), { color: "#8B5CF6" }]}>
                Ask AI
              </Text>
            </Text>

            <Text
              style={[
                fontStyle("700"),
                {
                  color: "#F8FAFC",
                  fontSize: 26,
                  lineHeight: 34,
                  marginTop: 4,
                },
              ]}
            >
              Anything About Your Career
            </Text>

            <Text
              style={[
                fontStyle("400"),
                {
                  color: "#98A4B8",
                  fontSize: 14,
                  lineHeight: 22,
                  marginTop: 14,
                },
              ]}
            >
              Start a smart conversation about courses, internships, CV updates,
              career direction, or your next opportunity.
            </Text>
          </View>

          {/* chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 28 }}
          >
            {modes.map((item) => (
              <ModeChip key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* prompt cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 30 }}
          >
            {promptCards.map((item) => (
              <PromptCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* heading row */}
          <View
            style={{
              marginBottom: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                fontStyle("500"),
                {
                  color: "#F8FAFC",
                  fontSize: 20,
                },
              ]}
            >
              Chat History
            </Text>

            <Pressable>
              <Text
                style={[
                  fontStyle("400"),
                  {
                    color: "#A7B2C4",
                    fontSize: 15,
                  },
                ]}
              >
                See All
              </Text>
            </Pressable>
          </View>

          {/* history */}
          <View>
            {history.map((item) => (
              <HistoryRow key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* floating action button */}
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: tabBarHeight + 90,
          alignItems: "center",
        }}
      >
        <GlowShell
          colors={["#60A5FA", "#8B5CF6", "#22D3EE"]}
          radius={999}
          innerRadius={999}
          innerBg="#2563EB"
          outerStyle={{
            shadowColor: "#8B5CF6",
            shadowOpacity: 0.28,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 10 },
            elevation: 10,
          }}
        >
          <Pressable
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              borderRadius: 999,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2.8} />
            <Text
              style={[
                fontStyle("700"),
                {
                  color: "#FFFFFF",
                  fontSize: 15,
                  marginLeft: 10,
                },
              ]}
            >
              New Chat
            </Text>
          </Pressable>
        </GlowShell>
      </View>
    </SafeAreaView>
  );
}
