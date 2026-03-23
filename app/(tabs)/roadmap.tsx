import { LinearGradient } from "expo-linear-gradient";
import type { LucideIcon } from "lucide-react-native";
import {
  ArrowUpRight,
  Bell,
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
};

type PromptCardItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
};

type HistoryItem = {
  id: string;
  title: string;
  icon: LucideIcon;
};

function AppShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={`overflow-hidden rounded-[30px] border border-white/8 bg-[#0D1422] ${className}`}
      style={{
        shadowColor: "#2563EB",
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      {children}
    </View>
  );
}

function ModeChip({ item }: { item: ModeItem }) {
  const Icon = item.icon;

  if (item.active) {
    return (
      <Pressable className="mr-3 h-16 flex-row items-center rounded-full border border-[#60A5FA]/15 bg-[#111A2D] px-6">
        <Icon size={20} color="#EAF2FF" strokeWidth={2.3} />
        <Text
          style={[
            fontStyle("500"),
            { color: "#F8FAFC", fontSize: 17, marginLeft: 10 },
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable className="mr-3 h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-[#0F1728]">
      <Icon size={20} color="#D8E1F0" strokeWidth={2.3} />
    </Pressable>
  );
}

function PromptCard({ item }: { item: PromptCardItem }) {
  const Icon = item.icon;

  return (
    <Pressable className="mr-4 w-[230px]">
      <AppShellCard className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          <View
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: item.accent }}
          >
            <Icon size={22} color="#F8FAFC" strokeWidth={2.2} />
          </View>

          <View className="h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-[#111A2C]">
            <ArrowUpRight size={20} color="#E5ECF6" strokeWidth={2.4} />
          </View>
        </View>

        <Text
          style={[
            fontStyle("700"),
            { color: "#F8FAFC", fontSize: 17, marginTop: 26, lineHeight: 24 },
          ]}
        >
          {item.title}
        </Text>

        <Text
          style={[
            fontStyle("400"),
            { color: "#95A1B5", fontSize: 13, marginTop: 10, lineHeight: 21 },
          ]}
        >
          {item.subtitle}
        </Text>
      </AppShellCard>
    </Pressable>
  );
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const Icon = item.icon;

  return (
    <Pressable className="mb-3">
      <View className="flex-row items-center rounded-[24px] border border-white/8 bg-[#0F1728] px-4 py-4">
        <View className="mr-4 h-14 w-14 items-center justify-center rounded-full border border-white/8 bg-[#111A2D]">
          <Icon size={22} color="#EAF2FF" strokeWidth={2.2} />
        </View>

        <Text
          style={[
            fontStyle("400"),
            { color: "#F3F6FB", fontSize: 15, lineHeight: 23, flex: 1 },
          ]}
        >
          {item.title}
        </Text>

        <View className="ml-4 h-10 w-10 items-center justify-center rounded-full">
          <ArrowUpRight size={20} color="#E5ECF6" strokeWidth={2.4} />
        </View>
      </View>
    </Pressable>
  );
}

export default function RoadmapScreen() {
  const { profile } = useLaunchpad();

  const goal = profile?.goal?.trim?.() || "career goal";

  const modes: ModeItem[] = [
    {
      id: "chat",
      label: "Career Chat",
      icon: MessageSquare,
      active: true,
    },
    { id: "voice", icon: Mic },
    { id: "image", icon: ImageIcon },
    { id: "link", icon: Link2 },
  ];

  const promptCards: PromptCardItem[] = [
    {
      id: "goal",
      title: "Let’s talk about your career goal",
      subtitle: `Use AI to shape a clearer path toward ${goal}.`,
      icon: Target,
      accent: "#102A63",
    },
    {
      id: "internship",
      title: "Build my internship path",
      subtitle:
        "Find the right next step based on your current profile and strengths.",
      icon: BriefcaseBusiness,
      accent: "#0F3B2D",
    },
    {
      id: "cv",
      title: "Turn my activities into CV points",
      subtitle:
        "Let AI rewrite your work into stronger professional statements.",
      icon: FileText,
      accent: "#31124E",
    },
    {
      id: "courses",
      title: "Recommend courses I should take",
      subtitle:
        "Get course ideas that support your target role and long-term growth.",
      icon: GraduationCap,
      accent: "#123B72",
    },
  ];

  const history: HistoryItem[] = [
    {
      id: "1",
      title: "Map out the best courses for my career direction",
      icon: GraduationCap,
    },
    {
      id: "2",
      title: "Find internships that match my current profile",
      icon: BriefcaseBusiness,
    },
    {
      id: "3",
      title: "Rewrite my experience into strong CV bullet points",
      icon: FileText,
    },
    {
      id: "4",
      title: "Help me plan a smarter path before graduation",
      icon: Sparkles,
    },
  ];

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View className="absolute left-[-50] top-[-30] h-56 w-56 rounded-full bg-[#2563EB]/12" />
        <View className="absolute right-[-30] top-20 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-10 top-[520] h-40 w-40 rounded-full bg-[#0EA5E9]/7" />

        <View className="px-5 pt-3">
          {/* Top row */}
          <View className="mb-8 flex-row items-center justify-between">
            <LinearGradient
              colors={["#2563EB", "#7C3AED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-16 w-16 items-center justify-center rounded-full"
            >
              <Bot size={28} color="#FFFFFF" strokeWidth={2.2} />
            </LinearGradient>

            <Pressable className="h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-[#0D1422]">
              <Bell size={23} color="#F8FAFC" strokeWidth={2.2} />

              <View className="absolute right-1 top-1 h-7 w-7 items-center justify-center rounded-full bg-[#FF6B4A]">
                <Text
                  style={[fontStyle("700"), { color: "#FFFFFF", fontSize: 12 }]}
                >
                  5
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Headline */}
          <View className="mb-8">
            <Text
              style={[
                fontStyle("700"),
                { color: "#F8FAFC", fontSize: 24, lineHeight: 30 },
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
                  fontSize: 24,
                  lineHeight: 32,
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

          {/* Mode chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {modes.map((item) => (
              <ModeChip key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Prompt cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {promptCards.map((item) => (
              <PromptCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* History heading */}
          <View className="mb-5 flex-row items-center justify-between">
            <Text
              style={[fontStyle("500"), { color: "#F8FAFC", fontSize: 20 }]}
            >
              Chat History
            </Text>

            <Pressable>
              <Text
                style={[fontStyle("400"), { color: "#A7B2C4", fontSize: 15 }]}
              >
                See All
              </Text>
            </Pressable>
          </View>

          {/* History list */}
          <View>
            {history.map((item) => (
              <HistoryRow key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating action button */}
      <Pressable
        className="absolute bottom-7 right-5 flex-row items-center rounded-full bg-[#2563EB] px-5 py-4"
        style={{
          shadowColor: "#2563EB",
          shadowOpacity: 0.3,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
        }}
      >
        <Plus size={20} color="#FFFFFF" strokeWidth={2.8} />
        <Text
          style={[
            fontStyle("700"),
            { color: "#FFFFFF", fontSize: 15, marginLeft: 10 },
          ]}
        >
          New Chat
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
