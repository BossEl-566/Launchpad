import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  GraduationCap,
  Menu,
  MessageSquare,
  Microscope,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View
} from "react-native";
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

type QuickAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  route: string;
  border: string;
  text: string;
  bg: string;
};

type OpportunityCardType = {
  id: string;
  title: string;
  org: string;
  meta: string;
  description: string;
  route: string;
  colors: [string, string, ...string[]];
  icon: LucideIcon;
  action: string;
};

type PeerType = {
  id: string;
  name: string;
  school: string;
  course: string;
  avatar: string;
};

type FeedType = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const quickActions: QuickAction[] = [
  {
    id: "1",
    label: "CV",
    icon: FileText,
    route: "/(tabs)/cv",
    border: "#59631E",
    text: "#D8E56A",
    bg: "#12170E",
  },
  {
    id: "2",
    label: "Matches",
    icon: BriefcaseBusiness,
    route: "/(tabs)/opportunities",
    border: "#0F6E79",
    text: "#57E6F7",
    bg: "#0B151A",
  },
  {
    id: "3",
    label: "Research",
    icon: Microscope,
    route: "/(tabs)/opportunities",
    border: "#7A4C1F",
    text: "#F9B76B",
    bg: "#17110C",
  },
  {
    id: "4",
    label: "Network",
    icon: Users,
    route: "/(tabs)/profile",
    border: "#2D6D3B",
    text: "#7CE4A1",
    bg: "#0D1712",
  },
  {
    id: "5",
    label: "Skills",
    icon: Sparkles,
    route: "/(tabs)/roadmap",
    border: "#4E4599",
    text: "#AFA4FF",
    bg: "#141322",
  },
];

const opportunities: OpportunityCardType[] = [
  {
    id: "1",
    title: "Frontend Internship Match",
    org: "Launchpad AI",
    meta: "94% fit score",
    description:
      "A role matched to your course history, verified skills, and current interests.",
    route: "/(tabs)/opportunities",
    colors: ["#2D6BFF", "#2B59F3", "#EAF2FF"],
    icon: BriefcaseBusiness,
    action: "See match",
  },
  {
    id: "2",
    title: "Research Assistant Opening",
    org: "Digital Systems Lab",
    meta: "Recommended by profile",
    description:
      "Your academic direction suggests strong alignment with this research path.",
    route: "/(tabs)/opportunities",
    colors: ["#124DFF", "#366DFF", "#DCE9FF"],
    icon: Microscope,
    action: "View role",
  },
  {
    id: "3",
    title: "Scholarship Opportunity",
    org: "Global Student Mobility",
    meta: "Deadline in 6 days",
    description:
      "A scholarship path selected from your progress, extracurriculars, and goals.",
    route: "/(tabs)/opportunities",
    colors: ["#275CFF", "#3A73FF", "#E9F2FF"],
    icon: GraduationCap,
    action: "Review now",
  },
];

const peers: PeerType[] = [
  {
    id: "1",
    name: "Sarah Mensah",
    school: "KNUST",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Daniel Asare",
    school: "UCC",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Ama Owusu",
    school: "UG",
    course: "Information Technology",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

const activityFeed: FeedType[] = [
  {
    id: "1",
    title: "Volunteer experience verified",
    subtitle:
      "Your recent activity can now be added to your CV for stronger profile visibility.",
    icon: Sparkles,
    iconBg: "#12233D",
    iconColor: "#6EB4FF",
  },
  {
    id: "2",
    title: "New connection request",
    subtitle:
      "A student following a similar academic path wants to connect with you.",
    icon: UserPlus,
    iconBg: "#1E1839",
    iconColor: "#B79AFF",
  },
  {
    id: "3",
    title: "Fresh opportunity match",
    subtitle:
      "A new internship recommendation has been generated from your latest progress.",
    icon: BriefcaseBusiness,
    iconBg: "#182A24",
    iconColor: "#7BE0A1",
  },
];

function Avatar({
  name,
  uri,
  size = 44,
}: {
  name: string;
  uri?: string | null;
  size?: number;
}) {
  const initials = useMemo(() => {
    const parts = name?.trim().split(" ").filter(Boolean) || [];
    const joined = parts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return joined || "L";
  }, [name]);

  if (uri) {
    return (
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{ width: size, height: size, borderRadius: size / 2 }}
        className="border border-white/15"
      />
    );
  }

  return (
    <LinearGradient
      colors={["#4D95FF", "#2D6BFF", "#244CF0"]}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="items-center justify-center border border-white/15"
    >
      <Text style={[fontStyle("700")]} className="text-white">
        {initials}
      </Text>
    </LinearGradient>
  );
}

function StaticHeader({
  onMenuPress,
  onProfilePress,
  profileName,
  profileAvatar,
}: {
  onMenuPress: () => void;
  onProfilePress: () => void;
  profileName: string;
  profileAvatar?: string | null;
}) {
  return (
    <View className="absolute left-0 right-0 top-0 z-40">
      <SafeAreaView edges={["top"]}>
        <View className="px-5 pb-3 pt-2">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={onMenuPress}
              className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0E162B]/90"
              style={{
                shadowColor: "#3B82F6",
                shadowOpacity: 0.14,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 8 },
                elevation: 5,
              }}
            >
              <Menu size={20} color="#EAF2FF" strokeWidth={2.3} />
            </Pressable>

            <Pressable onPress={onProfilePress}>
              <Avatar name={profileName} uri={profileAvatar} size={46} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function MenuPopover({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      <Pressable onPress={onClose} className="absolute inset-0 bg-black/20" />

      <View className="absolute left-5 top-[86px] w-[220px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0C1427] px-3 py-3">
        <View className="absolute right-[-18] top-[-18] h-24 w-24 rounded-full bg-[#2B63FF]/20" />
        <View className="absolute left-[-10] bottom-[-16] h-20 w-20 rounded-full bg-[#47A3FF]/10" />

        <Pressable
          onPress={() => {
            onClose();
            router.push("/messages" as never);
          }}
          className="mb-2 flex-row items-center rounded-[20px] border border-white/6 bg-white/5 px-3 py-3"
        >
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#142542]">
            <MessageSquare size={18} color="#84B9FF" strokeWidth={2.3} />
          </View>

          <View className="flex-1">
            <Text style={[fontStyle("700")]} className="text-[15px] text-white">
              Messages
            </Text>
            <Text
              style={[fontStyle("400")]}
              className="mt-0.5 text-[12px] text-[#97A7C2]"
            >
              Open student chats
            </Text>
          </View>

          <ChevronRight size={16} color="#8EA4C8" strokeWidth={2.5} />
        </Pressable>

        <Pressable
          onPress={() => {
            onClose();
            router.push("/notifications" as never);
          }}
          className="flex-row items-center rounded-[20px] border border-white/6 bg-white/5 px-3 py-3"
        >
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#142542]">
            <Bell size={18} color="#84B9FF" strokeWidth={2.3} />
          </View>

          <View className="flex-1">
            <Text style={[fontStyle("700")]} className="text-[15px] text-white">
              Notifications
            </Text>
            <Text
              style={[fontStyle("400")]}
              className="mt-0.5 text-[12px] text-[#97A7C2]"
            >
              See recent updates
            </Text>
          </View>

          <ChevronRight size={16} color="#8EA4C8" strokeWidth={2.5} />
        </Pressable>
      </View>
    </View>
  );
}

function HeroOrb() {
  return (
    <View
      className="relative h-[148px] w-[148px] items-center justify-center"
      style={{ transform: [{ rotate: "14deg" }] }}
    >
      <LinearGradient
        colors={["#DDF2FF", "#61B5FF", "#1E65FF", "#1347D8"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-[42px]"
      />
      <View className="absolute left-[14px] top-[16px] h-[54px] w-[54px] rounded-[22px] bg-white/35" />
      <View className="absolute right-[12px] top-[12px] h-[46px] w-[46px] rounded-[18px] bg-white/25" />
      <View className="absolute bottom-[18px] left-[22px] h-[42px] w-[68px] rounded-[22px] bg-[#0B2D9A]/45" />
      <View className="absolute right-[18px] bottom-[22px] h-[70px] w-[32px] rounded-[20px] bg-white/18" />
      <View className="absolute left-[42px] top-[38px] h-[74px] w-[28px] rounded-[16px] bg-[#0B42D9]/35" />
    </View>
  );
}

function HeroCard() {
  return (
    <LinearGradient
      colors={["#2A63F8", "#4D89FF", "#F3F7FF"]}
      start={{ x: 0.05, y: 0.05 }}
      end={{ x: 0.95, y: 0.95 }}
      className="overflow-hidden rounded-[28px] px-5 py-5"
      style={{
        minHeight: 175,
        shadowColor: "#2C5CFF",
        shadowOpacity: 0.22,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },
        elevation: 10,
      }}
    >
      {/* soft glow spots */}
      <View className="absolute left-[-18] bottom-[-24] h-24 w-24 rounded-full bg-white/12" />
      <View className="absolute right-[-10] top-[-10] h-24 w-24 rounded-full bg-white/10" />
      <View className="absolute bottom-0 left-0 right-0 h-16 bg-white/10" />

      <View className="flex-row items-center justify-between">
        {/* left content */}
        <View className="flex-1 pr-3">
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 20,
              color: "#FFFFFF",
            }}
          >
            Career Match Hub
          </Text>

          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 14,
              lineHeight: 22,
              color: "#EAF1FF",
              marginTop: 8,
              maxWidth: 210,
            }}
          >
            Discover internships, scholarships and research opportunities
            tailored to your journey.
          </Text>

          <Pressable
            onPress={() => router.push("/(tabs)/opportunities" as never)}
            className="mt-5 self-start overflow-hidden rounded-full"
            style={{
              shadowColor: "#334DFF",
              shadowOpacity: 0.26,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 8 },
              elevation: 8,
            }}
          >
            <LinearGradient
              colors={["#3457FF", "#5C63FF", "#2C3EF2"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 0.8 }}
              style={{
                borderRadius: 999,
                paddingHorizontal: 24,
                paddingVertical: 14,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 15,
                  color: "#FFFFFF",
                }}
              >
                Explore Now
              </Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* right artwork */}
        <View className="items-center justify-center">
          <Image
            source={require("../../assets/images/hero-blue-shape.png")}
            resizeMode="contain"
            style={{
              width: 160,
              height: 160,
              marginRight: -6,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

function QuickActionPill({ item }: { item: QuickAction }) {
  const Icon = item.icon;

  return (
    <Pressable
      onPress={() => router.push(item.route as never)}
      className="mr-3 flex-row items-center rounded-full px-4 py-3"
      style={{
        backgroundColor: item.bg,
        borderWidth: 1,
        borderColor: item.border,
      }}
    >
      <Icon size={16} color={item.text} strokeWidth={2.3} />
      <Text
        style={[fontStyle("500")]}
        className="ml-2 text-[15px]"
        // @ts-ignore
        textBreakStrategy="simple"
      >
        <Text style={{ color: item.text }}>{item.label}</Text>
      </Text>
    </Pressable>
  );
}

function SectionTitle({
  title,
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
}) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text style={[fontStyle("700")]} className="text-[18px] text-white">
        {title}
      </Text>

      {actionLabel ? (
        <Pressable onPress={onPress}>
          <Text
            style={[fontStyle("500")]}
            className="text-[15px] text-[#D7DFEC]"
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={`overflow-hidden rounded-[24px] border border-white/8 bg-[#0E1627]/95 ${className}`}
      style={{
        shadowColor: "#1C55FF",
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

function MiniStat({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <View className="mb-3 w-[48.4%] rounded-[22px] border border-white/8 bg-[#111B30] px-4 py-4">
      <View
        className="mb-4 h-11 w-11 items-center justify-center rounded-[16px]"
        style={{ backgroundColor: color }}
      >
        <Icon size={20} color="#F4F8FF" strokeWidth={2.3} />
      </View>

      <Text
        style={[fontStyle("500")]}
        className="text-[12px] uppercase tracking-[1px] text-[#8D9AB0]"
      >
        {label}
      </Text>

      <Text style={[fontStyle("700")]} className="mt-2 text-[23px] text-white">
        {value}
      </Text>
    </View>
  );
}

function OpportunityCard({ item }: { item: OpportunityCardType }) {
  const Icon = item.icon;

  return (
    <LinearGradient
      colors={item.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: 300, borderRadius: 28, padding: 20, marginRight: 16 }}
    >
      <View className="absolute right-[-12] top-[-16] h-28 w-28 rounded-full bg-white/12" />
      <View className="absolute bottom-[-18] left-[-8] h-20 w-20 rounded-full bg-[#0A1C64]/15" />

      <View className="flex-row items-center justify-between">
        <View className="rounded-full bg-white/15 px-3 py-1.5">
          <Text
            style={[fontStyle("700")]}
            className="text-[11px] uppercase tracking-[1.2px] text-white"
          >
            Launchpad Pick
          </Text>
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-[18px] bg-white/16">
          <Icon size={20} color="#FFFFFF" strokeWidth={2.3} />
        </View>
      </View>

      <Text
        style={[fontStyle("700")]}
        className="mt-5 text-[22px] leading-7 text-white"
      >
        {item.title}
      </Text>

      <Text
        style={[fontStyle("500")]}
        className="mt-2 text-[15px] text-white/90"
      >
        {item.org}
      </Text>

      <Text
        style={[fontStyle("400")]}
        className="mt-3 text-[14px] leading-6 text-[#EFF5FF]"
      >
        {item.description}
      </Text>

      <View className="mt-4 self-start rounded-full bg-white/15 px-3 py-1.5">
        <Text style={[fontStyle("700")]} className="text-[12px] text-white">
          {item.meta}
        </Text>
      </View>

      <Pressable
        onPress={() => router.push(item.route as never)}
        className="mt-6 self-start overflow-hidden rounded-full"
      >
        <LinearGradient
          colors={["#2E45FF", "#4359FF", "#2D37E6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row items-center rounded-full px-5 py-3"
        >
          <Text style={[fontStyle("700")]} className="text-[15px] text-white">
            {item.action}
          </Text>
          <ArrowRight
            size={16}
            color="#FFFFFF"
            strokeWidth={2.5}
            style={{ marginLeft: 6 }}
          />
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
}

function ConnectRow({ peer }: { peer: PeerType }) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="mr-4 flex-1 flex-row items-center">
        <Image
          source={{ uri: peer.avatar }}
          className="mr-3 h-12 w-12 rounded-full"
        />

        <View className="flex-1">
          <Text style={[fontStyle("700")]} className="text-[15px] text-white">
            {peer.name}
          </Text>
          <Text
            style={[fontStyle("400")]}
            className="mt-1 text-[13px] text-[#96A4BA]"
          >
            {peer.school} • {peer.course}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/profile" as never)}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5"
      >
        <Text style={[fontStyle("500")]} className="text-[13px] text-[#E6EEFA]">
          Connect
        </Text>
      </Pressable>
    </View>
  );
}

function ActivityCard({ item }: { item: FeedType }) {
  const Icon = item.icon;

  return (
    <GlassPanel className="mb-4 px-4 py-4">
      <View className="flex-row items-start">
        <View
          className="mr-4 h-12 w-12 items-center justify-center rounded-[16px]"
          style={{ backgroundColor: item.iconBg }}
        >
          <Icon size={20} color={item.iconColor} strokeWidth={2.3} />
        </View>

        <View className="flex-1">
          <Text style={[fontStyle("700")]} className="text-[15px] text-white">
            {item.title}
          </Text>
          <Text
            style={[fontStyle("400")]}
            className="mt-1 text-[13px] leading-6 text-[#94A3B8]"
          >
            {item.subtitle}
          </Text>
        </View>

        <ChevronRight size={16} color="#91A3BD" strokeWidth={2.5} />
      </View>
    </GlassPanel>
  );
}

export default function HomeScreen() {
  const { profile } = useLaunchpad();
  const [menuOpen, setMenuOpen] = useState(false);

  const firstName = profile?.name?.split(" ")[0] || "Michael";

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-[#081024]">
      <StatusBar barStyle="light-content" />

      <View className="flex-1 bg-[#081024]">
        {/* Background */}
        <LinearGradient
          colors={["#071022", "#071020", "#0B1D54"]}
          start={{ x: 0.02, y: 0.1 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />

        <View className="absolute left-[-70] top-[120] h-64 w-64 rounded-full bg-[#0A1642]" />
        <View className="absolute right-[-30] top-[40] h-80 w-80 rounded-full bg-[#1E49E8]/20" />
        <View className="absolute right-[10] top-[220] h-48 w-48 rounded-full bg-[#3A6BFF]/10" />
        <View className="absolute left-[20] top-[540] h-52 w-52 rounded-full bg-[#09162F]" />

        {/* Static top row only */}
        <StaticHeader
          onMenuPress={() => setMenuOpen(true)}
          onProfilePress={() => router.push("/profile" as never)}
          profileName={profile?.name || "Michael Doe"}
          profileAvatar={profile?.avatar}
        />

        <MenuPopover visible={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* Scroll content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 96,
            paddingBottom: 150,
          }}
        >
          <View className="px-5">
            {/* Greeting block scrolls */}
            <View className="pt-4">
              <Text
                style={[fontStyle("400")]}
                className="text-[18px] text-[#A8B1C2]"
              >
                Hi..! {firstName}
              </Text>

              <Text
                style={[fontStyle("500")]}
                className="mt-2 max-w-[270px] text-[34px] leading-[42px] text-white"
              >
                How can Launchpad support your journey today?
              </Text>
            </View>

            {/* Main hero card */}
            <View className="mt-6">
              <HeroCard />
            </View>

            {/* Quick pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
              className="mt-5"
            >
              {quickActions.map((item) => (
                <QuickActionPill key={item.id} item={item} />
              ))}
            </ScrollView>

            {/* Extra content to make home page feel full */}
            <View className="mt-8">
              <SectionTitle
                title="For you today"
                actionLabel="See all"
                onPress={() => router.push("/notifications" as never)}
              />

              <GlassPanel className="px-4 py-4">
                <View className="flex-row items-start justify-between">
                  <View className="mr-4 flex-1">
                    <Text
                      style={[fontStyle("700")]}
                      className="text-[16px] text-white"
                    >
                      Smart next step
                    </Text>
                    <Text
                      style={[fontStyle("400")]}
                      className="mt-2 text-[14px] leading-6 text-[#95A3B8]"
                    >
                      Complete one verified experience and refresh your profile
                      to unlock stronger internship and scholarship matches.
                    </Text>
                  </View>

                  <View className="h-12 w-12 items-center justify-center rounded-[18px] bg-[#11254A]">
                    <Sparkles size={20} color="#7EB7FF" strokeWidth={2.3} />
                  </View>
                </View>

                <View className="mt-5 h-3 overflow-hidden rounded-full bg-[#081121]">
                  <LinearGradient
                    colors={["#2A63FF", "#69B5FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: "78%", height: "100%" }}
                  />
                </View>

                <View className="mt-3 flex-row items-center justify-between">
                  <Text
                    style={[fontStyle("400")]}
                    className="text-[13px] text-[#8EA0B7]"
                  >
                    Career readiness progress
                  </Text>
                  <Text
                    style={[fontStyle("700")]}
                    className="text-[13px] text-white"
                  >
                    78%
                  </Text>
                </View>
              </GlassPanel>
            </View>

            <View className="mt-8">
              <SectionTitle title="Your snapshot" />

              <View className="flex-row flex-wrap justify-between">
                <MiniStat
                  label="Profile"
                  value="84%"
                  icon={Target}
                  color="#14305E"
                />
                <MiniStat
                  label="CV Score"
                  value="91%"
                  icon={FileText}
                  color="#1C1D4F"
                />
                <MiniStat
                  label="Matches"
                  value="26"
                  icon={Search}
                  color="#163C2E"
                />
                <MiniStat
                  label="Growth"
                  value="+12"
                  icon={TrendingUp}
                  color="#422052"
                />
              </View>
            </View>

            <View className="mt-5">
              <SectionTitle
                title="Top opportunities"
                actionLabel="Refresh"
                onPress={() => router.push("/(tabs)/opportunities" as never)}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                {opportunities.map((item) => (
                  <OpportunityCard key={item.id} item={item} />
                ))}
              </ScrollView>
            </View>

            <View className="mt-8">
              <SectionTitle title="CV autopilot" />

              <GlassPanel className="px-4 py-4">
                <View className="flex-row items-center justify-between">
                  <View className="mr-4 flex-1 flex-row items-center">
                    <View className="mr-4 h-14 w-14 items-center justify-center rounded-[20px] bg-[#123067]">
                      <FileText size={22} color="#81B8FF" strokeWidth={2.3} />
                    </View>

                    <View className="flex-1">
                      <Text
                        style={[fontStyle("700")]}
                        className="text-[16px] text-white"
                      >
                        Ready to update your CV
                      </Text>
                      <Text
                        style={[fontStyle("400")]}
                        className="mt-1 text-[13px] leading-6 text-[#95A3B8]"
                      >
                        Two verified activities can already be added to your CV.
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    onPress={() => router.push("/(tabs)/cv" as never)}
                    className="overflow-hidden rounded-full"
                  >
                    <LinearGradient
                      colors={["#2E45FF", "#4659FF", "#2B38EE"]}
                      className="rounded-full px-4 py-3"
                    >
                      <Text
                        style={[fontStyle("700")]}
                        className="text-[13px] text-white"
                      >
                        Update
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </GlassPanel>
            </View>

            <View className="mt-8">
              <SectionTitle
                title="People to connect with"
                actionLabel="View all"
                onPress={() => router.push("/(tabs)/profile" as never)}
              />

              <GlassPanel className="px-4 py-2">
                {peers.map((peer, index) => (
                  <View
                    key={peer.id}
                    className={
                      index !== peers.length - 1
                        ? "border-b border-white/6"
                        : ""
                    }
                  >
                    <ConnectRow peer={peer} />
                  </View>
                ))}
              </GlassPanel>
            </View>

            {/* Keep recent activity last */}
            <View className="mt-8">
              <SectionTitle
                title="Recent activity"
                actionLabel="See all"
                onPress={() => router.push("/notifications" as never)}
              />

              {activityFeed.map((item) => (
                <ActivityCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
