import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "../../src/components/ui/Screen";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { Tag } from "../../src/components/ui/Tag";
import { useLaunchpad } from "../../src/context/LaunchpadContext";
import { AnimatedEntrance } from "../../src/components/ui/AnimatedEntrance";

export default function RoadmapScreen() {
  const { profile, milestones, electiveSuggestions } = useLaunchpad();

  return (
    <Screen>
      <View className="pt-2">
        <AnimatedEntrance>
          <SectionTitle
            title="Career roadmap"
            subtitle="A simple AI-generated path built from your profile, course history, and target role."
          />

          <GlassCard className="mb-6">
            <Text className="text-xs uppercase tracking-[1.8px] text-blue-300">
              Target direction
            </Text>
            <Text className="mt-3 text-2xl font-black text-white">{profile.goal}</Text>
            <Text className="mt-3 text-sm leading-6 text-slate-300">
              Focus on product-minded engineering roles where your UI strength, communication, and mobile experience create immediate value.
            </Text>
          </GlassCard>
        </AnimatedEntrance>

        <AnimatedEntrance delay={120}>
          <SectionTitle title="Milestones" subtitle="Suggested steps to move from student builder to strong candidate." />
          {milestones.map((item, index) => {
            const tone =
              item.status === "Done" ? "text-emerald-300" : item.status === "Active" ? "text-blue-300" : "text-slate-500";

            return (
              <GlassCard className="mb-4" key={item.id}>
                <View className="flex-row items-start">
                  <View className="mr-4 items-center">
                    <View
                      className={`h-10 w-10 items-center justify-center rounded-full ${
                        item.status === "Done"
                          ? "bg-emerald-500/15"
                          : item.status === "Active"
                          ? "bg-blue-500/15"
                          : "bg-white/5"
                      }`}
                    >
                      <Ionicons
                        name={
                          item.status === "Done"
                            ? "checkmark-outline"
                            : item.status === "Active"
                            ? "flash-outline"
                            : "lock-closed-outline"
                        }
                        size={18}
                        color={item.status === "Done" ? "#34D399" : item.status === "Active" ? "#60A5FA" : "#94A3B8"}
                      />
                    </View>
                    {index !== milestones.length - 1 ? (
                      <View className="my-1 h-10 w-px bg-white/10" />
                    ) : null}
                  </View>

                  <View className="flex-1">
                    <Text className={`text-base font-semibold ${tone}`}>{item.title}</Text>
                    <Text className="mt-2 text-sm leading-6 text-slate-300">{item.blurb}</Text>
                    <View className="mt-3">
                      <Tag label={item.status} tone={item.status === "Done" ? "green" : item.status === "Active" ? "blue" : "default"} />
                    </View>
                  </View>
                </View>
              </GlassCard>
            );
          })}
        </AnimatedEntrance>

        <AnimatedEntrance delay={220}>
          <SectionTitle title="Elective recommendations" subtitle="These electives support the path you selected." />
          {electiveSuggestions.map((item) => (
            <GlassCard key={item.id} className="mb-4">
              <Text className="text-lg font-semibold text-white">{item.title}</Text>
              <Text className="mt-2 text-sm leading-6 text-slate-300">{item.reason}</Text>
            </GlassCard>
          ))}
        </AnimatedEntrance>
      </View>
    </Screen>
  );
}
