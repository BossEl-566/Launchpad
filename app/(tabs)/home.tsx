import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Brain,
  BriefcaseBusiness,
  CircleCheckBig,
  FileText,
  GraduationCap,
  Microscope,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Users
} from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

type MatchCardType = {
  id: string;
  type: "Internship" | "Scholarship" | "Research" | "Volunteer";
  title: string;
  subtitle: string;
  meta: string;
  colors: [string, string, ...string[]];
  icon: LucideIcon;
  cta: string;
  route: string;
};

type FeedItemType = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const matchCards: MatchCardType[] = [
  {
    id: "1",
    type: "Internship",
    title: "UX Research Intern",
    subtitle: "Google • Summer 2024",
    meta: "98% profile fit",
    colors: ["#2563EB", "#1D4ED8", "#1E3A8A"],
    icon: BriefcaseBusiness,
    cta: "Apply",
    route: "/(tabs)/opportunities",
  },
  {
    id: "2",
    type: "Scholarship",
    title: "Exchange Mobility Grant",
    subtitle: "EU partner schools",
    meta: "Deadline in 8 days",
    colors: ["#7C3AED", "#6D28D9", "#4C1D95"],
    icon: GraduationCap,
    cta: "Review",
    route: "/(tabs)/opportunities",
  },
  {
    id: "3",
    type: "Research",
    title: "HCI Research Assistant",
    subtitle: "Design Lab • Semester role",
    meta: "Recommended by lecturers",
    colors: ["#0F766E", "#0D9488", "#115E59"],
    icon: Microscope,
    cta: "View",
    route: "/(tabs)/opportunities",
  },
];

const activityFeed: FeedItemType[] = [
  {
    id: "1",
    title: "Volunteer work verified",
    subtitle: "Community Tech Center confirmed your 20 hours.",
    time: "2 HOURS AGO",
    icon: BadgeCheck,
    iconBg: "#102A63",
    iconColor: "#60A5FA",
  },
  {
    id: "2",
    title: "New course-mate connection",
    subtitle: "Sarah from City Uni (CS) started following you.",
    time: "YESTERDAY",
    icon: UserPlus,
    iconBg: "#31124E",
    iconColor: "#C084FC",
  },
];

const skills = [
  "Product Design",
  "Python",
  "Data Viz",
  "Academic Writing",
  "Research Methods",
  "Public Speaking",
];

const peers = [
  {
    id: "1",
    name: "Sarah",
    school: "City Uni",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "David",
    school: "KNUST",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Ama",
    school: "UCC",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
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
        resizeMode="cover"
        className="h-11 w-11 rounded-full border border-white/15"
      />
    );
  }

  return (
    <View className="h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#111827]">
      <Text className="text-sm font-bold text-white">{initials || "A"}</Text>
    </View>
  );
}

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

function MatchCard({ item }: { item: MatchCardType }) {
  const Icon = item.icon;

  return (
    <LinearGradient
      colors={item.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: 290, borderRadius: 28, padding: 20, marginRight: 16 }}
    >
      <View className="absolute right-[-8] top-[-12] h-28 w-28 rounded-full bg-white/10" />
      <View className="self-start rounded-full bg-white/15 px-3 py-1.5">
        <Text className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-white">
          {item.type}
        </Text>
      </View>

      <View className="mt-5 flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[22px] font-extrabold leading-7 text-white">
            {item.title}
          </Text>
          <Text className="mt-2 text-[15px] text-white/90">
            {item.subtitle}
          </Text>
          <Text className="mt-2 text-[13px] font-semibold text-white/75">
            {item.meta}
          </Text>
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
          <Icon size={20} color="#FFFFFF" strokeWidth={2.3} />
        </View>
      </View>

      <Pressable
        onPress={() => router.push(item.route as never)}
        className="mt-6 flex-row items-center self-start rounded-[16px] bg-white px-5 py-3.5"
      >
        <Text className="text-[15px] font-extrabold text-[#111827]">
          {item.cta}
        </Text>
        <ArrowRight
          size={16}
          color="#111827"
          strokeWidth={2.5}
          style={{ marginLeft: 6 }}
        />
      </Pressable>
    </LinearGradient>
  );
}

function FeedCard({ item }: { item: FeedItemType }) {
  const Icon = item.icon;

  return (
    <GlassCard className="mb-4 px-4 py-4">
      <View className="flex-row">
        <View
          className="mr-4 h-12 w-12 items-center justify-center rounded-[16px]"
          style={{ backgroundColor: item.iconBg }}
        >
          <Icon size={20} color={item.iconColor} strokeWidth={2.3} />
        </View>

        <View className="flex-1">
          <Text className="text-[16px] font-bold text-white">{item.title}</Text>
          <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
            {item.subtitle}
          </Text>
          <Text className="mt-3 text-[12px] font-bold tracking-[1px] text-[#64748B]">
            {item.time}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

export default function HomeScreen() {
  const { profile } = useLaunchpad();

  const firstName = profile?.name?.split(" ")[0] || "Alex";

  const profileCompletion = 84;
  const degreeProgress = 77;
  const employability = 91;
  const verifiedActivities = 12;
  const liveMatches = 26;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* Background glows */}
        <View className="absolute left-[-50] top-[-20] h-56 w-56 rounded-full bg-[#2563EB]/20" />
        <View className="absolute right-[-30] top-24 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[520] h-40 w-40 rounded-full bg-[#0EA5E9]/8" />

        {/* Header */}
        <View className="px-5 pb-3 pt-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <LinearGradient
                colors={["#3B82F6", "#2563EB", "#1E40AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="mr-3 h-11 w-11 items-center justify-center rounded-2xl"
              >
                <Sparkles size={18} color="#FFFFFF" strokeWidth={2.4} />
              </LinearGradient>

              <View>
                <Text className="text-[13px] font-bold uppercase tracking-[2px] text-[#60A5FA]">
                  Launchpad
                </Text>
                <Text className="mt-0.5 text-[17px] font-extrabold text-white">
                  Student Career OS
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.push("/notifications")}
                className="mr-3"
              >
                <View className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Bell size={19} color="#E2E8F0" strokeWidth={2.2} />
                  <View className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#FB7185]" />
                </View>
              </Pressable>

              <AvatarBubble
                name={profile?.name || "Alex Doe"}
                uri={profile?.avatar}
              />
            </View>
          </View>
        </View>

        <View className="px-5 pt-2">
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
                NEXT BEST MOVE
              </Text>
            </View>

            <Text className="text-[31px] font-extrabold tracking-tight text-white">
              Hi, {firstName} 👋
            </Text>

            <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
              Your profile is trending well. Launchpad recommends completing one
              research-backed elective and applying to 2 high-fit internships
              this week.
            </Text>

            <GlassCard className="mt-5 px-4 py-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#60A5FA]">
                    AI Recommendation
                  </Text>
                  <Text className="mt-2 text-[18px] font-extrabold text-white">
                    Add a verified research or volunteer activity to unlock
                    stronger scholarship and internship matches.
                  </Text>
                </View>

                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#0F235B]">
                  <Sparkles size={20} color="#93C5FD" strokeWidth={2.4} />
                </View>
              </View>
            </GlassCard>

            <View className="mt-5 flex-row items-center">
              <Pressable
                onPress={() => router.push("/(tabs)/roadmap")}
                className="mr-3 flex-row items-center rounded-[16px] bg-[#2563EB] px-5 py-3.5"
              >
                <Text className="text-[15px] font-extrabold text-white">
                  Open roadmap
                </Text>
                <ArrowRight
                  size={16}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                  style={{ marginLeft: 6 }}
                />
              </Pressable>

              <Pressable
                onPress={() => router.push("/(tabs)/opportunities")}
                className="flex-row items-center rounded-[16px] border border-white/10 bg-white/5 px-5 py-3.5"
              >
                <Search size={16} color="#C7D2FE" strokeWidth={2.3} />
                <Text className="ml-2 text-[15px] font-bold text-[#E2E8F0]">
                  Explore matches
                </Text>
              </Pressable>
            </View>
          </LinearGradient>

          {/* Metrics */}
          <SectionHeader
            title="Your Snapshot"
            subtitle="The numbers that matter most for academic and career momentum."
          />

          <View className="mb-6 flex-row flex-wrap justify-between">
            <MetricTile
              icon={GraduationCap}
              label="Degree Progress"
              value={`${degreeProgress}%`}
              accent="#102A63"
            />
            <MetricTile
              icon={TrendingUp}
              label="Career Readiness"
              value={`${employability}%`}
              accent="#1E1B4B"
            />
            <MetricTile
              icon={CircleCheckBig}
              label="Verified Activities"
              value={`${verifiedActivities}`}
              accent="#0F3B2D"
            />
            <MetricTile
              icon={Target}
              label="Live Matches"
              value={`${liveMatches}`}
              accent="#3B1A52"
            />
          </View>

          {/* Progress rail */}
          <GlassCard className="mb-8 px-5 py-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[18px] font-extrabold text-white">
                  Profile completion
                </Text>
                <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                  Complete your portfolio links and supervisor verifications to
                  improve match quality.
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
                Profile verified
              </Text>
              <Text className="text-[14px] font-extrabold text-white">
                {profileCompletion}%
              </Text>
            </View>
          </GlassCard>

          {/* Opportunities */}
          <SectionHeader
            title="High-fit opportunities"
            subtitle="Recommended for your course, profile, and recent activity."
            action={
              <Pressable className="flex-row items-center rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <RefreshCw size={14} color="#60A5FA" strokeWidth={2.4} />
                <Text className="ml-2 text-[12px] font-bold uppercase tracking-[1px] text-[#60A5FA]">
                  Refresh
                </Text>
              </Pressable>
            }
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {matchCards.map((item) => (
              <MatchCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Skills + CV */}
          <SectionHeader
            title="Strengths & CV autopilot"
            subtitle="What Launchpad already sees, and what it can update for you."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="flex-row flex-wrap">
              {skills.map((skill, index) => (
                <View
                  key={skill}
                  className={`mb-3 mr-3 rounded-[14px] px-4 py-2.5 ${
                    index < 4
                      ? "border border-[#1D4ED8]/30 bg-[#101B38]"
                      : "border border-dashed border-white/20 bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-[14px] font-semibold ${
                      index < 4 ? "text-[#7CB7FF]" : "text-[#94A3B8]"
                    }`}
                  >
                    {skill}
                  </Text>
                </View>
              ))}
            </View>

            <LinearGradient
              colors={["#0A1224", "#0E1830"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="mt-3 rounded-[24px] border border-white/8 px-4 py-4"
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
                      2 newly verified activities are ready to be added to your
                      CV.
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push("/(tabs)/cv")}
                  className="rounded-[14px] bg-[#2563EB] px-4 py-3"
                >
                  <Text className="text-[14px] font-extrabold text-white">
                    Update
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>
          </GlassCard>

          {/* Network block */}
          <SectionHeader
            title="People on your path"
            subtitle="Students in other universities doing the same course."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#0F235B]">
                  <Users size={20} color="#93C5FD" strokeWidth={2.3} />
                </View>
                <View>
                  <Text className="text-[16px] font-extrabold text-white">
                    Cross-campus network
                  </Text>
                  <Text className="mt-1 text-[13px] text-[#94A3B8]">
                    Connect, compare progress, and discover shared
                    opportunities.
                  </Text>
                </View>
              </View>
            </View>

            {peers.map((peer, index) => (
              <View
                key={peer.id}
                className={`flex-row items-center justify-between ${
                  index !== peers.length - 1
                    ? "mb-4 border-b border-white/6 pb-4"
                    : ""
                }`}
              >
                <View className="mr-4 flex-1 flex-row items-center">
                  <Image
                    source={{ uri: peer.avatar }}
                    className="mr-3 h-11 w-11 rounded-full"
                  />
                  <View className="flex-1">
                    <Text className="text-[15px] font-bold text-white">
                      {peer.name}
                    </Text>
                    <Text className="mt-0.5 text-[13px] text-[#94A3B8]">
                      {peer.school} • {peer.course}
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push("/(tabs)/profile")}
                  className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-2.5"
                >
                  <Text className="text-[13px] font-bold text-[#E2E8F0]">
                    Connect
                  </Text>
                </Pressable>
              </View>
            ))}
          </GlassCard>

          {/* Feed */}
          <SectionHeader
            title="Recent activity"
            subtitle="Verified and social updates affecting your profile strength."
          />

          {activityFeed.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
