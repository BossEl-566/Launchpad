import React from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "../../src/components/ui/Screen";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { AnimatedEntrance } from "../../src/components/ui/AnimatedEntrance";

const features = [
  {
    icon: "sparkles-outline" as const,
    title: "AI career direction",
    text: "Get smart suggestions on electives, internships, and skills to focus on next.",
  },
  {
    icon: "briefcase-outline" as const,
    title: "Opportunity matching",
    text: "See jobs, scholarships, volunteering, and research posts matched to your profile.",
  },
  {
    icon: "document-text-outline" as const,
    title: "Live CV building",
    text: "Turn verified experiences into strong CV entries as you grow through school.",
  },
];

export default function WelcomeScreen() {
  return (
    <Screen>
      <View className="pt-4">
        <AnimatedEntrance>
          <View className="mb-6 flex-row items-center">
            <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-blue-500">
              <Text className="text-xl font-black text-white">L</Text>
            </View>
            <View>
              <Text className="text-2xl font-black tracking-tight text-white">Launchpad</Text>
              <Text className="text-sm text-slate-400">
                Build from classroom to career
              </Text>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <GlassCard className="overflow-hidden p-0">
            <View className="bg-blue-500/15 px-5 py-5">
              <Text className="text-4xl font-black leading-[46px] text-white">
                Become market-ready before graduation.
              </Text>
              <Text className="mt-4 text-base leading-7 text-slate-300">
                A student-focused employability app that tracks growth, recommends the next move,
                and turns real experiences into a polished profile.
              </Text>
            </View>
            <View className="px-5 py-5">
              <View className="flex-row flex-wrap">
                <View className="mr-3 mb-3 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-2">
                  <Text className="text-xs font-semibold uppercase tracking-[1.8px] text-blue-200">
                    Student First
                  </Text>
                </View>
                <View className="mr-3 mb-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <Text className="text-xs font-semibold uppercase tracking-[1.8px] text-slate-200">
                    Fast
                  </Text>
                </View>
                <View className="mb-3 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
                  <Text className="text-xs font-semibold uppercase tracking-[1.8px] text-emerald-200">
                    AI Assisted
                  </Text>
                </View>
              </View>
            </View>
          </GlassCard>
        </AnimatedEntrance>

        <View className="mt-7">
          {features.map((feature, index) => (
            <AnimatedEntrance key={feature.title} delay={180 + index * 80}>
              <GlassCard className="mb-4">
                <View className="flex-row items-start">
                  <View className="mr-4 rounded-2xl bg-blue-500/15 p-3">
                    <Ionicons name={feature.icon} size={20} color="#60A5FA" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-white">{feature.title}</Text>
                    <Text className="mt-2 text-sm leading-6 text-slate-300">{feature.text}</Text>
                  </View>
                </View>
              </GlassCard>
            </AnimatedEntrance>
          ))}
        </View>

        <AnimatedEntrance delay={420}>
          <View className="mt-3 gap-3">
            <GradientButton label="Start demo" onPress={() => router.push("/(auth)/login")} />
            <Pressable onPress={() => router.push("/(tabs)/home")} className="items-center py-3">
              <Text className="font-medium text-slate-400">Skip auth and view the product</Text>
            </Pressable>
          </View>
        </AnimatedEntrance>
      </View>
    </Screen>
  );
}
