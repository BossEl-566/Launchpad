import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  FileText,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react-native";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  onPress: () => void;
};

type ExperienceTrack = {
  id: string;
  title: string;
  subtitle: string;
  impact: string;
  icon: LucideIcon;
  colors: [string, string, ...string[]];
  cta: string;
  onPress: () => void;
};

type SemesterCourse = {
  id: string;
  title: string;
  category: string;
  reason: string;
  status: "Recommended" | "Priority" | "Exploring";
};

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

function QuickActionCard({ item }: { item: QuickAction }) {
  const Icon = item.icon;

  return (
    <Pressable
      onPress={item.onPress}
      className="mr-4 w-[215px] rounded-[24px] border border-white/8 bg-[#101828] px-4 py-4"
    >
      <View
        className="mb-4 h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: item.accent }}
      >
        <Icon size={21} color="#EAF2FF" strokeWidth={2.3} />
      </View>

      <Text className="text-[16px] font-extrabold text-white">
        {item.title}
      </Text>
      <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
        {item.subtitle}
      </Text>

      <View className="mt-4 flex-row items-center">
        <Text className="text-[13px] font-bold text-[#7CB7FF]">Open</Text>
        <ChevronRight
          size={15}
          color="#7CB7FF"
          strokeWidth={2.5}
          style={{ marginLeft: 4 }}
        />
      </View>
    </Pressable>
  );
}

function SemesterCourseCard({ item }: { item: SemesterCourse }) {
  const tone =
    item.status === "Priority"
      ? {
          bg: "#172554",
          text: "#93C5FD",
          border: "rgba(96,165,250,0.22)",
        }
      : item.status === "Recommended"
        ? {
            bg: "#052E2B",
            text: "#5EEAD4",
            border: "rgba(45,212,191,0.18)",
          }
        : {
            bg: "#1E1B4B",
            text: "#C4B5FD",
            border: "rgba(167,139,250,0.18)",
          };

  return (
    <View className="mb-4 rounded-[22px] border border-white/8 bg-[#0F1727] px-4 py-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <View
            className="self-start rounded-full px-3 py-1"
            style={{
              backgroundColor: tone.bg,
              borderWidth: 1,
              borderColor: tone.border,
            }}
          >
            <Text
              className="text-[11px] font-extrabold uppercase tracking-[1px]"
              style={{ color: tone.text }}
            >
              {item.status}
            </Text>
          </View>

          <Text className="mt-3 text-[17px] font-extrabold text-white">
            {item.title}
          </Text>
          <Text className="mt-1 text-[13px] font-semibold text-[#CBD5E1]">
            {item.category}
          </Text>
          <Text className="mt-3 text-[14px] leading-6 text-[#94A3B8]">
            {item.reason}
          </Text>
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#102A63]">
          <BookOpen size={19} color="#93C5FD" strokeWidth={2.3} />
        </View>
      </View>
    </View>
  );
}

function TimelineMilestone({
  title,
  blurb,
  status,
  isLast,
}: {
  title: string;
  blurb: string;
  status: string;
  isLast: boolean;
}) {
  const active = status === "Active";
  const done = status === "Done";

  return (
    <View className="flex-row items-start">
      <View className="mr-4 items-center">
        <View
          className={`h-11 w-11 items-center justify-center rounded-full ${
            done
              ? "bg-emerald-500/15"
              : active
                ? "bg-blue-500/15"
                : "bg-white/5"
          }`}
        >
          {done ? (
            <CircleCheckBig size={18} color="#34D399" strokeWidth={2.4} />
          ) : active ? (
            <Sparkles size={18} color="#60A5FA" strokeWidth={2.4} />
          ) : (
            <Clock3 size={18} color="#94A3B8" strokeWidth={2.4} />
          )}
        </View>
        {!isLast ? <View className="my-1 h-12 w-px bg-white/10" /> : null}
      </View>

      <View className="mb-5 flex-1 rounded-[22px] border border-white/8 bg-[#101828] px-4 py-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-[16px] font-extrabold ${
              done
                ? "text-emerald-300"
                : active
                  ? "text-blue-300"
                  : "text-slate-300"
            }`}
          >
            {title}
          </Text>

          <View
            className={`rounded-full px-3 py-1 ${
              done
                ? "bg-emerald-500/12"
                : active
                  ? "bg-blue-500/12"
                  : "bg-white/5"
            }`}
          >
            <Text
              className={`text-[11px] font-extrabold uppercase tracking-[1px] ${
                done
                  ? "text-emerald-300"
                  : active
                    ? "text-blue-300"
                    : "text-slate-400"
              }`}
            >
              {status}
            </Text>
          </View>
        </View>

        <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
          {blurb}
        </Text>
      </View>
    </View>
  );
}

function ExperienceTrackCard({ item }: { item: ExperienceTrack }) {
  const Icon = item.icon;

  return (
    <LinearGradient
      colors={item.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="mr-4 w-[280px] rounded-[28px] px-5 py-5"
    >
      <View className="absolute right-[-8] top-[-10] h-28 w-28 rounded-full bg-white/10" />

      <View className="flex-row items-center justify-between">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
          <Icon size={21} color="#FFFFFF" strokeWidth={2.4} />
        </View>

        <View className="rounded-full bg-white/15 px-3 py-1">
          <Text className="text-[11px] font-bold uppercase tracking-[1px] text-white">
            Career booster
          </Text>
        </View>
      </View>

      <Text className="mt-5 text-[20px] font-extrabold text-white">
        {item.title}
      </Text>
      <Text className="mt-2 text-[14px] leading-6 text-white/90">
        {item.subtitle}
      </Text>

      <View className="mt-4 self-start rounded-full bg-white/15 px-3 py-1.5">
        <Text className="text-[12px] font-bold text-white">{item.impact}</Text>
      </View>

      <Pressable
        onPress={item.onPress}
        className="mt-5 flex-row items-center self-start rounded-[16px] bg-white px-4 py-3"
      >
        <Text className="text-[14px] font-extrabold text-[#111827]">
          {item.cta}
        </Text>
        <ArrowRight
          size={15}
          color="#111827"
          strokeWidth={2.5}
          style={{ marginLeft: 6 }}
        />
      </Pressable>
    </LinearGradient>
  );
}

function HeroMiniStat({
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
    <View className="mb-3 rounded-[22px] border border-white/8 bg-[#11192B] px-4 py-4">
      <View
        className="mb-3 h-10 w-10 items-center justify-center rounded-2xl"
        style={{ backgroundColor: accent }}
      >
        <Icon size={18} color="#EAF2FF" strokeWidth={2.3} />
      </View>

      <Text className="text-[12px] font-semibold uppercase tracking-[1px] text-[#8D97A9]">
        {label}
      </Text>
      <Text className="mt-1 text-[22px] font-extrabold text-white">
        {value}
      </Text>
    </View>
  );
}

export default function RoadmapScreen() {
  const { profile, milestones, electiveSuggestions } = useLaunchpad();

  const degreeProgress = 77;
  const pathConfidence = 91;
  const unlockedMatches = 26;
  const verifiedExperience = 12;

  const semesterPlan: SemesterCourse[] = useMemo(() => {
    if (electiveSuggestions?.length) {
      return electiveSuggestions.slice(0, 3).map((item, index) => ({
        id: item.id,
        title: item.title,
        category:
          index === 0
            ? "AI elective"
            : index === 1
              ? "Career-support elective"
              : "Growth elective",
        reason: item.reason,
        status:
          index === 0 ? "Priority" : index === 1 ? "Recommended" : "Exploring",
      }));
    }

    return [
      {
        id: "fallback-1",
        title: "Human Computer Interaction",
        category: "AI elective",
        reason:
          "Strengthens product thinking, usability skills, and research direction for your target path.",
        status: "Priority",
      },
      {
        id: "fallback-2",
        title: "Behavioral Psychology",
        category: "Career-support elective",
        reason:
          "Improves user understanding for product, design, and experience-focused roles.",
        status: "Recommended",
      },
      {
        id: "fallback-3",
        title: "Data Visualization",
        category: "Growth elective",
        reason:
          "Helps you present insights better in research, internships, and portfolio projects.",
        status: "Exploring",
      },
    ];
  }, [electiveSuggestions]);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Add course",
      subtitle: "Track a new course or elective in your academic path.",
      icon: Plus,
      accent: "#102A63",
      onPress: () => {},
    },
    {
      id: "2",
      title: "Update career goal",
      subtitle: "Adjust your target role so AI recommendations stay relevant.",
      icon: Target,
      accent: "#31124E",
      onPress: () => {},
    },
    {
      id: "3",
      title: "Add experience",
      subtitle: "Log research, internships, volunteer work, or projects.",
      icon: BriefcaseBusiness,
      accent: "#0F3B2D",
      onPress: () => {},
    },
    {
      id: "4",
      title: "Refresh opportunity path",
      subtitle: "Recalculate your strongest next opportunities and matches.",
      icon: RefreshCw,
      accent: "#3B1A52",
      onPress: () => router.push("/(tabs)/opportunities" as never),
    },
  ];

  const experienceTracks: ExperienceTrack[] = [
    {
      id: "1",
      title: "Internship track",
      subtitle:
        "Prioritize short practical roles that convert your current coursework into verified experience.",
      impact: "Boosts employability and CV strength",
      icon: BriefcaseBusiness,
      colors: ["#2563EB", "#1D4ED8", "#1E3A8A"],
      cta: "Explore roles",
      onPress: () => router.push("/(tabs)/opportunities" as never),
    },
    {
      id: "2",
      title: "Research track",
      subtitle:
        "Build academic depth with lab, assistantship, and faculty-backed project opportunities.",
      impact: "Unlocks research and scholarship fit",
      icon: Microscope,
      colors: ["#0F766E", "#0D9488", "#115E59"],
      cta: "Find research",
      onPress: () => router.push("/(tabs)/opportunities" as never),
    },
    {
      id: "3",
      title: "Volunteer track",
      subtitle:
        "Add real-world community contribution that can be verified and reflected in your CV.",
      impact: "Improves profile trust and social proof",
      icon: HeartHandshake,
      colors: ["#BE185D", "#DB2777", "#9D174D"],
      cta: "See impact roles",
      onPress: () => router.push("/(tabs)/opportunities" as never),
    },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <Pressable
          onPress={() => {}}
          className="absolute bottom-7 right-5 flex-row items-center rounded-full bg-[#2563EB] px-5 py-4"
          style={{
            shadowColor: "#2563EB",
            shadowOpacity: 0.28,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 8 },
            elevation: 10,
          }}
        >
          <Plus size={18} color="#FFFFFF" strokeWidth={2.8} />
          <Text className="ml-2 text-[14px] font-extrabold text-white">
            Add course
          </Text>
        </Pressable>
        <View className="absolute left-[-50] top-[-20] h-56 w-56 rounded-full bg-[#2563EB]/20" />
        <View className="absolute right-[-30] top-24 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[620] h-40 w-40 rounded-full bg-[#0EA5E9]/8" />

        <View className="px-5 pt-3">
          {/* Hero / Control Header */}
          <LinearGradient
            colors={["#0E1728", "#0D1A36", "#091120"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="mb-8 overflow-hidden rounded-[32px] border border-white/10 px-5 py-5"
          >
            <View className="absolute right-[-18] top-[-12] h-40 w-40 rounded-full bg-[#2563EB]/15" />
            <View className="absolute bottom-[-24] left-[-12] h-28 w-28 rounded-full bg-[#7C3AED]/10" />
            <View className="absolute right-10 bottom-10 h-20 w-20 rounded-full bg-[#0EA5E9]/10" />

            {/* top row */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
                <Brain size={14} color="#60A5FA" strokeWidth={2.4} />
                <Text className="ml-2 text-[12px] font-bold uppercase tracking-[1.5px] text-[#93C5FD]">
                  ROADMAP HUB
                </Text>
              </View>

              <Pressable
                onPress={() => router.push("/(tabs)/cv" as never)}
                className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
              >
                <FileText size={18} color="#C7D2FE" strokeWidth={2.3} />
              </Pressable>
            </View>

            {/* heading */}
            <View className="mt-4">
              <Text className="text-[30px] font-extrabold tracking-tight text-white">
                Build your path with clarity
              </Text>

              <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
                Plan courses, track progress, and grow verified experience that
                moves you from admission to opportunity.
              </Text>
            </View>

            {/* quick chips */}
            <View className="mt-5 flex-row flex-wrap">
              <Pressable className="mr-3 mb-3 flex-row items-center rounded-full bg-[#2563EB] px-4 py-3">
                <Plus size={15} color="#FFFFFF" strokeWidth={2.6} />
                <Text className="ml-2 text-[13px] font-extrabold text-white">
                  Add course
                </Text>
              </Pressable>

              <Pressable className="mr-3 mb-3 flex-row items-center rounded-full border border-white/10 bg-white/5 px-4 py-3">
                <Target size={15} color="#C7D2FE" strokeWidth={2.4} />
                <Text className="ml-2 text-[13px] font-bold text-[#E2E8F0]">
                  Update goal
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(tabs)/opportunities" as never)}
                className="mb-3 flex-row items-center rounded-full border border-white/10 bg-white/5 px-4 py-3"
              >
                <ArrowRight size={15} color="#93C5FD" strokeWidth={2.4} />
                <Text className="ml-2 text-[13px] font-bold text-[#E2E8F0]">
                  Open matches
                </Text>
              </Pressable>
            </View>

            {/* main dashboard area */}
            <View className="mt-2 flex-row">
              {/* main card */}
              <View className="mr-3 flex-1 rounded-[28px] border border-white/10 bg-[#0C1528] px-4 py-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#60A5FA]">
                      Target direction
                    </Text>

                    <Text className="mt-2 text-[22px] font-extrabold text-white">
                      {profile.goal}
                    </Text>

                    <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
                      Stay focused on the right courses, verified activities,
                      and opportunities that strengthen your career path.
                    </Text>
                  </View>

                  <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#102A63]">
                    <Sparkles size={20} color="#93C5FD" strokeWidth={2.4} />
                  </View>
                </View>

                <View className="mt-5">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-[13px] font-semibold text-[#94A3B8]">
                      Readiness progress
                    </Text>
                    <Text className="text-[13px] font-extrabold text-[#93C5FD]">
                      {pathConfidence}%
                    </Text>
                  </View>

                  <View className="h-3 overflow-hidden rounded-full bg-white/8">
                    <View
                      className="h-3 rounded-full bg-[#2563EB]"
                      style={{ width: `${pathConfidence}%` }}
                    />
                  </View>
                </View>

                <View className="mt-5 rounded-[20px] border border-white/8 bg-white/5 px-4 py-4">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-[12px] font-bold uppercase tracking-[1px] text-[#60A5FA]">
                        AI next step
                      </Text>
                      <Text className="mt-2 text-[15px] font-extrabold text-white">
                        Add one course this semester
                      </Text>
                      <Text className="mt-1 text-[13px] leading-6 text-[#94A3B8]">
                        A stronger academic trail improves recommendations for
                        internships, research, and scholarships.
                      </Text>
                    </View>

                    <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3B2D]">
                      <BookOpen size={18} color="#5EEAD4" strokeWidth={2.3} />
                    </View>
                  </View>
                </View>
              </View>

              {/* right mini stats */}
              <View className="w-[34%]">
                <HeroMiniStat
                  icon={GraduationCap}
                  label="Progress"
                  value={`${degreeProgress}%`}
                  accent="#102A63"
                />

                <HeroMiniStat
                  icon={Target}
                  label="Matches"
                  value={`${unlockedMatches}`}
                  accent="#31124E"
                />

                <HeroMiniStat
                  icon={CircleCheckBig}
                  label="Verified"
                  value={`${verifiedExperience}`}
                  accent="#0F3B2D"
                />
              </View>
            </View>
          </LinearGradient>
          {/* Key metrics */}
          <View className="mb-6 flex-row flex-wrap justify-between">
            <MetricTile
              icon={GraduationCap}
              label="Degree progress"
              value={`${degreeProgress}%`}
              accent="#102A63"
            />
            <MetricTile
              icon={TrendingUp}
              label="Path confidence"
              value={`${pathConfidence}%`}
              accent="#1E1B4B"
            />
            <MetricTile
              icon={CircleCheckBig}
              label="Verified experience"
              value={`${verifiedExperience}`}
              accent="#0F3B2D"
            />
            <MetricTile
              icon={Target}
              label="Unlocked matches"
              value={`${unlockedMatches}`}
              accent="#3B1A52"
            />
          </View>

          {/* Quick Actions */}
          <SectionHeader
            title="Planner shortcuts"
            subtitle="The actions students need most often on a roadmap page."
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {quickActions.map((item) => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Semester plan */}
          <SectionHeader
            title="This semester plan"
            subtitle="AI-guided courses and electives supporting your target path."
            action={
              <Pressable className="flex-row items-center rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Plus size={14} color="#60A5FA" strokeWidth={2.5} />
                <Text className="ml-2 text-[12px] font-bold uppercase tracking-[1px] text-[#60A5FA]">
                  Add course
                </Text>
              </Pressable>
            }
          />

          <GlassCard className="mb-8 px-5 py-5">
            {semesterPlan.map((item) => (
              <SemesterCourseCard key={item.id} item={item} />
            ))}

            <LinearGradient
              colors={["#0A1224", "#0E1830"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="mt-2 rounded-[24px] border border-white/8 px-4 py-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="mr-4 flex-1 flex-row items-center">
                  <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-[#102A63]">
                    <BookOpen size={22} color="#7CB7FF" strokeWidth={2.3} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-extrabold text-white">
                      Semester load balance
                    </Text>
                    <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                      Keep one core academic course, one growth elective, and
                      one experience-building activity in motion.
                    </Text>
                  </View>
                </View>

                <Pressable className="rounded-[14px] bg-[#2563EB] px-4 py-3">
                  <Text className="text-[14px] font-extrabold text-white">
                    Plan
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>
          </GlassCard>

          {/* Milestones */}
          <SectionHeader
            title="Milestone timeline"
            subtitle="The progression from student builder to strong candidate."
          />

          <GlassCard className="mb-8 px-5 py-5">
            {milestones.map((item, index) => (
              <TimelineMilestone
                key={item.id}
                title={item.title}
                blurb={item.blurb}
                status={item.status}
                isLast={index === milestones.length - 1}
              />
            ))}
          </GlassCard>

          {/* Experience tracks */}
          <SectionHeader
            title="Experience builders"
            subtitle="The fastest ways to unlock a stronger professional profile."
            action={
              <Pressable
                onPress={() => router.push("/(tabs)/opportunities" as never)}
                className="flex-row items-center"
              >
                <Text className="text-[13px] font-extrabold uppercase tracking-[1px] text-[#60A5FA]">
                  View all
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {experienceTracks.map((item) => (
              <ExperienceTrackCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Elective AI */}
          <SectionHeader
            title="Elective intelligence"
            subtitle="Why these learning choices improve your roadmap."
          />

          <GlassCard className="mb-8 px-5 py-5">
            {semesterPlan.map((item, index) => (
              <View
                key={`ai-${item.id}`}
                className={`${
                  index !== semesterPlan.length - 1
                    ? "mb-4 border-b border-white/6 pb-4"
                    : ""
                }`}
              >
                <View className="flex-row items-start">
                  <View className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#0F235B]">
                    <Brain size={19} color="#93C5FD" strokeWidth={2.3} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-extrabold text-white">
                      {item.title}
                    </Text>
                    <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
                      {item.reason}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </GlassCard>

          {/* CV unlock */}
          <SectionHeader
            title="CV & employability unlocks"
            subtitle="What this roadmap is trying to produce by graduation."
          />

          <GlassCard className="mb-8 px-5 py-5">
            {[
              "A balanced academic record tied to your target direction.",
              "Verified internship, volunteer, research, or project evidence.",
              "A stronger CV that can update automatically when activities are approved.",
              "Better AI matching for internships, scholarships, and jobs.",
              "Higher confidence and readiness before national service or employment.",
            ].map((item, index) => (
              <View
                key={item}
                className={`flex-row items-start ${
                  index !== 4 ? "mb-4 border-b border-white/6 pb-4" : ""
                }`}
              >
                <View className="mr-4 mt-1 h-8 w-8 items-center justify-center rounded-full bg-blue-500/12">
                  <CircleCheckBig size={16} color="#60A5FA" strokeWidth={2.4} />
                </View>

                <Text className="flex-1 text-[14px] leading-7 text-[#A8B3C7]">
                  {item}
                </Text>
              </View>
            ))}

            <LinearGradient
              colors={["#0A1224", "#0E1830"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="mt-4 rounded-[24px] border border-white/8 px-4 py-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="mr-4 flex-1 flex-row items-center">
                  <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-[#102A63]">
                    <FileText size={22} color="#7CB7FF" strokeWidth={2.3} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-extrabold text-white">
                      Auto-update CV
                    </Text>
                    <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                      When an activity is verified, Launchpad can recommend
                      adding it directly to your CV profile.
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push("/(tabs)/cv" as never)}
                  className="rounded-[14px] bg-[#2563EB] px-4 py-3"
                >
                  <Text className="text-[14px] font-extrabold text-white">
                    Open CV
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>
          </GlassCard>

          {/* Support system */}
          <SectionHeader
            title="Keep the roadmap alive"
            subtitle="Use people, opportunities, and profile updates to keep this plan accurate."
          />

          <View className="mb-4 flex-row flex-wrap justify-between">
            <Pressable
              onPress={() => router.push("/(tabs)/opportunities" as never)}
              className="mb-3 w-[48.5%] rounded-[22px] border border-white/8 bg-[#11192B] px-4 py-4"
            >
              <View className="mb-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#102A63]">
                <Search size={20} color="#E5F0FF" strokeWidth={2.3} />
              </View>
              <Text className="text-[16px] font-extrabold text-white">
                Explore matches
              </Text>
              <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
                See internships, research, scholarships, and jobs linked to your
                path.
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(tabs)/profile" as never)}
              className="mb-3 w-[48.5%] rounded-[22px] border border-white/8 bg-[#11192B] px-4 py-4"
            >
              <View className="mb-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#31124E]">
                <Users size={20} color="#E5F0FF" strokeWidth={2.3} />
              </View>
              <Text className="text-[16px] font-extrabold text-white">
                Update profile
              </Text>
              <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
                Keep your skills, interests, and goals current so the roadmap
                stays smart.
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
