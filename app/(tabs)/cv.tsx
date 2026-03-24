import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Brain,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  Download,
  FileText,
  PencilLine,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react-native";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

const fonts = {
  regular: "Roboto_400Regular",
  medium: "Roboto_500Medium",
  bold: "Roboto_700Bold",
} as const;

function fontStyle(weight: "400" | "500" | "700" = "400") {
  return {
    fontFamily:
      weight === "700"
        ? fonts.bold
        : weight === "500"
          ? fonts.medium
          : fonts.regular,
  } as const;
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
        shadowOffset: { width: 0, height: 10 },
        elevation: 4,
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
        <Text style={[fontStyle("700")]} className="text-[20px] text-white">
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[fontStyle("400")]}
            className="mt-1 text-[14px] leading-6 text-[#8A94A7]"
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
  accentBg,
  iconColor,
}: {
  icon: any;
  label: string;
  value: string;
  accentBg: string;
  iconColor: string;
}) {
  return (
    <View className="mb-3 w-[48.5%] rounded-[22px] border border-white/8 bg-[#10192B] px-4 py-4">
      <View
        className="mb-4 h-11 w-11 items-center justify-center rounded-[16px]"
        style={{ backgroundColor: accentBg }}
      >
        <Icon size={20} color={iconColor} strokeWidth={2.3} />
      </View>

      <Text style={[fontStyle("500")]} className="text-[12px] text-[#8E99AB]">
        {label}
      </Text>
      <Text style={[fontStyle("700")]} className="mt-2 text-[24px] text-white">
        {value}
      </Text>
    </View>
  );
}

function ExportActionCard({
  icon: Icon,
  title,
  subtitle,
  accent,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  accent: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: "31.5%" }}
      className="rounded-[22px] border border-white/8 bg-[#10192B] px-3 py-4"
    >
      <View
        className="mb-4 h-11 w-11 items-center justify-center rounded-[16px]"
        style={{ backgroundColor: accent }}
      >
        <Icon size={19} color="#F3F7FF" strokeWidth={2.3} />
      </View>

      <Text style={[fontStyle("700")]} className="text-[14px] text-white">
        {title}
      </Text>
      <Text
        style={[fontStyle("400")]}
        className="mt-1 text-[12px] leading-5 text-[#8E99AB]"
      >
        {subtitle}
      </Text>
    </Pressable>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <View className="mb-3 mr-3 rounded-[14px] border border-[#2563EB]/25 bg-[#101B38] px-4 py-2.5">
      <Text style={[fontStyle("500")]} className="text-[13px] text-[#86B8FF]">
        {label}
      </Text>
    </View>
  );
}

function IncludedRow({ title, meta }: { title: string; meta: string }) {
  return (
    <View className="mb-3 flex-row items-start rounded-[20px] border border-white/6 bg-[#0B1222] px-4 py-4">
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-[14px] bg-[#102A63]">
        <CircleCheckBig size={18} color="#8EC5FF" strokeWidth={2.4} />
      </View>

      <View className="flex-1">
        <Text style={[fontStyle("700")]} className="text-[15px] text-white">
          {title}
        </Text>
        <Text
          style={[fontStyle("400")]}
          className="mt-1 text-[13px] leading-6 text-[#94A3B8]"
        >
          {meta}
        </Text>
      </View>
    </View>
  );
}

function TipRow({ text }: { text: string }) {
  return (
    <View className="mb-3 flex-row items-start">
      <View className="mr-3 mt-1 h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
      <Text
        style={[fontStyle("400")]}
        className="flex-1 text-[14px] leading-7 text-[#A8B3C7]"
      >
        {text}
      </Text>
    </View>
  );
}

export default function CvScreen() {
  const { profile, activities } = useLaunchpad();

  const fullName = profile?.name || "Your Name";
  const goal = profile?.goal || "Your target role";
  const summary =
    profile?.summary ||
    "Your Launchpad CV brings together your profile, verified activities, skills, and direction into one recruiter-ready document.";
  const skills = profile?.skills ?? [];
  const verifiedEntries = activities?.length ?? 0;

  const recentActivities = useMemo(() => {
    return (activities ?? []).slice(0, 3);
  }, [activities]);

  const cvReadiness = useMemo(() => {
    const base = 64;
    const skillBoost = Math.min(skills.length * 3, 18);
    const activityBoost = Math.min(verifiedEntries * 4, 20);
    return Math.min(base + skillBoost + activityBoost, 96);
  }, [skills.length, verifiedEntries]);

  const strengthLabel =
    cvReadiness >= 90 ? "Strong" : cvReadiness >= 80 ? "Good" : "Growing";

  const aiTips = useMemo(() => {
    const tips: string[] = [
      "Keep your summary focused on strengths, direction, and immediate value.",
      "Add measurable results to at least two experience bullets.",
      "Use verified activities to make your CV more credible and stronger.",
    ];

    if (skills.length < 6) {
      tips.push(
        "Add more role-relevant tools and soft skills to improve profile match quality.",
      );
    }

    return tips.slice(0, 4);
  }, [skills.length]);

  const handleDownloadPdf = () => {
    // TODO: connect to your PDF export flow
  };

  const handleShareCv = () => {
    // TODO: connect to your share/export link flow
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View className="absolute left-[-60] top-[-20] h-56 w-56 rounded-full bg-[#2563EB]/18" />
        <View className="absolute right-[-30] top-20 h-52 w-52 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[520] h-40 w-40 rounded-full bg-[#0EA5E9]/8" />

        <View className="px-5 pt-3">
          <View className="mb-6">
            <Text style={[fontStyle("700")]} className="text-[28px] text-white">
              My CV
            </Text>
            <Text
              style={[fontStyle("400")]}
              className="mt-2 text-[15px] leading-7 text-[#95A3B8]"
            >
              Download, share, and keep your Launchpad CV updated with verified
              experience and profile data.
            </Text>
          </View>

          <LinearGradient
            colors={["#0E1728", "#0D1A36", "#091120"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="mb-8 overflow-hidden rounded-[32px] border border-white/10 px-5 py-6"
            style={{
              shadowColor: "#2563EB",
              shadowOpacity: 0.12,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 12 },
              elevation: 5,
            }}
          >
            <View className="absolute right-[-22] top-[-10] h-40 w-40 rounded-full bg-[#3B82F6]/18" />
            <View className="absolute bottom-[-20] left-[-10] h-28 w-28 rounded-full bg-[#8B5CF6]/10" />

            <View className="mb-4 flex-row items-center self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
              <FileText size={14} color="#60A5FA" strokeWidth={2.4} />
              <Text
                style={[fontStyle("700")]}
                className="ml-2 text-[12px] text-[#93C5FD]"
              >
                DYNAMIC CV EXPORT
              </Text>
            </View>

            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text
                  style={[fontStyle("700")]}
                  className="text-[30px] leading-[38px] text-white"
                >
                  Your CV is ready to share
                </Text>

                <Text
                  style={[fontStyle("400")]}
                  className="mt-3 text-[15px] leading-7 text-[#A8B3C7]"
                >
                  Export a clean recruiter-ready version built from your
                  profile, skills, and verified activities.
                </Text>

                <View className="mt-5 flex-row">
                  <Pressable
                    onPress={handleDownloadPdf}
                    className="mr-3 flex-row items-center rounded-[18px] bg-[#2563EB] px-5 py-3.5"
                    style={{
                      shadowColor: "#2563EB",
                      shadowOpacity: 0.28,
                      shadowRadius: 14,
                      shadowOffset: { width: 0, height: 8 },
                      elevation: 6,
                    }}
                  >
                    <Download size={17} color="#FFFFFF" strokeWidth={2.4} />
                    <Text
                      style={[fontStyle("700")]}
                      className="ml-2 text-[15px] text-white"
                    >
                      Download PDF
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="w-[112px] rounded-[24px] border border-white/10 bg-[#0B1324]/80 p-3">
                <View className="rounded-[18px] bg-[#101B33] px-3 py-3">
                  <Text
                    style={[fontStyle("500")]}
                    className="text-[12px] text-[#8FA2C0]"
                  >
                    CV readiness
                  </Text>
                  <Text
                    style={[fontStyle("700")]}
                    className="mt-2 text-[26px] text-white"
                  >
                    {cvReadiness}%
                  </Text>
                </View>

                <View className="mt-3 rounded-[18px] bg-[#101B33] px-3 py-3">
                  <Text
                    style={[fontStyle("500")]}
                    className="text-[12px] text-[#8FA2C0]"
                  >
                    Verified
                  </Text>
                  <Text
                    style={[fontStyle("700")]}
                    className="mt-2 text-[22px] text-white"
                  >
                    {verifiedEntries}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View className="mb-8 flex-row flex-wrap justify-between">
            <QuickStat
              icon={FileText}
              label="CV readiness"
              value={`${cvReadiness}%`}
              accentBg="#102A63"
              iconColor="#93C5FD"
            />
            <QuickStat
              icon={CircleCheckBig}
              label="Verified entries"
              value={`${verifiedEntries}`}
              accentBg="#0F3B2D"
              iconColor="#86E4B3"
            />
            <QuickStat
              icon={Sparkles}
              label="Core skills"
              value={`${skills.length}`}
              accentBg="#31124E"
              iconColor="#D8B4FE"
            />
            <QuickStat
              icon={TrendingUp}
              label="CV strength"
              value={strengthLabel}
              accentBg="#3B1A52"
              iconColor="#C4B5FD"
            />
          </View>

          <SectionHeader
            title="Export actions"
            subtitle="Quick actions for downloading, sharing, and improving your CV."
          />

          <View className="mb-8 flex-row justify-between">
            <ExportActionCard
              icon={Download}
              title="PDF"
              subtitle="Download CV"
              accent="#102A63"
              onPress={handleDownloadPdf}
            />

            <ExportActionCard
              icon={Share2}
              title="Share"
              subtitle="Send link"
              accent="#15382F"
              onPress={handleShareCv}
            />

            <ExportActionCard
              icon={PencilLine}
              title="Edit"
              subtitle="Update source"
              accent="#31124E"
              onPress={() => router.push("/(tabs)/profile")}
            />
          </View>

          <SectionHeader
            title="Live CV preview"
            subtitle="This is the identity and content your export is built from."
          />

          <GlassCard className="mb-8 px-5 py-5">
            <View className="mb-5 flex-row items-center">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-[16px] bg-[#102A63]">
                <UserRound size={20} color="#93C5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text
                  style={[fontStyle("700")]}
                  className="text-[21px] text-white"
                >
                  {fullName}
                </Text>
                <Text
                  style={[fontStyle("500")]}
                  className="mt-1 text-[14px] text-[#9CC6FF]"
                >
                  {goal}
                </Text>
              </View>
            </View>

            <Text
              style={[fontStyle("400")]}
              className="text-[15px] leading-7 text-[#CBD5E1]"
            >
              {summary}
            </Text>

            <View className="mt-5 rounded-[20px] border border-white/8 bg-[#0B1222] px-4 py-4">
              <View className="mb-3 flex-row items-center">
                <Clock3 size={16} color="#93C5FD" strokeWidth={2.4} />
                <Text
                  style={[fontStyle("700")]}
                  className="ml-2 text-[14px] text-white"
                >
                  Included sections
                </Text>
              </View>

              <Text
                style={[fontStyle("400")]}
                className="text-[14px] leading-7 text-[#9AA8BD]"
              >
                Profile summary, career goal, verified experience, selected
                skills, and AI-structured presentation.
              </Text>
            </View>

            <View className="mt-6 flex-row flex-wrap">
              {skills.length ? (
                skills.map((skill) => <SkillChip key={skill} label={skill} />)
              ) : (
                <Text
                  style={[fontStyle("400")]}
                  className="text-[14px] text-[#94A3B8]"
                >
                  Add skills in your profile to strengthen your exported CV.
                </Text>
              )}
            </View>
          </GlassCard>

          <SectionHeader
            title="Verified experience included"
            subtitle="Approved activities that can strengthen the exported version."
            action={
              <Pressable
                onPress={() => router.push("/(tabs)/opportunities")}
                className="flex-row items-center"
              >
                <Text
                  style={[fontStyle("700")]}
                  className="text-[13px] text-[#60A5FA]"
                >
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

          <GlassCard className="mb-8 px-5 py-5">
            {recentActivities.length ? (
              recentActivities.map((item: any, index: number) => {
                const title =
                  item?.title ||
                  item?.name ||
                  item?.role ||
                  "Verified experience";
                const meta =
                  [item?.organization, item?.type, item?.status]
                    .filter(Boolean)
                    .join(" • ") || "Approved Launchpad activity";

                return (
                  <IncludedRow
                    key={item?.id || `${title}-${index}`}
                    title={title}
                    meta={meta}
                  />
                );
              })
            ) : (
              <View className="rounded-[22px] border border-white/6 bg-[#0B1222] px-4 py-5">
                <Text
                  style={[fontStyle("700")]}
                  className="text-[15px] text-white"
                >
                  No verified activity yet
                </Text>
                <Text
                  style={[fontStyle("400")]}
                  className="mt-2 text-[14px] leading-7 text-[#94A3B8]"
                >
                  Complete internships, volunteering, research, or other
                  approved activities to make your CV stronger over time.
                </Text>
              </View>
            )}
          </GlassCard>

          <SectionHeader
            title="AI polish tips"
            subtitle="Small improvements that can make your CV stronger before export."
            action={
              <View className="flex-row items-center rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Brain size={14} color="#60A5FA" strokeWidth={2.4} />
                <Text
                  style={[fontStyle("700")]}
                  className="ml-2 text-[12px] text-[#60A5FA]"
                >
                  Smart tips
                </Text>
              </View>
            }
          />

          <GlassCard className="px-5 py-5">
            <View className="mb-4 flex-row items-center">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-[16px] bg-[#0F235B]">
                <Brain size={20} color="#93C5FD" strokeWidth={2.4} />
              </View>

              <View className="flex-1">
                <Text
                  style={[fontStyle("700")]}
                  className="text-[17px] text-white"
                >
                  Improve before download
                </Text>
                <Text
                  style={[fontStyle("400")]}
                  className="mt-1 text-[14px] leading-6 text-[#94A3B8]"
                >
                  Quick changes that can improve clarity, impact, and recruiter
                  confidence.
                </Text>
              </View>
            </View>

            {aiTips.map((tip) => (
              <TipRow key={tip} text={tip} />
            ))}

            <View className="mt-3 rounded-[22px] border border-white/8 bg-[#0B1222] px-4 py-4">
              <View className="flex-row items-center">
                <Target size={18} color="#7CB7FF" strokeWidth={2.4} />
                <Text
                  style={[fontStyle("700")]}
                  className="ml-2 text-[14px] text-white"
                >
                  Best next move
                </Text>
              </View>

              <Text
                style={[fontStyle("400")]}
                className="mt-2 text-[14px] leading-7 text-[#94A3B8]"
              >
                Review your profile, verify one more quality activity, then
                export the PDF once your CV readiness is above 85%.
              </Text>
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
