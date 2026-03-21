import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
  Bell,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutGrid,
  PencilLine,
  Search,
  Sparkles,
  Target
} from "lucide-react-native";
import React, { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={`overflow-hidden rounded-[28px] border border-white/10 bg-[#0D1424] ${className}`}
      style={{
        shadowColor: "#2563EB",
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 0 },
        elevation: 3,
      }}
    >
      {children}
    </View>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <View className="mb-4 flex-row items-end justify-between">
      <View className="flex-1 pr-4">
        <Text className="text-[20px] font-extrabold tracking-tight text-white">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-1 text-[14px] leading-6 text-[#8A94A7]">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

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
        resizeMode="cover"
        className="h-20 w-20 rounded-[24px] border border-white/15"
      />
    );
  }

  return (
    <View className="h-20 w-20 items-center justify-center rounded-[24px] border border-white/15 bg-[#111827]">
      <Text className="text-xl font-extrabold text-white">
        {initials || "A"}
      </Text>
    </View>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <View className="mb-3 w-[48.5%] rounded-[22px] border border-white/8 bg-[#11192B] px-4 py-4">
      <View
        className="mb-4 h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: accent }}
      >
        <Icon size={20} color="#E5F0FF" strokeWidth={2.3} />
      </View>

      <Text className="text-[13px] font-medium uppercase tracking-[1px] text-[#8D97A9]">
        {label}
      </Text>
      <Text className="mt-2 text-[24px] font-extrabold text-white">
        {value}
      </Text>
    </View>
  );
}

function TagChip({
  label,
  tone = "blue",
}: {
  label: string;
  tone?: "blue" | "purple" | "default";
}) {
  const tones = {
    blue: {
      bg: "#101B38",
      border: "rgba(29,78,216,0.30)",
      text: "#7CB7FF",
    },
    purple: {
      bg: "#22133A",
      border: "rgba(167,139,250,0.22)",
      text: "#C4B5FD",
    },
    default: {
      bg: "rgba(255,255,255,0.05)",
      border: "rgba(255,255,255,0.10)",
      text: "#CBD5E1",
    },
  } as const;

  const current = tones[tone];

  return (
    <View
      className="mb-3 mr-3 rounded-[14px] px-4 py-2.5"
      style={{
        backgroundColor: current.bg,
        borderWidth: 1,
        borderColor: current.border,
      }}
    >
      <Text
        className="text-[14px] font-semibold"
        style={{ color: current.text }}
      >
        {label}
      </Text>
    </View>
  );
}

function QuickLinkCard({
  icon: Icon,
  title,
  subtitle,
  accent,
  onPress,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  accent: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 w-[48.5%] rounded-[22px] border border-white/8 bg-[#11192B] px-4 py-4"
    >
      <View
        className="mb-4 h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: accent }}
      >
        <Icon size={20} color="#E5F0FF" strokeWidth={2.3} />
      </View>

      <Text className="text-[16px] font-extrabold text-white">{title}</Text>
      <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
        {subtitle}
      </Text>
    </Pressable>
  );
}

function SettingsRow({
  icon: Icon,
  title,
  subtitle,
  onPress,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-white/8 py-4"
    >
      <View className="mr-4 flex-1 flex-row items-center">
        <View className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
          <Icon size={18} color="#94A3B8" strokeWidth={2.3} />
        </View>

        <View className="flex-1">
          <Text className="text-[15px] font-bold text-white">{title}</Text>
          <Text className="mt-1 text-[13px] leading-5 text-[#94A3B8]">
            {subtitle}
          </Text>
        </View>
      </View>

      <ChevronRight size={18} color="#94A3B8" strokeWidth={2.5} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { profile, savedIds, appliedIds, notifications } = useLaunchpad();

  const skills = profile?.skills ?? [];
  const interests = profile?.interests ?? [];

  const profileCompletion = useMemo(() => {
    const base = 58;
    const summaryBoost = profile?.summary ? 10 : 0;
    const skillsBoost = Math.min(skills.length * 3, 18);
    const interestsBoost = Math.min(interests.length * 2, 10);
    return Math.min(base + summaryBoost + skillsBoost + interestsBoost, 96);
  }, [profile?.summary, skills.length, interests.length]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View className="absolute left-[-50] top-[-20] h-56 w-56 rounded-full bg-[#2563EB]/20" />
        <View className="absolute right-[-30] top-24 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[620] h-40 w-40 rounded-full bg-[#0EA5E9]/8" />

        <View className="px-5 pt-3">
          {/* Hero */}
          <LinearGradient
            colors={["#0E1728", "#0D1A36", "#091120"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="mb-8 overflow-hidden rounded-[32px] border border-white/10 px-5 py-6"
          >
            <View className="absolute right-[-20] top-[-10] h-40 w-40 rounded-full bg-[#3B82F6]/18" />
            <View className="absolute bottom-[-24] left-[-12] h-28 w-28 rounded-full bg-[#8B5CF6]/10" />

            <View className="mb-5 flex-row items-start">
              <AvatarBubble name={profile.name} uri={profile.avatar} />

              <View className="ml-4 flex-1">
                <View className="self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
                  <Text className="text-[12px] font-bold uppercase tracking-[1.4px] text-[#93C5FD]">
                    Student profile
                  </Text>
                </View>

                <Text className="mt-3 text-[28px] font-extrabold tracking-tight text-white">
                  {profile.name}
                </Text>

                <Text className="mt-1 text-[15px] font-semibold text-[#93C5FD]">
                  {profile.goal}
                </Text>

                <Text className="mt-2 text-[14px] text-[#A8B3C7]">
                  {profile.degree} • {profile.year}
                </Text>
                <Text className="mt-1 text-[14px] text-[#C7D2FE]">
                  {profile.school}
                </Text>
              </View>
            </View>

            <Text className="text-[15px] leading-7 text-[#A8B3C7]">
              {profile.summary}
            </Text>

            <View className="mt-5 flex-row">
              <Pressable className="mr-3 flex-row items-center rounded-[16px] bg-[#2563EB] px-5 py-3.5">
                <PencilLine size={16} color="#FFFFFF" strokeWidth={2.4} />
                <Text className="ml-2 text-[15px] font-extrabold text-white">
                  Edit profile
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(tabs)/cv" as never)}
                className="flex-row items-center rounded-[16px] border border-white/10 bg-white/5 px-5 py-3.5"
              >
                <FileText size={16} color="#C7D2FE" strokeWidth={2.3} />
                <Text className="ml-2 text-[15px] font-bold text-[#E2E8F0]">
                  Open CV
                </Text>
              </Pressable>
            </View>
          </LinearGradient>

          {/* Snapshot */}
          <SectionHeader
            title="Profile snapshot"
            subtitle="A quick view of your activity and profile strength."
          />

          <View className="mb-6 flex-row flex-wrap justify-between">
            <MetricTile
              icon={Sparkles}
              label="Profile score"
              value={`${profileCompletion}%`}
              accent="#102A63"
            />
            <MetricTile
              icon={BriefcaseBusiness}
              label="Applied"
              value={`${appliedIds.length}`}
              accent="#0F3B2D"
            />
            <MetricTile
              icon={BookOpen}
              label="Saved"
              value={`${savedIds.length}`}
              accent="#1E1B4B"
            />
            <MetricTile
              icon={Bell}
              label="Alerts"
              value={`${notifications.length}`}
              accent="#3B1A52"
            />
          </View>

          {/* Completion card */}
          <GlassCard className="mb-8 px-5 py-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[18px] font-extrabold text-white">
                  Profile completion
                </Text>
                <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                  Complete your skills, interests, and profile details to
                  improve match quality across opportunities and CV suggestions.
                </Text>
              </View>

              <View className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5">
                <Text className="text-[12px] font-extrabold tracking-[1px] text-[#34D399]">
                  ON TRACK
                </Text>
              </View>
            </View>

            <View className="mt-5 h-3 overflow-hidden rounded-full bg-[#06101E]">
              <LinearGradient
                colors={["#2563EB", "#60A5FA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: `${profileCompletion}%`,
                  height: "100%",
                  borderRadius: 999,
                }}
              />
            </View>

            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-[13px] font-semibold text-[#8D97A9]">
                Completion level
              </Text>
              <Text className="text-[14px] font-extrabold text-white">
                {profileCompletion}%
              </Text>
            </View>
          </GlassCard>

          {/* Academic + career */}
          <SectionHeader
            title="Academic & career identity"
            subtitle="The information Launchpad uses to guide your path."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="mb-4 flex-row items-start">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#102A63]">
                <GraduationCap size={20} color="#93C5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text className="text-[17px] font-extrabold text-white">
                  Academic profile
                </Text>
                <Text className="mt-2 text-[14px] leading-7 text-[#94A3B8]">
                  <Text className="font-bold text-[#CBD5E1]">School:</Text>{" "}
                  {profile.school}
                  {"\n"}
                  <Text className="font-bold text-[#CBD5E1]">Degree:</Text>{" "}
                  {profile.degree}
                  {"\n"}
                  <Text className="font-bold text-[#CBD5E1]">Year:</Text>{" "}
                  {profile.year}
                </Text>
              </View>
            </View>

            <View className="h-px bg-white/8" />

            <View className="mt-4 flex-row items-start">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#31124E]">
                <Target size={20} color="#C4B5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text className="text-[17px] font-extrabold text-white">
                  Career direction
                </Text>
                <Text className="mt-2 text-[14px] leading-7 text-[#94A3B8]">
                  {profile.goal}
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Skills */}
          <SectionHeader
            title="Skills"
            subtitle="Capabilities that shape your CV and opportunity matches."
            action={
              <Pressable className="flex-row items-center">
                <Text className="text-[13px] font-extrabold uppercase tracking-[1px] text-[#60A5FA]">
                  Add skill
                </Text>
                <ChevronRight
                  size={15}
                  color="#60A5FA"
                  strokeWidth={2.6}
                  style={{ marginLeft: 4 }}
                />
              </Pressable>
            }
          />

          <GlassCard className="mb-6 px-5 py-5">
            <View className="flex-row flex-wrap">
              {skills.map((item) => (
                <TagChip key={item} label={item} tone="blue" />
              ))}
            </View>
          </GlassCard>

          {/* Interests */}
          <SectionHeader
            title="Interests"
            subtitle="These help Launchpad recommend the right opportunities."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="flex-row flex-wrap">
              {interests.map((item) => (
                <TagChip key={item} label={item} tone="purple" />
              ))}
            </View>
          </GlassCard>

          {/* Quick actions */}
          <SectionHeader
            title="Launchpad quick links"
            subtitle="Move faster across the pages tied to your profile."
          />

          <View className="mb-8 flex-row flex-wrap justify-between">
            <QuickLinkCard
              icon={FileText}
              title="Dynamic CV"
              subtitle="Review your resume built from verified activity."
              accent="#102A63"
              onPress={() => router.push("/(tabs)/cv" as never)}
            />
            <QuickLinkCard
              icon={LayoutGrid}
              title="Roadmap"
              subtitle="See the plan built from your path and progress."
              accent="#31124E"
              onPress={() => router.push("/(tabs)/roadmap" as never)}
            />
            <QuickLinkCard
              icon={Search}
              title="Matches"
              subtitle="Explore opportunities aligned to your profile."
              accent="#0F3B2D"
              onPress={() => router.push("/(tabs)/opportunities" as never)}
            />
            <QuickLinkCard
              icon={Brain}
              title="AI Coach"
              subtitle="Get profile and readiness suggestions."
              accent="#3B1A52"
              onPress={() => router.push("/ai-coach")}
            />
          </View>

          {/* Settings / actions */}
          <SectionHeader
            title="Profile actions"
            subtitle="The main places users expect to manage their account."
          />

          <GlassCard className="mb-8 px-5">
            <SettingsRow
              icon={Bell}
              title="Notifications"
              subtitle="Manage alerts, reminders, and new opportunity updates."
              onPress={() => router.push("/notifications")}
            />

            <SettingsRow
              icon={Brain}
              title="AI Coach"
              subtitle="Open your personalized coach and improvement guidance."
              onPress={() => router.push("/ai-coach")}
            />

            <SettingsRow
              icon={FileText}
              title="Dynamic CV"
              subtitle="Review, improve, and export your profile-driven CV."
              onPress={() => router.push("/(tabs)/cv" as never)}
            />

            <View className="py-4">
              <Pressable className="rounded-[16px] bg-[#2563EB] px-5 py-4">
                <Text className="text-center text-[15px] font-extrabold text-white">
                  Edit profile details
                </Text>
              </Pressable>
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
