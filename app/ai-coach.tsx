import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "../src/components/ui/Screen";
import { GlassCard } from "../src/components/ui/GlassCard";
import { SectionTitle } from "../src/components/ui/SectionTitle";
import { GradientButton } from "../src/components/ui/GradientButton";

const conversation = [
  {
    role: "AI Coach",
    text: "You are strongest in mobile product implementation. For the next 30 days, focus on one polished case study and two high-match internship applications.",
  },
  {
    role: "You",
    text: "What should I improve on my CV first?",
  },
  {
    role: "AI Coach",
    text: "Rewrite your internship bullets using numbers. Example: 'Improved dashboard completion rate by 18% through a simplified onboarding flow.'",
  },
];

export default function AiCoachScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "AI Coach",
          headerStyle: { backgroundColor: "#020617" },
          headerTintColor: "#F8FAFC",
          headerShadowVisible: false,
        }}
      />
      <Screen>
        <SectionTitle
          title="AI coach"
          subtitle="A polished placeholder screen you can later connect to your AI endpoint or chat backend."
        />

        {conversation.map((item, index) => (
          <GlassCard
            key={`${item.role}-${index}`}
            className={`mb-4 ${item.role === "You" ? "border-blue-400/20" : ""}`}
          >
            <View className="mb-3 flex-row items-center">
              <View className={`mr-3 rounded-2xl p-3 ${item.role === "You" ? "bg-blue-500/15" : "bg-white/5"}`}>
                <Ionicons
                  name={item.role === "You" ? "person-outline" : "sparkles-outline"}
                  size={18}
                  color={item.role === "You" ? "#60A5FA" : "#E2E8F0"}
                />
              </View>
              <Text className="text-base font-semibold text-white">{item.role}</Text>
            </View>
            <Text className="text-sm leading-7 text-slate-300">{item.text}</Text>
          </GlassCard>
        ))}

        <GlassCard>
          <Text className="text-lg font-semibold text-white">Next backend hook</Text>
          <Text className="mt-3 text-sm leading-6 text-slate-300">
            Replace this with streamed chat responses, recommendation explanations, or personalized application advice.
          </Text>

          <View className="mt-5">
            <GradientButton label="Wire to AI later" secondary />
          </View>
        </GlassCard>
      </Screen>
    </>
  );
}
