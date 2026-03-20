import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

type RecommendationCardType = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  action: string;
  bgColor: string;
  actionBg: string;
  actionText: string;
};

type ActivityItemType = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconWrapBg: string;
  iconColor: string;
};

const recommendationCards: RecommendationCardType[] = [
  {
    id: "1",
    tag: "98% MATCH",
    title: "UX Research Intern",
    subtitle: "at Google • Summer 2024",
    action: "APPLY NOW",
    bgColor: "#315DFF",
    actionBg: "#F8FAFC",
    actionText: "#1D4ED8",
  },
  {
    id: "2",
    tag: "SKILL GAP FIX",
    title: "Behavioral Psychology",
    subtitle: "Aligns with your growth path",
    action: "VIEW SYLLABUS",
    bgColor: "#10B981",
    actionBg: "#ECFDF5",
    actionText: "#047857",
  },
];

const skills = [
  { label: "Product Design", outlined: false },
  { label: "Python", outlined: false },
  { label: "Data Viz", outlined: false },
  { label: "Academic Writing", outlined: false },
  { label: "Public Speaking +", outlined: true },
  { label: "SQL +", outlined: true },
];

const activities: ActivityItemType[] = [
  {
    id: "1",
    title: "Volunteer Work Verified",
    subtitle: "Community Tech Center confirmed your 20 hours.",
    time: "2 HOURS AGO",
    icon: "shield-checkmark",
    iconWrapBg: "#0F2A63",
    iconColor: "#60A5FA",
  },
  {
    id: "2",
    title: "New Connection",
    subtitle: "Sarah from City Uni (CS Major) started following you.",
    time: "YESTERDAY",
    icon: "person-add",
    iconWrapBg: "#2B174A",
    iconColor: "#C084FC",
  },
];

function AvatarBubble({ name, uri }: { name: string; uri?: string | null }) {
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        className="h-11 w-11 rounded-full border border-white/15"
        resizeMode="cover"
      />
    );
  }

  return (
    <View className="h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#111827]">
      <Text className="text-sm font-bold text-white">{initials || "A"}</Text>
    </View>
  );
}

function SkillPill({ label, outlined }: { label: string; outlined?: boolean }) {
  return (
    <View
      className={`mb-3 mr-3 rounded-[14px] px-4 py-2.5 ${
        outlined
          ? "border border-dashed border-white/20 bg-transparent"
          : "border border-[#1E40AF] bg-[#111B3D]"
      }`}
    >
      <Text
        className={`text-[15px] font-medium ${
          outlined ? "text-[#9CA3AF]" : "text-[#4F7CFF]"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const { profile } = useLaunchpad();

  const firstName = profile?.name?.split(" ")[0] || "Alex";

  const verificationPercent = 84;
  const skillMastery = 88;
  const creditsEarned = 92;
  const creditsTotal = 120;
  const progressPercent = (creditsEarned / creditsTotal) * 100;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#030712]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="border-b border-white/5 bg-[#040B1A] px-5 pb-4 pt-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-[#315DFF] shadow-lg">
                <Ionicons name="flash" size={18} color="#FFFFFF" />
              </View>
              <Text className="text-[19px] font-extrabold tracking-tight text-[#C7D2FE]">
                LAUNCHPAD
              </Text>
            </View>

            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.push("/notifications")}
                className="mr-4"
              >
                <View>
                  <Ionicons
                    name="notifications-outline"
                    size={23}
                    color="#E5E7EB"
                  />
                  <View className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-[#FB7185]" />
                </View>
              </Pressable>

              <AvatarBubble
                name={profile?.name || "Alex Doe"}
                uri={profile?.avatar}
              />
            </View>
          </View>
        </View>

        <View className="px-5 pt-6">
          {/* Greeting */}
          <View className="mb-8">
            <Text className="text-[33px] font-extrabold tracking-tight text-white">
              Hi, {firstName}! 👋
            </Text>
            <Text className="mt-2 text-[16px] leading-7 text-[#9CA3AF]">
              Your academic journey is looking great. {verificationPercent}% of
              your profile is verified.
            </Text>
          </View>

          {/* Academic Progress */}
          <View className="mb-10 rounded-[24px] border border-white/8 bg-[#171C28] px-5 py-6">
            <View className="mb-6 flex-row items-start justify-between">
              <Text className="text-[18px] font-bold text-white">
                Academic Progress
              </Text>

              <View className="rounded-full border border-[#0F766E] bg-[#0B2D2A] px-4 py-1.5">
                <Text className="text-[14px] font-bold text-[#34D399]">
                  ON TRACK
                </Text>
              </View>
            </View>

            <View className="mb-5 flex-row items-end justify-between">
              <View>
                <Text className="mb-2 text-[14px] font-medium uppercase text-[#9CA3AF]">
                  Skill Mastery Index
                </Text>
                <View className="flex-row items-end">
                  <Text className="text-[28px] font-extrabold text-white">
                    {skillMastery}
                  </Text>
                  <Text className="mb-[2px] ml-1 text-[18px] font-bold text-[#3B82F6]">
                    %
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="mb-2 text-[14px] font-medium uppercase text-[#9CA3AF]">
                  Credits Earned
                </Text>
                <Text className="text-[18px] font-extrabold text-white">
                  {creditsEarned}
                  <Text className="text-[#6B7280]"> / {creditsTotal}</Text>
                </Text>
              </View>
            </View>

            <View className="h-3 overflow-hidden rounded-full bg-[#050A14]">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: "#315DFF",
                }}
              />
            </View>
          </View>

          {/* AI Recommendations */}
          <View className="mb-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="flash" size={18} color="#4F7CFF" />
              <Text className="ml-3 text-[17px] font-bold text-white">
                AI Recommendations
              </Text>
            </View>

            <Pressable>
              <Text className="text-[14px] font-bold tracking-[2px] text-[#4F7CFF]">
                REFRESH
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-10"
          >
            {recommendationCards.map((card, index) => (
              <View
                key={card.id}
                className="mr-4 w-[285px] rounded-[22px] px-5 py-6"
                style={{
                  backgroundColor: card.bgColor,
                  marginRight:
                    index === recommendationCards.length - 1 ? 0 : 16,
                }}
              >
                <View className="self-start rounded-lg bg-white/15 px-3 py-1">
                  <Text className="text-[13px] font-bold tracking-[2px] text-white">
                    {card.tag}
                  </Text>
                </View>

                <Text className="mt-5 text-[20px] font-extrabold text-white">
                  {card.title}
                </Text>

                <Text className="mt-2 text-[15px] leading-6 text-white/90">
                  {card.subtitle}
                </Text>

                <Pressable
                  className="mt-7 self-start rounded-[16px] px-6 py-3.5"
                  style={{ backgroundColor: card.actionBg }}
                  onPress={() =>
                    router.push(
                      card.id === "1"
                        ? "/(tabs)/opportunities"
                        : "/(tabs)/roadmap",
                    )
                  }
                >
                  <Text
                    className="text-[16px] font-extrabold"
                    style={{ color: card.actionText }}
                  >
                    {card.action}
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>

          {/* Skills Snapshot */}
          <View className="mb-10 rounded-[24px] border border-white/8 bg-[#171C28] px-5 py-6">
            <Text className="mb-5 text-[17px] font-bold text-white">
              Skills Snapshot
            </Text>

            <View className="flex-row flex-wrap">
              {skills.map((skill) => (
                <SkillPill
                  key={skill.label}
                  label={skill.label}
                  outlined={skill.outlined}
                />
              ))}
            </View>

            <View className="mt-5 flex-row items-center justify-between rounded-[18px] bg-[#060B16] px-4 py-5">
              <View className="mr-4 flex-1 flex-row items-center">
                <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-[#0F235B]">
                  <Ionicons name="book-outline" size={24} color="#4F7CFF" />
                </View>

                <View className="flex-1">
                  <Text className="text-[16px] font-bold text-white">
                    Auto-update CV?
                  </Text>
                  <Text className="mt-1 text-[14px] leading-6 text-[#9CA3AF]">
                    Launchpad detected 2 new verified activities.
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => router.push("/(tabs)/cv")}
                className="rounded-[14px] bg-[#315DFF] px-5 py-3"
              >
                <Text className="text-[15px] font-extrabold text-white">
                  UPDATE
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Recent Activity */}
          <Text className="mb-5 text-[17px] font-bold text-white">
            Recent Activity
          </Text>

          {activities.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row ${
                index !== activities.length - 1
                  ? "mb-5 border-b border-white/5 pb-5"
                  : ""
              }`}
            >
              <View
                className="mr-4 h-12 w-12 items-center justify-center rounded-[16px]"
                style={{ backgroundColor: item.iconWrapBg }}
              >
                <Ionicons name={item.icon} size={22} color={item.iconColor} />
              </View>

              <View className="flex-1">
                <Text className="text-[16px] font-bold text-white">
                  {item.title}
                </Text>
                <Text className="mt-1 text-[15px] leading-6 text-[#9CA3AF]">
                  {item.subtitle}
                </Text>
                <Text className="mt-2 text-[13px] font-semibold tracking-[1px] text-[#6B7280]">
                  {item.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
