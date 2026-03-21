import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Brain,
  ChevronRight,
  CircleCheckBig,
  Download,
  FileText,
  GraduationCap,
  PencilLine,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react-native";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityCard } from "../../src/components/cards/ActivityCard";
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

function MetricTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: any;
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

function SkillChip({ label }: { label: string }) {
  return (
    <View className="mb-3 mr-3 rounded-[14px] border border-[#1D4ED8]/30 bg-[#101B38] px-4 py-2.5">
      <Text className="text-[14px] font-semibold text-[#7CB7FF]">{label}</Text>
    </View>
  );
}

function SuggestionItem({ text }: { text: string }) {
  return (
    <View className="mb-3 flex-row items-start">
      <View className="mr-3 mt-1 h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
      <Text className="flex-1 text-[14px] leading-7 text-[#A8B3C7]">
        {text}
      </Text>
    </View>
  );
}

export default function CvScreen() {
  const { profile, activities } = useLaunchpad();

  const skills = profile?.skills ?? [];
  const verifiedEntries = activities?.length ?? 0;

  const cvReadiness = useMemo(() => {
    const base = 62;
    const skillBoost = Math.min(skills.length * 3, 18);
    const activityBoost = Math.min(verifiedEntries * 4, 20);
    return Math.min(base + skillBoost + activityBoost, 96);
  }, [skills.length, verifiedEntries]);

  const aiSuggestions = useMemo(() => {
    const suggestions: string[] = [];

    suggestions.push(
      "Add quantified results to 2 experience bullets so recruiters can see impact faster.",
    );

    if (verifiedEntries < 3) {
      suggestions.push(
        "Complete or verify one more internship, volunteer, or research activity to strengthen your experience section.",
      );
    }

    if (skills.length < 6) {
      suggestions.push(
        "Expand your skill stack with 2 more relevant tools or soft skills linked to your target role.",
      );
    }

    suggestions.push(
      "Keep your profile summary focused on strengths, direction, and the value you can create immediately.",
    );

    return suggestions.slice(0, 4);
  }, [skills.length, verifiedEntries]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View className="absolute left-[-50] top-[-20] h-56 w-56 rounded-full bg-[#2563EB]/20" />
        <View className="absolute right-[-30] top-24 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[520] h-40 w-40 rounded-full bg-[#0EA5E9]/8" />

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

            <View className="mb-4 flex-row items-center self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
              <Brain size={14} color="#60A5FA" strokeWidth={2.4} />
              <Text className="ml-2 text-[12px] font-bold uppercase tracking-[1.5px] text-[#93C5FD]">
                DYNAMIC CV INTELLIGENCE
              </Text>
            </View>

            <Text className="text-[30px] font-extrabold tracking-tight text-white">
              {profile.name}
            </Text>

            <Text className="mt-2 text-[16px] font-semibold text-[#93C5FD]">
              {profile.goal}
            </Text>

            <Text className="mt-4 text-[15px] leading-7 text-[#A8B3C7]">
              {profile.summary}
            </Text>

            <View className="mt-5 flex-row">
              <Pressable
                onPress={() => router.push("/(tabs)/profile")}
                className="mr-3 flex-row items-center rounded-[16px] bg-[#2563EB] px-5 py-3.5"
              >
                <PencilLine size={16} color="#FFFFFF" strokeWidth={2.4} />
                <Text className="ml-2 text-[15px] font-extrabold text-white">
                  Edit profile
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(tabs)/roadmap")}
                className="flex-row items-center rounded-[16px] border border-white/10 bg-white/5 px-5 py-3.5"
              >
                <Target size={16} color="#C7D2FE" strokeWidth={2.3} />
                <Text className="ml-2 text-[15px] font-bold text-[#E2E8F0]">
                  Roadmap
                </Text>
              </Pressable>
            </View>
          </LinearGradient>

          {/* Snapshot */}
          <SectionHeader
            title="CV snapshot"
            subtitle="What recruiters and opportunities will notice first."
          />

          <View className="mb-6 flex-row flex-wrap justify-between">
            <MetricTile
              icon={FileText}
              label="CV readiness"
              value={`${cvReadiness}%`}
              accent="#102A63"
            />
            <MetricTile
              icon={CircleCheckBig}
              label="Verified entries"
              value={`${verifiedEntries}`}
              accent="#0F3B2D"
            />
            <MetricTile
              icon={Sparkles}
              label="Core skills"
              value={`${skills.length}`}
              accent="#31124E"
            />
            <MetricTile
              icon={TrendingUp}
              label="Career strength"
              value={
                cvReadiness >= 90
                  ? "Strong"
                  : cvReadiness >= 80
                    ? "Good"
                    : "Growing"
              }
              accent="#3B1A52"
            />
          </View>

          {/* AI coach */}
          <SectionHeader
            title="AI CV coach"
            subtitle="Practical changes that improve your profile quality."
            action={
              <Pressable className="flex-row items-center rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Sparkles size={14} color="#60A5FA" strokeWidth={2.4} />
                <Text className="ml-2 text-[12px] font-bold uppercase tracking-[1px] text-[#60A5FA]">
                  Refresh
                </Text>
              </Pressable>
            }
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="mb-4 flex-row items-center">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#0F235B]">
                <Brain size={20} color="#93C5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text className="text-[17px] font-extrabold text-white">
                  Current improvement focus
                </Text>
                <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                  Make your experience more measurable and keep verified proof
                  flowing in.
                </Text>
              </View>
            </View>

            {aiSuggestions.map((item) => (
              <SuggestionItem key={item} text={item} />
            ))}
          </GlassCard>

          {/* Profile section */}
          <SectionHeader
            title="Professional identity"
            subtitle="The core profile that powers your dynamic CV."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="mb-4 flex-row items-center">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#102A63]">
                <UserRound size={20} color="#93C5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text className="text-[17px] font-extrabold text-white">
                  Summary
                </Text>
                <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                  This is the recruiter-facing introduction generated from your
                  profile.
                </Text>
              </View>
            </View>

            <Text className="text-[15px] leading-7 text-[#CBD5E1]">
              {profile.summary}
            </Text>

            <View className="mt-6 flex-row flex-wrap">
              {skills.map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </View>
          </GlassCard>

          {/* Education + direction */}
          <SectionHeader
            title="Academic direction"
            subtitle="Where your education is pointing and how it supports your CV."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="flex-row items-start">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#1E1B4B]">
                <GraduationCap size={20} color="#C4B5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text className="text-[17px] font-extrabold text-white">
                  Target role / path
                </Text>
                <Text className="mt-2 text-[15px] font-semibold text-[#C7D2FE]">
                  {profile.goal}
                </Text>
                <Text className="mt-3 text-[14px] leading-7 text-[#94A3B8]">
                  Launchpad uses this direction to recommend electives,
                  internships, research roles, volunteering, and other verified
                  experiences that can strengthen your CV over time.
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Experience feed */}
          <SectionHeader
            title="Verified experience feed"
            subtitle="Every approved activity can become a clean CV entry."
            action={
              <Pressable
                onPress={() => router.push("/(tabs)/opportunities")}
                className="flex-row items-center"
              >
                <Text className="text-[13px] font-extrabold uppercase tracking-[1px] text-[#60A5FA]">
                  Add more
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

          {activities.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}

          {/* Export and automation */}
          <SectionHeader
            title="CV actions"
            subtitle="Keep this connected to editing, exporting, and AI-assisted updating."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <LinearGradient
              colors={["#0A1224", "#0E1830"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[24px] border border-white/8 px-4 py-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="mr-4 flex-1 flex-row items-center">
                  <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-[#102A63]">
                    <Download size={22} color="#7CB7FF" strokeWidth={2.3} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-extrabold text-white">
                      Export CV
                    </Text>
                    <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                      Keep this wired to your backend PDF export or share flow
                      when ready.
                    </Text>
                  </View>
                </View>

                <Pressable className="rounded-[14px] bg-[#2563EB] px-4 py-3">
                  <Text className="text-[14px] font-extrabold text-white">
                    Export
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>

            <View className="mt-4 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4">
              <View className="flex-row items-center justify-between">
                <View className="mr-4 flex-1 flex-row items-center">
                  <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-[#31124E]">
                    <Brain size={22} color="#C4B5FD" strokeWidth={2.3} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-extrabold text-white">
                      Auto-update from verified activity
                    </Text>
                    <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                      When activities get approved, Launchpad can suggest adding
                      them directly into your CV structure.
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push("/(tabs)/roadmap")}
                  className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-3"
                >
                  <Text className="text-[14px] font-extrabold text-[#E2E8F0]">
                    Review
                  </Text>
                </Pressable>
              </View>
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
