import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "../../src/components/ui/Screen";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { Tag } from "../../src/components/ui/Tag";
import { ActivityCard } from "../../src/components/cards/ActivityCard";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { useLaunchpad } from "../../src/context/LaunchpadContext";

export default function CvScreen() {
  const { profile, activities } = useLaunchpad();

  return (
    <Screen>
      <View className="pt-2">
        <SectionTitle title="Dynamic CV" subtitle="A clean resume view built from verified experiences and editable profile data." />

        <GlassCard className="mb-6">
          <Text className="text-3xl font-black text-white">{profile.name}</Text>
          <Text className="mt-2 text-base text-blue-200">{profile.goal}</Text>
          <Text className="mt-4 text-sm leading-7 text-slate-300">{profile.summary}</Text>

          <View className="mt-5 flex-row flex-wrap">
            {profile.skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </View>

          <View className="mt-6 flex-row gap-3">
            <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">
                CV readiness
              </Text>
              <Text className="mt-2 text-2xl font-bold text-white">91%</Text>
            </View>
            <View className="flex-1 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
              <Text className="text-xs uppercase tracking-[1.8px] text-blue-200">
                AI suggestion
              </Text>
              <Text className="mt-2 text-sm font-medium leading-6 text-slate-100">
                Add metrics to 2 bullets and you are recruiter-ready.
              </Text>
            </View>
          </View>
        </GlassCard>

        <SectionTitle title="Experience feed" subtitle="Each approved activity can become a verified CV entry." />

        {activities.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}

        <GlassCard className="mt-2">
          <View className="flex-row items-center">
            <View className="mr-4 rounded-2xl bg-blue-500/15 p-3">
              <Ionicons name="download-outline" size={18} color="#60A5FA" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-white">Export later</Text>
              <Text className="mt-1 text-sm leading-6 text-slate-300">
                Keep this button and connect it to your backend PDF export when ready.
              </Text>
            </View>
          </View>

          <View className="mt-5">
            <GradientButton label="Mock export action" secondary />
          </View>
        </GlassCard>
      </View>
    </Screen>
  );
}
