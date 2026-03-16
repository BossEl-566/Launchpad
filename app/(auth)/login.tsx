import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "../../src/components/ui/Screen";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { useLaunchpad } from "../../src/context/LaunchpadContext";

export default function LoginScreen() {
  const { startDemoSession } = useLaunchpad();
  const [email, setEmail] = useState("student@launchpad.app");
  const [password, setPassword] = useState("123456");

  const handleContinue = () => {
    startDemoSession();
    router.replace("/(tabs)/home");
  };

  return (
    <Screen scroll={false}>
      <View className="flex-1 justify-center">
        <View className="mb-8">
          <Text className="text-3xl font-black text-white">Welcome back</Text>
          <Text className="mt-3 text-base leading-7 text-slate-400">
            This screen uses dummy auth only. Keep the UI and replace the submit
            handler with your Express API later.
          </Text>
        </View>

        <GlassCard>
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-slate-300">Email</Text>
            <View className="flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4">
              <Ionicons name="mail-outline" size={18} color="#94A3B8" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className="flex-1 px-3 py-4 text-base text-white"
                placeholder="yourname@school.edu"
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-2 text-sm font-medium text-slate-300">Password</Text>
            <View className="flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4">
              <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="flex-1 px-3 py-4 text-base text-white"
                placeholder="••••••"
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <GradientButton label="Continue to dashboard" onPress={handleContinue} />
        </GlassCard>

        <Pressable onPress={() => router.back()} className="mt-6 items-center">
          <Text className="font-medium text-slate-400">Back</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
