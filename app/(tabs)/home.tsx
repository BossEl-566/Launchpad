import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { CourseCard } from "../../src/components/cards/CourseCard";
import { OpportunityCard } from "../../src/components/cards/OpportunityCard";
import { StatCard } from "../../src/components/cards/StatCard";
import { AnimatedEntrance } from "../../src/components/ui/AnimatedEntrance";
import { Avatar } from "../../src/components/ui/Avatar";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { Screen } from "../../src/components/ui/Screen";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { useLaunchpad } from "../../src/context/LaunchpadContext";

export default function HomeScreen() {
  const {
    profile,
    quickStats,
    featuredOpportunities,
    courses,
    savedIds,
    appliedIds,
    toggleSaveOpportunity,
    aiTips,
  } = useLaunchpad();

  return (
    <Screen>
      <View className="pt-2">
        <AnimatedEntrance>
          <View className="mb-6 flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-sm uppercase tracking-[2px] text-blue-300">
                Launchpad
              </Text>
              <Text className="mt-2 text-3xl font-black text-white">
                Hi, {profile.name.split(" ")[0]}
              </Text>
              <Text className="mt-2 text-base leading-7 text-slate-400">
                Your profile is looking strong. Here are the smartest next moves
                for this week.
              </Text>
            </View>
            <Avatar uri={profile.avatar} name={profile.name} size={54} />
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={80}>
          <View className="mb-6 rounded-[28px] border border-white/10 bg-slate-900 px-5 py-5">
            <View className="border border-white/10 bg-blue-500/10 px-5 py-5">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-xs uppercase tracking-[2px] text-blue-200">
                    AI weekly insight
                  </Text>
                  <Text className="mt-3 text-2xl font-black text-white">
                    You are close to a recruiter-ready CV.
                  </Text>
                  <Text className="mt-3 text-sm leading-6 text-slate-200">
                    Add one quantified result to your internship experience and
                    apply to 2 high-match roles.
                  </Text>
                </View>
                <View className="rounded-2xl bg-white/10 p-4">
                  <Ionicons name="flash-outline" size={28} color="#93C5FD" />
                </View>
              </View>
              <View className="mt-5 flex-row items-center gap-3">
                <View className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <View className="h-full w-[84%] rounded-full bg-blue-400" />
                </View>
                <Text className="text-sm font-semibold text-white">84%</Text>
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={120}>
          <View className="mb-2">
            <SectionTitle
              title="Performance snapshot"
              subtitle="Quick health check across your academic and opportunity profile."
            />
          </View>
          <View className="mb-6 flex-row">
            {quickStats.map((item) => (
              <StatCard
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={180}>
          <SectionTitle
            title="AI next actions"
            subtitle="Small steps that improve your career readiness this week."
            action={
              <Pressable onPress={() => router.push("/ai-coach")}>
                <Text className="font-medium text-blue-300">Open coach</Text>
              </Pressable>
            }
          />

          {aiTips.map((tip, index) => (
            <GlassCard key={tip} className="mb-4">
              <View className="flex-row items-start">
                <View className="mr-4 mt-1 h-7 w-7 items-center justify-center rounded-full bg-blue-500/15">
                  <Text className="text-sm font-bold text-blue-200">
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-sm leading-6 text-slate-300">
                  {tip}
                </Text>
              </View>
            </GlassCard>
          ))}
        </AnimatedEntrance>

        <AnimatedEntrance delay={260}>
          <SectionTitle
            title="Featured matches"
            subtitle="Opportunities ranked by your profile, skills, and activity history."
            action={
              <Pressable onPress={() => router.push("/(tabs)/opportunities")}>
                <Text className="font-medium text-blue-300">See all</Text>
              </Pressable>
            }
          />

          {featuredOpportunities.slice(0, 3).map((item) => (
            <OpportunityCard
              key={item.id}
              item={item}
              saved={savedIds.includes(item.id)}
              applied={appliedIds.includes(item.id)}
              onToggleSave={() => toggleSaveOpportunity(item.id)}
            />
          ))}
        </AnimatedEntrance>

        <AnimatedEntrance delay={340}>
          <SectionTitle
            title="This semester"
            subtitle="Courses feeding directly into your product and AI career path."
          />
          <View className="mb-6 flex-row">
            {courses.map((course) => (
              <CourseCard key={course.id} item={course} />
            ))}
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={420}>
          <GlassCard className="overflow-hidden">
            <Text className="text-xl font-bold text-white">
              Need fast focus?
            </Text>
            <Text className="mt-2 text-sm leading-6 text-slate-300">
              Open your roadmap and follow the next milestone that improves your
              employability score.
            </Text>
            <View className="mt-5">
              <GradientButton
                label="View roadmap"
                secondary
                onPress={() => router.push("/(tabs)/roadmap")}
              />
            </View>
          </GlassCard>
        </AnimatedEntrance>
      </View>
    </Screen>
  );
}
