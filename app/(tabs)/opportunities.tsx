import { LinearGradient } from "expo-linear-gradient";
import type { LucideIcon } from "lucide-react-native";
import {
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Microscope,
  Search,
  Sparkles,
  X
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../../src/context/LaunchpadContext";

const filters = [
  "All",
  "Internship",
  "Research",
  "Volunteer",
  "Scholarship",
  "Job",
] as const;

type OpportunityLite = {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  summary: string;
};

type InterestGroup = {
  id: string;
  name: string;
  subtitle: string;
  members: string;
  accent: [string, string, ...string[]];
  icon: LucideIcon;
  logo: string;
};

const interestGroups: InterestGroup[] = [
  {
    id: "1",
    name: "UX & Product Careers",
    subtitle: "Internships, portfolio reviews, design peers",
    members: "4.8k members",
    accent: ["#2563EB", "#1D4ED8", "#1E3A8A"],
    icon: Sparkles,
    logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Research & Lab Openings",
    subtitle: "Academic roles, assistantships, papers, grants",
    members: "2.1k members",
    accent: ["#0F766E", "#0D9488", "#115E59"],
    icon: Microscope,
    logo: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Scholarships & Exchange",
    subtitle: "Funding alerts, deadlines, application tips",
    members: "3.4k members",
    accent: ["#7C3AED", "#6D28D9", "#4C1D95"],
    icon: GraduationCap,
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Volunteer & Impact Network",
    subtitle: "NGOs, service roles, outreach, social impact",
    members: "1.9k members",
    accent: ["#BE185D", "#DB2777", "#9D174D"],
    icon: HeartHandshake,
    logo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format&fit=crop",
  },
];

function getTypeTheme(type: string): {
  Icon: LucideIcon;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
  chipBg: string;
  chipText: string;
} {
  switch (type) {
    case "Internship":
      return {
        Icon: BriefcaseBusiness,
        badgeBg: "#DBEAFE",
        badgeText: "#1D4ED8",
        iconBg: "#102A63",
        iconColor: "#93C5FD",
        chipBg: "#172554",
        chipText: "#93C5FD",
      };
    case "Scholarship":
      return {
        Icon: GraduationCap,
        badgeBg: "#EDE9FE",
        badgeText: "#6D28D9",
        iconBg: "#31124E",
        iconColor: "#C4B5FD",
        chipBg: "#2E1065",
        chipText: "#C4B5FD",
      };
    case "Research":
      return {
        Icon: Microscope,
        badgeBg: "#CCFBF1",
        badgeText: "#0F766E",
        iconBg: "#123B37",
        iconColor: "#5EEAD4",
        chipBg: "#042F2E",
        chipText: "#5EEAD4",
      };
    case "Volunteer":
      return {
        Icon: HeartHandshake,
        badgeBg: "#FCE7F3",
        badgeText: "#BE185D",
        iconBg: "#4A1230",
        iconColor: "#F9A8D4",
        chipBg: "#500724",
        chipText: "#F9A8D4",
      };
    case "Job":
      return {
        Icon: Building2,
        badgeBg: "#E0E7FF",
        badgeText: "#3730A3",
        iconBg: "#1E1B4B",
        iconColor: "#A5B4FC",
        chipBg: "#312E81",
        chipText: "#C7D2FE",
      };
    default:
      return {
        Icon: BriefcaseBusiness,
        badgeBg: "#DBEAFE",
        badgeText: "#1D4ED8",
        iconBg: "#102A63",
        iconColor: "#93C5FD",
        chipBg: "#172554",
        chipText: "#93C5FD",
      };
  }
}

function getCompanyLogo(company: string) {
  const name = (company || "").toLowerCase();

  if (name.includes("google")) return "https://logo.clearbit.com/google.com";
  if (name.includes("microsoft"))
    return "https://logo.clearbit.com/microsoft.com";
  if (name.includes("amazon")) return "https://logo.clearbit.com/amazon.com";
  if (name.includes("meta")) return "https://logo.clearbit.com/meta.com";
  if (name.includes("spotify")) return "https://logo.clearbit.com/spotify.com";
  if (name.includes("netflix")) return "https://logo.clearbit.com/netflix.com";
  if (name.includes("accenture"))
    return "https://logo.clearbit.com/accenture.com";
  if (name.includes("unicef")) return "https://logo.clearbit.com/unicef.org";
  if (name.includes("unesco")) return "https://logo.clearbit.com/unesco.org";
  if (name.includes("giz")) return "https://logo.clearbit.com/giz.de";
  if (name.includes("kpmg")) return "https://logo.clearbit.com/kpmg.com";
  if (name.includes("deloitte"))
    return "https://logo.clearbit.com/deloitte.com";
  if (name.includes("ey")) return "https://logo.clearbit.com/ey.com";
  if (name.includes("pwc")) return "https://logo.clearbit.com/pwc.com";

  const encoded = encodeURIComponent(company || "Launchpad");
  return `https://ui-avatars.com/api/?name=${encoded}&background=0F172A&color=FFFFFF&size=128&bold=true`;
}

function CompanyLogo({ company, type }: { company: string; type: string }) {
  const theme = getTypeTheme(type);
  const uri = getCompanyLogo(company);

  return (
    <View
      className="h-14 w-14 overflow-hidden rounded-[18px] border border-white/10"
      style={{ backgroundColor: theme.iconBg }}
    >
      <Image source={{ uri }} resizeMode="cover" className="h-full w-full" />
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-3 rounded-full border px-4 py-2.5 ${
        active ? "border-[#3B82F6] bg-[#1D4ED8]" : "border-white/10 bg-white/5"
      }`}
    >
      <Text
        className={`text-[13px] font-bold ${
          active ? "text-white" : "text-[#A8B3C7]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function SectionTitleRow({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
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

      {actionLabel ? (
        <Pressable onPress={onActionPress}>
          <Text className="text-[13px] font-extrabold uppercase tracking-[1px] text-[#60A5FA]">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function GroupCard({
  item,
  onJoin,
}: {
  item: InterestGroup;
  onJoin?: () => void;
}) {
  const Icon = item.icon;

  return (
    <LinearGradient
      colors={item.accent}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 252,
        borderRadius: 24,
        padding: 18,
        marginRight: 14,
      }}
    >
      <View className="absolute right-[-8] top-[-8] h-24 w-24 rounded-full bg-white/10" />

      <View className="flex-row items-center justify-between">
        <View className="h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
          <Image
            source={{ uri: item.logo }}
            resizeMode="cover"
            className="h-full w-full"
          />
        </View>

        <View className="h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
          <Icon size={18} color="#FFFFFF" strokeWidth={2.4} />
        </View>
      </View>

      <Text className="mt-5 text-[18px] font-extrabold text-white">
        {item.name}
      </Text>
      <Text className="mt-2 text-[14px] leading-6 text-white/90">
        {item.subtitle}
      </Text>
      <Text className="mt-3 text-[12px] font-semibold text-white/75">
        {item.members}
      </Text>

      <Pressable
        onPress={onJoin}
        className="mt-5 self-start rounded-[14px] bg-white px-4 py-3"
      >
        <Text className="text-[14px] font-extrabold text-[#0F172A]">Join</Text>
      </Pressable>
    </LinearGradient>
  );
}

function OpportunityCard({
  item,
  saved,
  applied,
  onToggleSave,
  onOpen,
}: {
  item: OpportunityLite;
  saved: boolean;
  applied: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
}) {
  const theme = getTypeTheme(item.type);

  return (
    <Pressable
      onPress={onOpen}
      className="mb-4 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4"
    >
      <View className="flex-row items-start">
        <CompanyLogo company={item.company} type={item.type} />

        <View className="ml-4 flex-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <View
                className="self-start rounded-full px-3 py-1"
                style={{ backgroundColor: theme.badgeBg }}
              >
                <Text
                  className="text-[11px] font-extrabold uppercase tracking-[1px]"
                  style={{ color: theme.badgeText }}
                >
                  {item.type}
                </Text>
              </View>

              <Text className="mt-3 text-[17px] font-extrabold text-white">
                {item.title}
              </Text>

              <Text className="mt-1 text-[14px] font-semibold text-[#D6DEED]">
                {item.company || "Partner organization"}
              </Text>

              <View className="mt-2 flex-row items-center">
                <MapPin size={14} color="#94A3B8" strokeWidth={2.3} />
                <Text className="ml-1.5 text-[13px] text-[#94A3B8]">
                  {item.location || "Remote / Flexible"}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                onToggleSave();
              }}
              className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <Bookmark
                size={18}
                color={saved ? "#93C5FD" : "#A8B3C7"}
                strokeWidth={2.4}
                fill={saved ? "rgba(59,130,246,0.18)" : "transparent"}
              />
            </Pressable>
          </View>

          <Text className="mt-3 text-[14px] leading-6 text-[#94A3B8]">
            {item.summary}
          </Text>

          <View className="mt-4 flex-row items-center justify-between">
            <View
              className="rounded-full px-3 py-1.5"
              style={{ backgroundColor: theme.chipBg }}
            >
              <Text
                className="text-[12px] font-bold"
                style={{ color: theme.chipText }}
              >
                {applied ? "Applied" : "View details"}
              </Text>
            </View>

            <View className="flex-row items-center">
              {applied ? (
                <View className="mr-3 flex-row items-center rounded-full bg-emerald-500/12 px-3 py-1.5">
                  <CircleCheckBig size={14} color="#34D399" strokeWidth={2.5} />
                  <Text className="ml-1.5 text-[12px] font-bold text-[#A7F3D0]">
                    Applied
                  </Text>
                </View>
              ) : null}

              <ChevronRight size={18} color="#64748B" strokeWidth={2.4} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function DetailSheet({
  item,
  visible,
  saved,
  applied,
  onClose,
  onToggleSave,
}: {
  item: OpportunityLite | null;
  visible: boolean;
  saved: boolean;
  applied: boolean;
  onClose: () => void;
  onToggleSave: () => void;
}) {
  if (!item) return null;

  const theme = getTypeTheme(item.type);
  const TypeIcon = theme.Icon;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/55">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="max-h-[82%] rounded-t-[32px] border border-white/10 bg-[#0A1220] px-5 pt-3">
          <View className="mb-4 items-center">
            <View className="h-1.5 w-14 rounded-full bg-white/15" />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-row flex-1 items-start pr-4">
                <CompanyLogo company={item.company} type={item.type} />
                <View className="ml-4 flex-1">
                  <View
                    className="self-start rounded-full px-3 py-1"
                    style={{ backgroundColor: theme.badgeBg }}
                  >
                    <Text
                      className="text-[11px] font-extrabold uppercase tracking-[1px]"
                      style={{ color: theme.badgeText }}
                    >
                      {item.type}
                    </Text>
                  </View>

                  <Text className="mt-3 text-[22px] font-extrabold leading-8 text-white">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-[15px] font-semibold text-[#D6DEED]">
                    {item.company || "Partner organization"}
                  </Text>

                  <View className="mt-2 flex-row items-center">
                    <MapPin size={14} color="#94A3B8" strokeWidth={2.3} />
                    <Text className="ml-1.5 text-[13px] text-[#94A3B8]">
                      {item.location || "Remote / Flexible"}
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable
                onPress={onClose}
                className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
              >
                <X size={18} color="#E2E8F0" strokeWidth={2.4} />
              </Pressable>
            </View>

            <View className="mt-5 flex-row items-center">
              <View className="mr-3 flex-row items-center rounded-full bg-[#172554] px-3 py-1.5">
                <BadgeCheck size={14} color="#93C5FD" strokeWidth={2.5} />
                <Text className="ml-1.5 text-[12px] font-bold text-[#93C5FD]">
                  Strong fit
                </Text>
              </View>

              <View className="flex-row items-center rounded-full bg-white/5 px-3 py-1.5">
                <Clock3 size={14} color="#A8B3C7" strokeWidth={2.5} />
                <Text className="ml-1.5 text-[12px] font-bold text-[#A8B3C7]">
                  Updated recently
                </Text>
              </View>
            </View>

            <View className="mt-6 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4">
              <View className="mb-3 flex-row items-center">
                <View
                  className="mr-3 h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: theme.iconBg }}
                >
                  <TypeIcon
                    size={18}
                    color={theme.iconColor}
                    strokeWidth={2.3}
                  />
                </View>
                <Text className="text-[17px] font-extrabold text-white">
                  About this opportunity
                </Text>
              </View>

              <Text className="text-[14px] leading-7 text-[#A8B3C7]">
                {item.summary}
              </Text>
            </View>

            <View className="mt-5 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4">
              <Text className="text-[17px] font-extrabold text-white">
                Why Launchpad recommended this
              </Text>

              <View className="mt-4">
                {[
                  "Matches your course direction and current growth path.",
                  "Fits your verified activity history and profile strength.",
                  "Can improve your CV and readiness score after completion.",
                ].map((reason) => (
                  <View key={reason} className="mb-3 flex-row items-start">
                    <View className="mr-3 mt-1 h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
                    <Text className="flex-1 text-[14px] leading-7 text-[#A8B3C7]">
                      {reason}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="mt-5 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4">
              <Text className="text-[17px] font-extrabold text-white">
                Outcomes
              </Text>

              <View className="mt-4 flex-row flex-wrap">
                {[
                  "CV boost",
                  "Verified experience",
                  "New connections",
                  "Career readiness",
                ].map((tag) => (
                  <View
                    key={tag}
                    className="mr-3 mb-3 rounded-full border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <Text className="text-[13px] font-semibold text-[#D6DEED]">
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="mt-6 flex-row">
              <Pressable className="mr-3 flex-1 items-center rounded-[16px] bg-[#2563EB] px-5 py-4">
                <Text className="text-[15px] font-extrabold text-white">
                  {applied ? "Application submitted" : "Apply now"}
                </Text>
              </Pressable>

              <Pressable
                onPress={onToggleSave}
                className="items-center justify-center rounded-[16px] border border-white/10 bg-white/5 px-5 py-4"
              >
                <Bookmark
                  size={18}
                  color={saved ? "#93C5FD" : "#E2E8F0"}
                  strokeWidth={2.4}
                  fill={saved ? "rgba(59,130,246,0.18)" : "transparent"}
                />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function GroupsSheet({
  visible,
  onClose,
  groups,
}: {
  visible: boolean;
  onClose: () => void;
  groups: InterestGroup[];
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/55">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="max-h-[78%] rounded-t-[32px] border border-white/10 bg-[#0A1220] px-5 pt-3">
          <View className="mb-4 items-center">
            <View className="h-1.5 w-14 rounded-full bg-white/15" />
          </View>

          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-[22px] font-extrabold text-white">
                All groups
              </Text>
              <Text className="mt-1 text-[14px] text-[#94A3B8]">
                Communities you may want to join
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <X size={18} color="#E2E8F0" strokeWidth={2.4} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {groups.map((group) => {
              const Icon = group.icon;

              return (
                <View
                  key={group.id}
                  className="mb-4 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4"
                >
                  <View className="flex-row items-start">
                    <View className="h-14 w-14 overflow-hidden rounded-[18px] border border-white/10">
                      <Image
                        source={{ uri: group.logo }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    </View>

                    <View className="ml-4 flex-1">
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1 pr-3">
                          <Text className="text-[17px] font-extrabold text-white">
                            {group.name}
                          </Text>
                          <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                            {group.subtitle}
                          </Text>
                          <Text className="mt-2 text-[13px] font-semibold text-[#CBD5E1]">
                            {group.members}
                          </Text>
                        </View>

                        <View className="h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
                          <Icon size={18} color="#93C5FD" strokeWidth={2.4} />
                        </View>
                      </View>

                      <Pressable className="mt-4 self-start rounded-[14px] bg-[#2563EB] px-4 py-3">
                        <Text className="text-[14px] font-extrabold text-white">
                          Join group
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function OpportunitiesScreen() {
  const { opportunities, savedIds, appliedIds, toggleSaveOpportunity } =
    useLaunchpad();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [selectedItem, setSelectedItem] = useState<OpportunityLite | null>(
    null,
  );
  const [groupsVisible, setGroupsVisible] = useState(false);

  const filteredItems = useMemo(() => {
    return (opportunities as OpportunityLite[]).filter((item) => {
      const passesType =
        activeFilter === "All" ? true : item.type === activeFilter;
      const haystack =
        `${item.title} ${item.company} ${item.location} ${item.summary}`.toLowerCase();
      const passesQuery = haystack.includes(query.toLowerCase());
      return passesType && passesQuery;
    });
  }, [activeFilter, opportunities, query]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View className="absolute left-[-40] top-20 h-48 w-48 rounded-full bg-[#2563EB]/14" />
        <View className="absolute right-[-20] top-80 h-40 w-40 rounded-full bg-[#7C3AED]/8" />

        <View className="px-5 pt-3">
          <View className="mb-5 flex-row items-center">
            <View className="mr-3 flex-1 flex-row items-center rounded-[22px] border border-white/10 bg-white/5 px-4">
              <Search size={18} color="#94A3B8" strokeWidth={2.4} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search roles, companies, locations..."
                placeholderTextColor="#64748B"
                className="flex-1 px-3 py-4 text-[15px] text-white"
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
              />
            ))}
          </ScrollView>

          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-[14px] text-[#94A3B8]">
              {filteredItems.length} opportunit
              {filteredItems.length === 1 ? "y" : "ies"}
            </Text>

            <Pressable
              onPress={() => {
                setQuery("");
                setActiveFilter("All");
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
            >
              <Text className="text-[12px] font-bold uppercase tracking-[1px] text-[#60A5FA]">
                Clear
              </Text>
            </Pressable>
          </View>

          <SectionTitleRow
            title="Groups you may like"
            subtitle="Join communities around careers, scholarships, and research."
            actionLabel="View all"
            onActionPress={() => setGroupsVisible(true)}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {interestGroups.slice(0, 3).map((group) => (
              <GroupCard key={group.id} item={group} />
            ))}
          </ScrollView>

          <SectionTitleRow
            title="Matches for you"
            subtitle="Ranked opportunities aligned to your profile and current path."
            actionLabel="See all"
            onActionPress={() => {
              setQuery("");
              setActiveFilter("All");
            }}
          />

          {filteredItems.length === 0 ? (
            <View className="rounded-[28px] border border-white/8 bg-[#0F1727] px-5 py-8">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#102A63]">
                <Search size={22} color="#93C5FD" strokeWidth={2.4} />
              </View>
              <Text className="mt-5 text-[20px] font-extrabold text-white">
                No matches found
              </Text>
              <Text className="mt-2 text-[14px] leading-6 text-[#94A3B8]">
                Try another keyword or switch back to “All” to see more
                opportunities.
              </Text>
            </View>
          ) : (
            filteredItems.map((item) => (
              <OpportunityCard
                key={item.id}
                item={item}
                saved={savedIds.includes(item.id)}
                applied={appliedIds.includes(item.id)}
                onToggleSave={() => toggleSaveOpportunity(item.id)}
                onOpen={() => setSelectedItem(item)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <DetailSheet
        item={selectedItem}
        visible={!!selectedItem}
        saved={selectedItem ? savedIds.includes(selectedItem.id) : false}
        applied={selectedItem ? appliedIds.includes(selectedItem.id) : false}
        onClose={() => setSelectedItem(null)}
        onToggleSave={() => {
          if (selectedItem) toggleSaveOpportunity(selectedItem.id);
        }}
      />

      <GroupsSheet
        visible={groupsVisible}
        onClose={() => setGroupsVisible(false)}
        groups={interestGroups}
      />
    </SafeAreaView>
  );
}
