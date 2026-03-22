import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    ArrowLeft,
    ArrowRight,
    GraduationCap,
    LockKeyhole,
    Mail,
    School,
    Sparkles,
    UserRound,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[13px] font-semibold uppercase tracking-[1px] text-[#94A3B8]">
        {label}
      </Text>
      <View className="flex-row items-center rounded-[20px] border border-white/10 bg-white/5 px-4">
        <View className="mr-3">{icon}</View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
          className="flex-1 py-4 text-[15px] text-white"
        />
      </View>
    </View>
  );
}

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="absolute left-[-40] top-[-10] h-56 w-56 rounded-full bg-[#2563EB]/18" />
        <View className="absolute right-[-20] top-28 h-44 w-44 rounded-full bg-[#7C3AED]/10" />

        <View className="px-5 pt-4">
          <Pressable
            onPress={() => router.back()}
            className="mb-6 h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          >
            <ArrowLeft size={18} color="#E2E8F0" strokeWidth={2.4} />
          </Pressable>

          <LinearGradient
            colors={["#0E1728", "#0D1A36", "#091120"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="mb-8 overflow-hidden rounded-[32px] border border-white/10 px-5 py-6"
          >
            <View className="absolute right-[-14] top-[-10] h-28 w-28 rounded-full bg-[#3B82F6]/15" />

            <View className="mb-4 self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
              <Text className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#93C5FD]">
                Create account
              </Text>
            </View>

            <Text className="text-[30px] font-extrabold tracking-tight text-white">
              Start with your basics
            </Text>

            <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
              Set up your Launchpad account, then continue into your
              personalized onboarding flow.
            </Text>
          </LinearGradient>

          <View className="rounded-[28px] border border-white/10 bg-[#0D1424] px-5 py-5">
            <AuthInput
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              icon={<UserRound size={18} color="#94A3B8" strokeWidth={2.3} />}
            />

            <AuthInput
              label="School"
              value={school}
              onChangeText={setSchool}
              placeholder="e.g. KNUST"
              icon={<School size={18} color="#94A3B8" strokeWidth={2.3} />}
            />

            <AuthInput
              label="Degree / Program"
              value={degree}
              onChangeText={setDegree}
              placeholder="e.g. Computer Science"
              icon={
                <GraduationCap size={18} color="#94A3B8" strokeWidth={2.3} />
              }
            />

            <AuthInput
              label="Year"
              value={year}
              onChangeText={setYear}
              placeholder="e.g. Level 300 / Year 3"
              icon={<Sparkles size={18} color="#94A3B8" strokeWidth={2.3} />}
            />

            <AuthInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              icon={<Mail size={18} color="#94A3B8" strokeWidth={2.3} />}
            />

            <AuthInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              icon={<LockKeyhole size={18} color="#94A3B8" strokeWidth={2.3} />}
            />

            <Pressable
              onPress={() => router.push("/(auth)/onboarding")}
              className="mt-2"
            >
              <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center rounded-[18px] px-5 py-4"
              >
                <Text className="text-[15px] font-extrabold text-white">
                  Continue to onboarding
                </Text>
                <ArrowRight
                  size={16}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                  style={{ marginLeft: 8 }}
                />
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)/login")}
              className="items-center py-4"
            >
              <Text className="text-[14px] text-[#94A3B8]">
                Already have an account?{" "}
                <Text className="font-bold text-[#60A5FA]">Sign in</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
