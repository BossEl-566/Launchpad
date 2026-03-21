import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import {
    BellRing,
    Brain,
    ChevronRight,
    Compass,
    MessageCircleMore,
    Plus,
    Search,
    Send,
    Sparkles,
    UserPlus,
    Users,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunchpad } from "../src/context/LaunchpadContext";

type ChatItem = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
};

type FriendSuggestion = {
  id: string;
  name: string;
  school: string;
  course: string;
  avatar: string;
};

type GroupItem = {
  id: string;
  name: string;
  subtitle: string;
  members: string;
  image: string;
  accent: [string, string, ...string[]];
};

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  onPress: () => void;
};

const mockChats: ChatItem[] = [
  {
    id: "1",
    name: "Sarah Owusu",
    role: "CS • City Uni",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    lastMessage:
      "I found a UX internship that matches your path. Check it out.",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Research Lab Group",
    role: "Group chat",
    avatar:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=200&auto=format&fit=crop",
    lastMessage: "New assistantship opening was posted this morning.",
    time: "14m",
    unread: 5,
  },
  {
    id: "3",
    name: "Dr. Mensah",
    role: "Lecturer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    lastMessage: "Your research proposal summary looks promising.",
    time: "1h",
    online: true,
  },
  {
    id: "4",
    name: "Volunteer Impact Circle",
    role: "Group chat",
    avatar:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=200&auto=format&fit=crop",
    lastMessage: "Weekend outreach schedule has been updated.",
    time: "3h",
  },
];

const friendSuggestions: FriendSuggestion[] = [
  {
    id: "1",
    name: "Ama Serwaa",
    school: "UCC",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "David Ofori",
    school: "KNUST",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Linda Asante",
    school: "UG",
    course: "Computer Science",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop",
  },
];

const groups: GroupItem[] = [
  {
    id: "1",
    name: "UX & Product Careers",
    subtitle: "Peers, portfolio reviews, internship drops",
    members: "4.8k members",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop",
    accent: ["#2563EB", "#1D4ED8", "#1E3A8A"],
  },
  {
    id: "2",
    name: "Research & Labs",
    subtitle: "Assistantships, papers, conferences, grants",
    members: "2.1k members",
    image:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=400&auto=format&fit=crop",
    accent: ["#0F766E", "#0D9488", "#115E59"],
  },
  {
    id: "3",
    name: "Scholarships & Exchange",
    subtitle: "Funding alerts, deadlines, tips",
    members: "3.4k members",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop",
    accent: ["#7C3AED", "#6D28D9", "#4C1D95"],
  },
];

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

function QuickActionCard({ item }: { item: QuickAction }) {
  const Icon = item.icon;

  return (
    <Pressable
      onPress={item.onPress}
      className="mr-4 w-[220px] rounded-[24px] border border-white/8 bg-[#101828] px-4 py-4"
    >
      <View
        className="mb-4 h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: item.accent }}
      >
        <Icon size={20} color="#EAF2FF" strokeWidth={2.3} />
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

function ChatRow({ item }: { item: ChatItem }) {
  return (
    <Pressable className="mb-4 rounded-[24px] border border-white/8 bg-[#0F1727] px-4 py-4">
      <View className="flex-row items-start">
        <View className="relative">
          <Image
            source={{ uri: item.avatar }}
            className="h-14 w-14 rounded-[18px]"
          />
          {item.online ? (
            <View className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#0F1727] bg-emerald-400" />
          ) : null}
        </View>

        <View className="ml-4 flex-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[16px] font-extrabold text-white">
                {item.name}
              </Text>
              <Text className="mt-0.5 text-[13px] font-medium text-[#94A3B8]">
                {item.role}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-[12px] font-bold text-[#64748B]">
                {item.time}
              </Text>
              {item.unread ? (
                <View className="mt-2 rounded-full bg-[#2563EB] px-2 py-1">
                  <Text className="text-[10px] font-extrabold text-white">
                    {item.unread > 9 ? "9+" : item.unread}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <Text
            numberOfLines={2}
            className="mt-3 text-[14px] leading-6 text-[#A8B3C7]"
          >
            {item.lastMessage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function FriendCard({ item }: { item: FriendSuggestion }) {
  return (
    <View className="mr-4 w-[220px] rounded-[24px] border border-white/8 bg-[#101828] px-4 py-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.avatar }}
          className="h-14 w-14 rounded-[18px]"
        />
        <View className="ml-3 flex-1">
          <Text className="text-[16px] font-extrabold text-white">
            {item.name}
          </Text>
          <Text className="mt-1 text-[13px] text-[#94A3B8]">
            {item.school} • {item.course}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row">
        <Pressable className="mr-2 flex-1 flex-row items-center justify-center rounded-[14px] bg-[#2563EB] px-4 py-3">
          <UserPlus size={15} color="#FFFFFF" strokeWidth={2.4} />
          <Text className="ml-2 text-[13px] font-extrabold text-white">
            Connect
          </Text>
        </Pressable>

        <Pressable className="flex-1 flex-row items-center justify-center rounded-[14px] border border-white/10 bg-white/5 px-4 py-3">
          <Send size={15} color="#E2E8F0" strokeWidth={2.4} />
          <Text className="ml-2 text-[13px] font-bold text-[#E2E8F0]">
            Message
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function GroupCard({ item }: { item: GroupItem }) {
  return (
    <LinearGradient
      colors={item.accent}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 260,
        borderRadius: 24,
        padding: 18,
        marginRight: 14,
      }}
    >
      <View className="absolute right-[-8] top-[-8] h-24 w-24 rounded-full bg-white/10" />

      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        className="h-14 w-14 rounded-[18px] border border-white/15"
      />

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
        <Text className="text-[14px] font-extrabold text-[#0F172A]">
          Join group
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

export default function MessagesScreen() {
  const { profile } = useLaunchpad();
  const [query, setQuery] = useState("");

  const filteredChats = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return mockChats;
    return mockChats.filter((item) =>
      `${item.name} ${item.role} ${item.lastMessage}`.toLowerCase().includes(q),
    );
  }, [query]);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Start new chat",
      subtitle: "Message a friend, peer, lecturer, or opportunity contact.",
      icon: MessageCircleMore,
      accent: "#102A63",
      onPress: () => {},
    },
    {
      id: "2",
      title: "Find friends",
      subtitle: "Discover students in the same course across universities.",
      icon: UserPlus,
      accent: "#31124E",
      onPress: () => {},
    },
    {
      id: "3",
      title: "Join groups",
      subtitle:
        "Enter communities for careers, research, scholarships, and more.",
      icon: Users,
      accent: "#0F3B2D",
      onPress: () => {},
    },
    {
      id: "4",
      title: "AI conversation help",
      subtitle:
        "Get suggestions for intros, networking messages, and follow-ups.",
      icon: Brain,
      accent: "#3B1A52",
      onPress: () => router.push("/ai-coach"),
    },
  ];

  const unreadCount = mockChats.reduce(
    (sum, item) => sum + (item.unread ?? 0),
    0,
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View className="absolute left-[-50] top-[-20] h-56 w-56 rounded-full bg-[#2563EB]/20" />
        <View className="absolute right-[-30] top-24 h-48 w-48 rounded-full bg-[#7C3AED]/10" />
        <View className="absolute left-20 top-[540] h-40 w-40 rounded-full bg-[#0EA5E9]/8" />

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
              <Sparkles size={14} color="#60A5FA" strokeWidth={2.4} />
              <Text className="ml-2 text-[12px] font-bold uppercase tracking-[1.5px] text-[#93C5FD]">
                MESSAGE HUB
              </Text>
            </View>

            <Text className="text-[30px] font-extrabold tracking-tight text-white">
              Messages
            </Text>

            <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
              Connect with friends, classmates, lecturers, researchers, and
              groups that match your academic and career journey,{" "}
              {profile?.name?.split(" ")[0] || "there"}.
            </Text>

            <GlassCard className="mt-5 px-4 py-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#60A5FA]">
                    Communication focus
                  </Text>
                  <Text className="mt-2 text-[18px] font-extrabold text-white">
                    Build your network early. Conversations can lead to
                    internships, research openings, referrals, and support
                    communities.
                  </Text>
                </View>

                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#0F235B]">
                  <MessageCircleMore
                    size={20}
                    color="#93C5FD"
                    strokeWidth={2.4}
                  />
                </View>
              </View>
            </GlassCard>

            <View className="mt-5 flex-row items-center">
              <Pressable className="mr-3 flex-row items-center rounded-[16px] bg-[#2563EB] px-5 py-3.5">
                <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                <Text className="ml-2 text-[15px] font-extrabold text-white">
                  New message
                </Text>
              </Pressable>

              <Pressable className="flex-row items-center rounded-[16px] border border-white/10 bg-white/5 px-5 py-3.5">
                <Users size={16} color="#C7D2FE" strokeWidth={2.3} />
                <Text className="ml-2 text-[15px] font-bold text-[#E2E8F0]">
                  Browse groups
                </Text>
              </Pressable>
            </View>
          </LinearGradient>

          {/* Search */}
          <View className="mb-6 flex-row items-center rounded-[22px] border border-white/10 bg-white/5 px-4">
            <Search size={18} color="#94A3B8" strokeWidth={2.4} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search chats, people, groups..."
              placeholderTextColor="#64748B"
              className="flex-1 px-3 py-4 text-[15px] text-white"
            />
          </View>

          {/* Stats */}
          <SectionHeader
            title="Inbox snapshot"
            subtitle="Your current communication activity at a glance."
          />

          <View className="mb-6 flex-row flex-wrap justify-between">
            <GlassCard className="mb-3 w-[48.5%] px-4 py-4">
              <View className="mb-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#102A63]">
                <MessageCircleMore
                  size={20}
                  color="#E5F0FF"
                  strokeWidth={2.3}
                />
              </View>
              <Text className="text-[13px] font-medium uppercase tracking-[1px] text-[#8D97A9]">
                Active chats
              </Text>
              <Text className="mt-2 text-[24px] font-extrabold text-white">
                {mockChats.length}
              </Text>
            </GlassCard>

            <GlassCard className="mb-3 w-[48.5%] px-4 py-4">
              <View className="mb-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#31124E]">
                <BellRing size={20} color="#E5F0FF" strokeWidth={2.3} />
              </View>
              <Text className="text-[13px] font-medium uppercase tracking-[1px] text-[#8D97A9]">
                Unread
              </Text>
              <Text className="mt-2 text-[24px] font-extrabold text-white">
                {unreadCount}
              </Text>
            </GlassCard>
          </View>

          {/* Quick actions */}
          <SectionHeader
            title="Communication shortcuts"
            subtitle="Fast actions students are likely to need here."
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

          {/* Recent chats */}
          <SectionHeader
            title="Recent chats"
            subtitle="Continue where you left off with people and communities."
            action={
              <Pressable className="flex-row items-center">
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

          {filteredChats.map((item) => (
            <ChatRow key={item.id} item={item} />
          ))}

          {/* Friends */}
          <SectionHeader
            title="People you may know"
            subtitle="Peers in the same course or path that you may want to connect with."
            action={
              <Pressable className="flex-row items-center">
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
            {friendSuggestions.map((item) => (
              <FriendCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Groups */}
          <SectionHeader
            title="Groups to join"
            subtitle="Enter communities that support your academics, opportunities, and growth."
            action={
              <Pressable className="flex-row items-center">
                <Text className="text-[13px] font-extrabold uppercase tracking-[1px] text-[#60A5FA]">
                  Explore all
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
            {groups.map((item) => (
              <GroupCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Discovery / extra */}
          <SectionHeader
            title="Why messaging matters here"
            subtitle="Launchpad is more powerful when students can collaborate, ask, and discover together."
          />

          <GlassCard className="px-5 py-5">
            {[
              "Find classmates and peers in the same course across universities.",
              "Join scholarship, research, internship, and volunteering groups.",
              "Message lecturers, mentors, or opportunity contacts directly.",
              "Turn networking into referrals, collaborations, and verified experience.",
            ].map((item, index) => (
              <View
                key={item}
                className={`flex-row items-start ${
                  index !== 3 ? "mb-4 border-b border-white/6 pb-4" : ""
                }`}
              >
                <View className="mr-4 mt-1 h-8 w-8 items-center justify-center rounded-full bg-blue-500/12">
                  {index === 0 ? (
                    <Users size={16} color="#60A5FA" strokeWidth={2.4} />
                  ) : index === 1 ? (
                    <Compass size={16} color="#60A5FA" strokeWidth={2.4} />
                  ) : index === 2 ? (
                    <Send size={16} color="#60A5FA" strokeWidth={2.4} />
                  ) : (
                    <Brain size={16} color="#60A5FA" strokeWidth={2.4} />
                  )}
                </View>

                <Text className="flex-1 text-[14px] leading-7 text-[#A8B3C7]">
                  {item}
                </Text>
              </View>
            ))}
          </GlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
