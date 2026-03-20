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
  Users,
  X,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
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
};

const interestGroups: InterestGroup[] = [
  {
    id: "1",
    name: "UX & Product Careers",
    subtitle: "Internships, portfolio reviews, design peers",
    members: "4.8k members",
    accent: ["#2563EB", "#1D4ED8", "#1E3A8A"],
    icon: Sparkles,
  },
  {
    id: "2",
    name: "Research & Lab Openings",
    subtitle: "Academic roles, assistantships, papers, grants",
    members: "2.1k members",
    accent: ["#0F766E", "#0D9488", "#115E59"],
    icon: Microscope,
  },
  {
    id: "3",
    name: "Scholarships & Exchange",
    subtitle: "Funding alerts, deadlines, application tips",
    members: "3.4k members",
    accent: ["#7C3AED", "#6D28D9", "#4C1D95"],
    icon: GraduationCap,
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

function CompanyMark({ company, type }: { company: string; type: string }) {
  const initials = (company || "LP")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const theme = getTypeTheme(type);

  return (
    <LinearGradient
      colors={["#0F172A", theme.iconBg]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="h-14 w-14 items-center justify-center rounded-[18px] border border-white/10"
    >
      <Text
        className="text-[16px] font-extrabold"
        style={{ color: theme.iconColor }}
      >
        {initials}
      </Text>
    </LinearGradient>
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

function GroupCard({ item }: { item: InterestGroup }) {
  const Icon = item.icon;

  return (
    <LinearGradient
      colors={item.accent}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 250,
        borderRadius: 24,
        padding: 18,
        marginRight: 14,
      }}
    >
      <View className="absolute right-[-8] top-[-8] h-24 w-24 rounded-full bg-white/10" />

      <View className="flex-row items-center justify-between">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
          <Icon size={20} color="#FFFFFF" strokeWidth={2.4} />
        </View>

        <View className="rounded-full bg-white/15 px-3 py-1">
          <Text className="text-[11px] font-bold uppercase tracking-[1px] text-white">
            Group
          </Text>
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

      <Pressable className="mt-5 self-start rounded-[14px] bg-white px-4 py-3">
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
        <CompanyMark company={item.company} type={item.type} />

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
              <View className="flex-row items-start flex-1 pr-4">
                <CompanyMark company={item.company} type={item.type} />
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
                    <View className="mt-1 mr-3 h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
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

export default function OpportunitiesScreen() {
  const { opportunities, savedIds, appliedIds, toggleSaveOpportunity } =
    useLaunchpad();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [selectedItem, setSelectedItem] = useState<OpportunityLite | null>(
    null,
  );

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
          {/* Search starts at top */}
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

          {/* Groups section */}
          <View className="mb-4 flex-row items-end justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-[20px] font-extrabold tracking-tight text-white">
                Groups you may like
              </Text>
              <Text className="mt-1 text-[14px] leading-6 text-[#8A94A7]">
                Join communities around careers, scholarships, and research.
              </Text>
            </View>

            <View className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Users size={18} color="#93C5FD" strokeWidth={2.4} />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {interestGroups.map((group) => (
              <GroupCard key={group.id} item={group} />
            ))}
          </ScrollView>

          {/* Results */}
          <View className="mb-4">
            <Text className="text-[20px] font-extrabold tracking-tight text-white">
              Matches for you
            </Text>
            <Text className="mt-1 text-[14px] leading-6 text-[#8A94A7]">
              Ranked opportunities aligned to your profile and current path.
            </Text>
          </View>

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
    </SafeAreaView>
  );
}
