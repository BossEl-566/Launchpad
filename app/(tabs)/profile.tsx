import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ArrowLeft,
  Award,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CirclePlus,
  Download,
  FileText,
  FolderKanban,
  GraduationCap,
  LogOut,
  MapPin,
  MoonStar,
  Palette,
  PencilLine,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Wrench,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
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

function hexToRgba(hex: string, alpha: number) {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function HeaderIconButton({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 w-12 items-center justify-center rounded-full"
      style={{
        backgroundColor: "#0E1628",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        shadowColor: "#3B82F6",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      }}
    >
      {children}
    </Pressable>
  );
}

function DarkGlassCard({
  children,
  accent = "#3B82F6",
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <View
      className={`overflow-hidden rounded-[28px] ${className}`}
      style={{
        borderRadius: 28,
        shadowColor: accent,
        shadowOpacity: 0.14,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6,
      }}
    >
      <LinearGradient
        colors={["#0F172A", "#101B33", "#0C1427"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 28,
          borderWidth: 1,
          borderColor: hexToRgba(accent, 0.24),
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            right: -30,
            top: -20,
            width: 130,
            height: 130,
            borderRadius: 999,
            backgroundColor: hexToRgba(accent, 0.1),
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -18,
            bottom: -18,
            width: 90,
            height: 90,
            borderRadius: 999,
            backgroundColor: hexToRgba(accent, 0.08),
          }}
        />
        {children}
      </LinearGradient>
    </View>
  );
}

function PrimaryButton({
  label,
  icon: Icon,
  onPress,
  dark = false,
}: {
  label: string;
  icon: any;
  onPress: () => void;
  dark?: boolean;
}) {
  if (dark) {
    return (
      <Pressable
        onPress={onPress}
        className="flex-1 flex-row items-center justify-center rounded-full px-4 py-4"
        style={{
          backgroundColor: "#071325",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Icon size={18} color="#FFFFFF" strokeWidth={2.4} />
        <Text
          style={[fontStyle("700")]}
          className="ml-2 text-[15px] text-white"
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 overflow-hidden rounded-full"
      style={{
        shadowColor: "#22A8F3",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <LinearGradient
        colors={["#1FB0F7", "#1C9DE8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-row items-center justify-center rounded-full px-4 py-4"
      >
        <Icon size={18} color="#FFFFFF" strokeWidth={2.4} />
        <Text
          style={[fontStyle("700")]}
          className="ml-2 text-[15px] text-white"
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <View
      className="mr-3 mb-3 rounded-[18px] px-4 py-3"
      style={{
        backgroundColor: "#0A1220",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <Text
        style={[fontStyle("400")]}
        className="text-[12px] uppercase tracking-[1px] text-[#8EA0B7]"
      >
        {label}
      </Text>
      <Text style={[fontStyle("700")]} className="mt-1 text-[18px] text-white">
        {value}
      </Text>
    </View>
  );
}

function SectionCard({
  title,
  icon: Icon,
  open,
  onToggle,
  children,
  count,
  accent = "#3B82F6",
}: {
  title: string;
  icon: any;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  count?: string;
  accent?: string;
}) {
  return (
    <DarkGlassCard accent={accent} className="mb-5">
      <View className="px-5 py-5">
        <Pressable
          onPress={onToggle}
          className="flex-row items-center justify-between"
        >
          <View className="mr-4 flex-1 flex-row items-center">
            <View
              className="mr-4 h-12 w-12 items-center justify-center rounded-[18px]"
              style={{
                backgroundColor: hexToRgba(accent, 0.14),
                borderWidth: 1,
                borderColor: hexToRgba(accent, 0.24),
              }}
            >
              <Icon size={20} color={accent} strokeWidth={2.3} />
            </View>

            <View className="flex-1">
              <Text
                style={[fontStyle("700")]}
                className="text-[22px] text-white"
              >
                {title}
              </Text>

              {count ? (
                <Text
                  style={[fontStyle("400")]}
                  className="mt-1 text-[13px] text-[#8EA0B7]"
                >
                  {count}
                </Text>
              ) : null}
            </View>
          </View>

          <View
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {open ? (
              <ChevronUp size={18} color="#E5EEF9" strokeWidth={2.4} />
            ) : (
              <ChevronDown size={18} color="#E5EEF9" strokeWidth={2.4} />
            )}
          </View>
        </Pressable>

        {open ? <View className="pt-5">{children}</View> : null}
      </View>
    </DarkGlassCard>
  );
}

function AddMoreButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-4 self-start flex-row items-center rounded-full px-4 py-3"
      style={{
        backgroundColor: "#101B38",
        borderWidth: 1,
        borderColor: "rgba(59,130,246,0.24)",
      }}
    >
      <CirclePlus size={17} color="#60A5FA" strokeWidth={2.4} />
      <Text
        style={[fontStyle("700")]}
        className="ml-2 text-[14px] text-[#7CB7FF]"
      >
        {label}
      </Text>
    </Pressable>
  );
}

function TagPill({
  label,
  tone = "blue",
}: {
  label: string;
  tone?: "blue" | "dark" | "soft";
}) {
  const styles =
    tone === "dark"
      ? {
          bg: "#111827",
          border: "rgba(255,255,255,0.08)",
          color: "#F8FAFC",
        }
      : tone === "soft"
        ? {
            bg: "#0D1628",
            border: "rgba(255,255,255,0.08)",
            color: "#94A3B8",
          }
        : {
            bg: "#101B38",
            border: "rgba(59,130,246,0.22)",
            color: "#7CB7FF",
          };

  return (
    <View
      className="mb-3 mr-3 rounded-full px-4 py-2.5"
      style={{
        backgroundColor: styles.bg,
        borderWidth: 1,
        borderColor: styles.border,
      }}
    >
      <Text
        style={[fontStyle("500"), { color: styles.color }]}
        className="text-[13px]"
      >
        {label}
      </Text>
    </View>
  );
}

function DetailRow({
  title,
  subtitle,
  meta,
  badge,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
}) {
  return (
    <View
      className="mb-3 rounded-[22px] px-4 py-4"
      style={{
        backgroundColor: "#0A1220",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="mr-4 flex-1">
          <Text style={[fontStyle("700")]} className="text-[17px] text-white">
            {title}
          </Text>

          {subtitle ? (
            <Text
              style={[fontStyle("500")]}
              className="mt-1 text-[14px] text-[#D4DCE8]"
            >
              {subtitle}
            </Text>
          ) : null}

          {meta ? (
            <Text
              style={[fontStyle("400")]}
              className="mt-2 text-[13px] leading-6 text-[#8EA0B7]"
            >
              {meta}
            </Text>
          ) : null}
        </View>

        {badge ? <TagPill label={badge} /> : null}
      </View>
    </View>
  );
}

function SettingRow({
  icon: Icon,
  title,
  subtitle,
  accent,
  value,
  destructive = false,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  accent: string;
  value?: string;
  destructive?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-[22px] px-4 py-4"
      style={{
        backgroundColor: destructive ? "#1A0F16" : "#0A1220",
        borderWidth: 1,
        borderColor: destructive
          ? "rgba(248,113,113,0.18)"
          : "rgba(255,255,255,0.06)",
      }}
    >
      <View
        className="mr-4 h-12 w-12 items-center justify-center rounded-[16px]"
        style={{
          backgroundColor: hexToRgba(accent, 0.14),
          borderWidth: 1,
          borderColor: hexToRgba(accent, 0.24),
        }}
      >
        <Icon size={20} color={accent} strokeWidth={2.3} />
      </View>

      <View className="flex-1">
        <Text
          style={[fontStyle("700")]}
          className={`text-[15px] ${destructive ? "text-[#FCA5A5]" : "text-white"}`}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[fontStyle("400")]}
            className={`mt-1 text-[13px] leading-6 ${
              destructive ? "text-[#FECACA]" : "text-[#8EA0B7]"
            }`}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {value ? (
        <View
          className="rounded-full px-3 py-2"
          style={{
            backgroundColor: destructive
              ? "rgba(248,113,113,0.14)"
              : "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderColor: destructive
              ? "rgba(248,113,113,0.22)"
              : "rgba(255,255,255,0.08)",
          }}
        >
          <Text
            style={[fontStyle("700")]}
            className={`text-[12px] ${destructive ? "text-[#FCA5A5]" : "text-[#DCE7F8]"}`}
          >
            {value}
          </Text>
        </View>
      ) : (
        <ChevronRight
          size={18}
          color={destructive ? "#FCA5A5" : "#DCE7F8"}
          strokeWidth={2.4}
        />
      )}
    </Pressable>
  );
}

function InfoCallout({
  title,
  text,
  accent = "#3B82F6",
  icon: Icon = Sparkles,
}: {
  title: string;
  text: string;
  accent?: string;
  icon?: any;
}) {
  return (
    <View
      className="mt-4 rounded-[22px] px-4 py-4"
      style={{
        backgroundColor: "#0A1220",
        borderWidth: 1,
        borderColor: hexToRgba(accent, 0.18),
      }}
    >
      <View className="flex-row items-center">
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-[16px]"
          style={{
            backgroundColor: hexToRgba(accent, 0.14),
            borderWidth: 1,
            borderColor: hexToRgba(accent, 0.22),
          }}
        >
          <Icon size={19} color={accent} strokeWidth={2.3} />
        </View>

        <View className="flex-1">
          <Text style={[fontStyle("700")]} className="text-[16px] text-white">
            {title}
          </Text>
          <Text
            style={[fontStyle("400")]}
            className="mt-1 text-[13px] leading-6 text-[#8EA0B7]"
          >
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { profile, activities } = useLaunchpad() as any;
  const profileData = profile ?? {};

  const [open, setOpen] = useState({
    education: true,
    courses: true,
    skills: true,
    experience: true,
    projects: false,
    certifications: false,
    interests: false,
    preferences: true,
    privacy: false,
  });

  const fullName = profileData?.name || "Edmond Kofi Gyan";
  const headline = profileData?.goal || "Computer Science Student";
  const school = profileData?.school || "University of Ghana";
  const avatar = profileData?.avatar || null;
  const themePreference = profileData?.theme || "Dark";
  const notificationsEnabled =
    typeof profileData?.notificationsEnabled === "boolean"
      ? profileData.notificationsEnabled
      : true;

  const skills = profileData?.skills ?? [
    "Flutter",
    "React",
    "Node.js",
    "UI Design",
    "Research Writing",
    "Public Speaking",
  ];

  const semesterCourses = profileData?.semesterCourses ?? [
    "DCIT 407 - Image Processing",
    "DCIT 411 - Bioinformatics",
    "DCIT 413 - Mobile Computing",
    "DCIT 401 - Software Engineering",
  ];

  const educationItems = profileData?.education ?? [
    {
      school: "University of Ghana",
      program: "BSc Computer Science",
      period: "2022 - Present",
      meta: "Level 300 • Accra, Ghana",
    },
  ];

  const experienceItems = profileData?.experience ?? [
    {
      title: "Flutter Developer",
      org: "PrayerSocial.org",
      period: "2024 - Present",
      meta: "Worked on moderation tooling, feature delivery, and UI improvement across the admin platform.",
      badge: "Active",
    },
    {
      title: "Backend / Full Stack Intern",
      org: "Really Great Tech",
      period: "2024",
      meta: "Contributed to real product work, debugging, and technical delivery across client-facing systems.",
      badge: "Internship",
    },
  ];

  const projectItems = profileData?.projects ?? [
    {
      title: "Launchpad",
      subtitle: "AI student career platform",
      meta: "Tracks skills, courses, verified experience, opportunities, and CV growth from admission to employment.",
      badge: "Featured",
    },
    {
      title: "AutiCare",
      subtitle: "Health monitoring concept",
      meta: "Wear OS health support idea focused on caregiver visibility and safer monitoring.",
      badge: "HealthTech",
    },
  ];

  const certificationItems = profileData?.certifications ?? [
    {
      title: "Google AI / ML Fundamentals",
      subtitle: "Self-paced learning",
      meta: "Add certificates, badges, and verified learning records here.",
    },
  ];

  const interestItems = profileData?.interests ?? [
    "AI Engineering",
    "Embedded Systems",
    "VLSI",
    "Mobile Development",
    "Research",
    "UX for Education",
  ];

  const verifiedCount = (activities ?? []).length;

  const profileStrength = useMemo(() => {
    const base = 62;
    const skillBoost = Math.min(skills.length * 3, 18);
    const courseBoost = Math.min(semesterCourses.length * 2, 10);
    const experienceBoost = Math.min(experienceItems.length * 5, 15);
    const verifiedBoost = Math.min(verifiedCount * 3, 12);
    return Math.min(
      base + skillBoost + courseBoost + experienceBoost + verifiedBoost,
      96,
    );
  }, [
    skills.length,
    semesterCourses.length,
    experienceItems.length,
    verifiedCount,
  ]);

  const toggle = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View className="absolute left-[-60] top-[-10] h-56 w-56 rounded-full bg-[#2563EB]/18" />
        <View className="absolute right-[-30] top-20 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[540] h-44 w-44 rounded-full bg-[#0EA5E9]/8" />
        <View className="absolute right-10 top-[980] h-36 w-36 rounded-full bg-[#2563EB]/10" />

        <View className="px-5 pt-3">
          <View className="mb-4 flex-row items-center justify-between">
            <HeaderIconButton onPress={() => router.back()}>
              <ArrowLeft size={20} color="#E5EEF9" strokeWidth={2.4} />
            </HeaderIconButton>

            <HeaderIconButton
              onPress={() => router.push("/(tabs)/cv" as never)}
            >
              <FileText size={19} color="#E5EEF9" strokeWidth={2.4} />
            </HeaderIconButton>
          </View>

          <DarkGlassCard accent="#4F86FF" className="mb-5">
            <View className="px-5 pb-6 pt-5">
              <View className="items-center">
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    resizeMode="cover"
                    className="h-[240px] w-[220px] rounded-[28px]"
                  />
                ) : (
                  <LinearGradient
                    colors={["#162341", "#12203B", "#0D172C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-[240px] w-[220px] items-center justify-center rounded-[28px]"
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(79,134,255,0.24)",
                    }}
                  >
                    <View className="h-32 w-32 items-center justify-center rounded-full bg-[#0E1628]">
                      <UserRound size={62} color="#60A5FA" strokeWidth={2.1} />
                    </View>
                  </LinearGradient>
                )}
              </View>

              <View className="mt-5">
                <Text
                  style={[fontStyle("700")]}
                  className="text-[26px] leading-[34px] text-white"
                >
                  {headline}
                </Text>

                <Text
                  style={[fontStyle("400")]}
                  className="mt-2 text-[16px] text-[#C0CAD8]"
                >
                  {fullName}
                </Text>

                <View className="mt-2 flex-row items-center">
                  <MapPin size={15} color="#8EA0B7" strokeWidth={2.3} />
                  <Text
                    style={[fontStyle("400")]}
                    className="ml-1 text-[14px] text-[#8EA0B7]"
                  >
                    {school}
                  </Text>
                </View>
              </View>

              <View className="mt-5 flex-row">
                <PrimaryButton
                  label="Preview CV"
                  icon={Download}
                  onPress={() => router.push("/(tabs)/cv" as never)}
                  dark
                />

                <View className="w-3" />

                <PrimaryButton
                  label="Edit Profile"
                  icon={PencilLine}
                  onPress={() => {}}
                />
              </View>

              <View className="mt-5 flex-row flex-wrap">
                <StatChip label="Strength" value={`${profileStrength}%`} />
                <StatChip label="Skills" value={`${skills.length}`} />
                <StatChip label="Verified" value={`${verifiedCount}`} />
              </View>
            </View>
          </DarkGlassCard>

          <SectionCard
            title="Education"
            icon={GraduationCap}
            open={open.education}
            onToggle={() => toggle("education")}
            count={`${educationItems.length} entry`}
            accent="#60A5FA"
          >
            {educationItems.map((item: any, index: number) => (
              <DetailRow
                key={`${item.school}-${index}`}
                title={item.school}
                subtitle={item.program}
                meta={`${item.period} • ${item.meta}`}
              />
            ))}

            <AddMoreButton label="Add education" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Courses for this semester"
            icon={BookOpen}
            open={open.courses}
            onToggle={() => toggle("courses")}
            count={`${semesterCourses.length} courses`}
            accent="#38BDF8"
          >
            <View className="flex-row flex-wrap">
              {semesterCourses.map((course: string) => (
                <TagPill key={course} label={course} tone="soft" />
              ))}
            </View>

            <AddMoreButton label="Add course" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Skills"
            icon={Wrench}
            open={open.skills}
            onToggle={() => toggle("skills")}
            count={`${skills.length} skills`}
            accent="#A78BFA"
          >
            <View className="flex-row flex-wrap">
              {skills.map((skill: string) => (
                <TagPill key={skill} label={skill} />
              ))}
            </View>

            <AddMoreButton label="Add skill" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Job experience"
            icon={BriefcaseBusiness}
            open={open.experience}
            onToggle={() => toggle("experience")}
            count={`${experienceItems.length} entries`}
            accent="#34D399"
          >
            {experienceItems.map((item: any, index: number) => (
              <DetailRow
                key={`${item.title}-${index}`}
                title={item.title}
                subtitle={`${item.org} • ${item.period}`}
                meta={item.meta}
                badge={item.badge}
              />
            ))}

            <AddMoreButton label="Add experience" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Projects"
            icon={FolderKanban}
            open={open.projects}
            onToggle={() => toggle("projects")}
            count={`${projectItems.length} projects`}
            accent="#F59E0B"
          >
            {projectItems.map((item: any, index: number) => (
              <DetailRow
                key={`${item.title}-${index}`}
                title={item.title}
                subtitle={item.subtitle}
                meta={item.meta}
                badge={item.badge}
              />
            ))}

            <AddMoreButton label="Add project" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Certifications"
            icon={Award}
            open={open.certifications}
            onToggle={() => toggle("certifications")}
            count={`${certificationItems.length} entry`}
            accent="#F472B6"
          >
            {certificationItems.map((item: any, index: number) => (
              <DetailRow
                key={`${item.title}-${index}`}
                title={item.title}
                subtitle={item.subtitle}
                meta={item.meta}
              />
            ))}

            <AddMoreButton label="Add certification" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Career interests"
            icon={Target}
            open={open.interests}
            onToggle={() => toggle("interests")}
            count={`${interestItems.length} interests`}
            accent="#22C55E"
          >
            <View className="flex-row flex-wrap">
              {interestItems.map((item: string) => (
                <TagPill key={item} label={item} tone="dark" />
              ))}
            </View>

            <InfoCallout
              title="AI guidance uses this section"
              text="The more accurate your interests are, the better Launchpad can recommend electives, internships, scholarships, and jobs."
              accent="#22C55E"
            />

            <AddMoreButton label="Add interest" onPress={() => {}} />
          </SectionCard>

          <SectionCard
            title="Preferences & settings"
            icon={Settings}
            open={open.preferences}
            onToggle={() => toggle("preferences")}
            count="Profile, app, and notifications"
            accent="#60A5FA"
          >
            <SettingRow
              icon={MoonStar}
              title="Theme"
              subtitle="Choose how Launchpad looks for you"
              accent="#8B5CF6"
              value={themePreference}
              onPress={() => {}}
            />

            <SettingRow
              icon={Bell}
              title="Notifications"
              subtitle="Control alerts for matches, messages, and reminders"
              accent="#38BDF8"
              value={notificationsEnabled ? "On" : "Off"}
              onPress={() => {}}
            />

            <SettingRow
              icon={Palette}
              title="Appearance"
              subtitle="Accent colors, visual style, and interface preferences"
              accent="#F59E0B"
              onPress={() => {}}
            />

            <SettingRow
              icon={Sparkles}
              title="Recommendation settings"
              subtitle="Tune how the AI suggests paths, roles, and opportunities"
              accent="#34D399"
              onPress={() => router.push("/(tabs)/roadmap" as never)}
            />
          </SectionCard>

          <SectionCard
            title="Privacy & security"
            icon={ShieldCheck}
            open={open.privacy}
            onToggle={() => toggle("privacy")}
            count="Visibility, access, and account safety"
            accent="#22C55E"
          >
            <SettingRow
              icon={UserRound}
              title="Profile visibility"
              subtitle="Choose who can view your student profile and achievements"
              accent="#60A5FA"
              value="Public"
              onPress={() => {}}
            />

            <SettingRow
              icon={FileText}
              title="CV sharing"
              subtitle="Manage who can access exported CV links and downloads"
              accent="#38BDF8"
              value="Controlled"
              onPress={() => {}}
            />

            <SettingRow
              icon={ShieldCheck}
              title="Account security"
              subtitle="Password, sign-in methods, and access protection"
              accent="#22C55E"
              onPress={() => {}}
            />

            <InfoCallout
              title="Protect your profile"
              text="Keep your contact details, CV links, and opportunity visibility settings accurate so you stay visible only where you want."
              accent="#22C55E"
              icon={ShieldCheck}
            />
          </SectionCard>

          <DarkGlassCard accent="#EF4444" className="mb-5">
            <View className="px-5 py-5">
              <Text
                style={[fontStyle("700")]}
                className="text-[20px] text-white"
              >
                Account actions
              </Text>
              <Text
                style={[fontStyle("400")]}
                className="mt-2 text-[14px] leading-7 text-[#8EA0B7]"
              >
                Manage how you leave the app or review important account
                actions.
              </Text>

              <View className="mt-5">
                <SettingRow
                  icon={LogOut}
                  title="Sign out"
                  subtitle="Sign out of your Launchpad account on this device"
                  accent="#F87171"
                  destructive
                  onPress={() => {}}
                />
              </View>
            </View>
          </DarkGlassCard>

          <DarkGlassCard accent="#3B82F6">
            <View className="px-5 py-5">
              <View className="mb-4 flex-row items-center">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-[18px] bg-[#13213B]">
                  <Settings size={20} color="#7CC9FF" strokeWidth={2.3} />
                </View>

                <View className="flex-1">
                  <Text
                    style={[fontStyle("700")]}
                    className="text-[18px] text-white"
                  >
                    Keep this page updated
                  </Text>
                  <Text
                    style={[fontStyle("400")]}
                    className="mt-1 text-[14px] leading-6 text-[#98A2B3]"
                  >
                    This page powers your CV, recommendations, opportunity
                    matching, profile visibility, and student identity inside
                    Launchpad.
                  </Text>
                </View>
              </View>

              <Pressable className="self-start rounded-full bg-[#1F9EEA] px-5 py-3">
                <Text
                  style={[fontStyle("700")]}
                  className="text-[14px] text-white"
                >
                  Complete your profile
                </Text>
              </Pressable>
            </View>
          </DarkGlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
