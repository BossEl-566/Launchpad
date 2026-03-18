import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { Avatar } from "../../src/components/ui/Avatar";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { Screen } from "../../src/components/ui/Screen";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { Tag } from "../../src/components/ui/Tag";
import { useLaunchpad } from "../../src/context/LaunchpadContext";

// This is a polished student profile screen that can later map directly to the user's real backend profile data. It surfaces key info like name, school, degree, skills, interests, and quick links to notifications and the AI coach.

export default function ProfileScreen() {
  const { profile, savedIds, appliedIds, notifications } = useLaunchpad();

  return (
    <Screen>
      <View className="pt-2">
        <SectionTitle
          title="Profile"
          subtitle="A polished student profile that can later map directly to your real backend."
        />

        <GlassCard className="mb-6">
          <View className="flex-row items-center">
            <Avatar uri={profile.avatar} name={profile.name} size={72} />
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-black text-white">
                {profile.name}
              </Text>
              <Text className="mt-1 text-sm text-slate-400">
                {profile.degree} • {profile.year}
              </Text>
              <Text className="mt-1 text-sm text-blue-200">
                {profile.school}
              </Text>
            </View>
          </View>

          <Text className="mt-5 text-sm leading-7 text-slate-300">
            {profile.summary}
          </Text>

          <View className="mt-6 flex-row gap-3">
            <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">
                Saved
              </Text>
              <Text className="mt-2 text-2xl font-bold text-white">
                {savedIds.length}
              </Text>
            </View>
            <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">
                Applied
              </Text>
              <Text className="mt-2 text-2xl font-bold text-white">
                {appliedIds.length}
              </Text>
            </View>
            <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">
                Alerts
              </Text>
              <Text className="mt-2 text-2xl font-bold text-white">
                {notifications.length}
              </Text>
            </View>
          </View>
        </GlassCard>

        <SectionTitle title="Skills and interests" />

        <GlassCard className="mb-4">
          <Text className="mb-3 text-sm font-medium text-slate-400">
            Skills
          </Text>
          <View className="flex-row flex-wrap">
            {profile.skills.map((item) => (
              <Tag key={item} label={item} />
            ))}
          </View>
        </GlassCard>

        <GlassCard className="mb-6">
          <Text className="mb-3 text-sm font-medium text-slate-400">
            Interests
          </Text>
          <View className="flex-row flex-wrap">
            {profile.interests.map((item) => (
              <Tag key={item} label={item} tone="blue" />
            ))}
          </View>
        </GlassCard>

        <GlassCard>
          <Pressable
            onPress={() => router.push("/notifications")}
            className="flex-row items-center justify-between border-b border-white/8 py-4"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#94A3B8"
              />
              <Text className="ml-3 text-base text-slate-200">
                Notifications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </Pressable>

          <Pressable
            onPress={() => router.push("/ai-coach")}
            className="flex-row items-center justify-between border-b border-white/8 py-4"
          >
            <View className="flex-row items-center">
              <Ionicons name="sparkles-outline" size={18} color="#94A3B8" />
              <Text className="ml-3 text-base text-slate-200">AI coach</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </Pressable>

          <View className="py-4">
            <Text className="mb-4 text-sm leading-6 text-slate-400">
              Keep these rows and connect them to edit profile, settings, and
              backend sync later.
            </Text>
            <GradientButton label="Edit profile later" secondary />
          </View>
        </GlassCard>
      </View>
    </Screen>
  );
}
