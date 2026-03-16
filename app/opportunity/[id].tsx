import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useLaunchpad } from "../../src/context/LaunchpadContext";
import { Screen } from "../../src/components/ui/Screen";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { Tag } from "../../src/components/ui/Tag";
import { GradientButton } from "../../src/components/ui/GradientButton";

export default function OpportunityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getOpportunityById, savedIds, appliedIds, toggleSaveOpportunity, applyToOpportunity } =
    useLaunchpad();

  const item = id ? getOpportunityById(id) : undefined;

  if (!item) {
    return (
      <Screen>
        <Text className="pt-6 text-lg text-white">Opportunity not found.</Text>
      </Screen>
    );
  }

  const saved = savedIds.includes(item.id);
  const applied = appliedIds.includes(item.id);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Opportunity",
          headerStyle: { backgroundColor: "#020617" },
          headerTintColor: "#F8FAFC",
          headerShadowVisible: false,
        }}
      />
      <Screen>
        <View className="pt-4">
          <GlassCard className="mb-5">
            <View className="mb-4 flex-row flex-wrap">
              <Tag label={`${item.matchScore}% match`} tone="blue" />
              <Tag label={item.type} tone="green" />
              <Tag label={item.mode} />
            </View>

            <Text className="text-3xl font-black leading-10 text-white">{item.title}</Text>
            <Text className="mt-3 text-base text-slate-400">
              {item.company} • {item.location}
            </Text>

            <Text className="mt-5 text-sm leading-7 text-slate-300">{item.description}</Text>

            <View className="mt-6 flex-row gap-3">
              <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">Deadline</Text>
                <Text className="mt-2 text-base font-semibold text-white">{item.deadline}</Text>
              </View>
              <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">Reward</Text>
                <Text className="mt-2 text-base font-semibold text-white">{item.stipend}</Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard className="mb-5">
            <Text className="text-lg font-semibold text-white">Skills needed</Text>
            <View className="mt-4 flex-row flex-wrap">
              {item.skills.map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </View>
          </GlassCard>

          <GlassCard className="mb-6">
            <Text className="text-lg font-semibold text-white">Why you qualify</Text>
            <View className="mt-4 flex-row">
              <Ionicons name="sparkles-outline" size={18} color="#60A5FA" />
              <Text className="ml-3 flex-1 text-sm leading-6 text-slate-300">
                Your mobile development experience, research exposure, and communication history make this a strong match. Connect this later to your real AI reasoning API.
              </Text>
            </View>
          </GlassCard>

          <View className="gap-3">
            <GradientButton
              label={applied ? "Application already recorded" : "Apply now"}
              onPress={() => applyToOpportunity(item.id)}
            />
            <Pressable
              onPress={() => toggleSaveOpportunity(item.id)}
              className="items-center rounded-2xl border border-white/10 bg-white/5 py-4"
            >
              <Text className="font-semibold text-slate-200">
                {saved ? "Remove bookmark" : "Save for later"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Screen>
    </>
  );
}
