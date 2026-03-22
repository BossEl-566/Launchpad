import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    BriefcaseBusiness,
    Check,
    GraduationCap,
    HeartHandshake,
    Microscope,
    Sparkles,
    Target,
    Users
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const skillOptions = [
  "Python",
  "Research",
  "Data Analysis",
  "UI/UX",
  "Public Speaking",
  "Academic Writing",
  "Mobile Development",
  "Leadership",
];

const interestOptions = [
  "Internships",
  "Scholarships",
  "Research",
  "Volunteer Work",
  "Exchange Programs",
  "National Service",
  "Jobs",
  "Peer Networking",
];

const goalOptions = [
  "Product Designer",
  "Software Engineer",
  "Research Assistant",
  "Data Analyst",
  "AI / ML Engineer",
  "UX Researcher",
];

function StepPill({ active, done }: { active?: boolean; done?: boolean }) {
  return (
    <View
      className={`h-2 flex-1 rounded-full ${
        done ? "bg-[#2563EB]" : active ? "bg-[#60A5FA]" : "bg-white/10"
      }`}
    />
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[13px] font-semibold uppercase tracking-[1px] text-[#94A3B8]">
        {label}
      </Text>
      <View className="rounded-[20px] border border-white/10 bg-white/5 px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          className={`text-[15px] text-white ${multiline ? "min-h-[110px] py-4" : "py-4"}`}
        />
      </View>
    </View>
  );
}

function SelectChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 mr-3 rounded-[14px] border px-4 py-3 ${
        selected
          ? "border-[#2563EB] bg-[#1D4ED8]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <View className="flex-row items-center">
        {selected ? (
          <Check
            size={14}
            color="#FFFFFF"
            strokeWidth={2.8}
            style={{ marginRight: 8 }}
          />
        ) : null}
        <Text
          className={`text-[14px] font-semibold ${
            selected ? "text-white" : "text-[#CBD5E1]"
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const [goal, setGoal] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  const totalSteps = 3;

  const progress = useMemo(() => step + 1, [step]);

  function toggleInList(
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function nextStep() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
      return;
    }
    router.replace("/(tabs)/home");
  }

  function prevStep() {
    if (step === 0) {
      router.back();
      return;
    }
    setStep((s) => s - 1);
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#050914]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="absolute left-[-40] top-[-10] h-56 w-56 rounded-full bg-[#2563EB]/18" />
        <View className="absolute right-[-20] top-28 h-44 w-44 rounded-full bg-[#7C3AED]/10" />

        <View className="px-5 pt-4">
          <View className="mb-6 flex-row items-center justify-between">
            <Pressable
              onPress={prevStep}
              className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <ArrowLeft size={18} color="#E2E8F0" strokeWidth={2.4} />
            </Pressable>

            <Text className="text-[13px] font-bold uppercase tracking-[1.4px] text-[#93C5FD]">
              Step {progress} of {totalSteps}
            </Text>
          </View>

          <View className="mb-8 flex-row gap-2">
            {[0, 1, 2].map((index) => (
              <StepPill
                key={index}
                active={index === step}
                done={index < step}
              />
            ))}
          </View>

          <LinearGradient
            colors={["#0E1728", "#0D1A36", "#091120"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="mb-8 overflow-hidden rounded-[32px] border border-white/10 px-5 py-6"
          >
            <View className="absolute right-[-14] top-[-10] h-28 w-28 rounded-full bg-[#3B82F6]/15" />

            {step === 0 ? (
              <>
                <View className="mb-4 self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
                  <Text className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#93C5FD]">
                    Direction
                  </Text>
                </View>

                <Text className="text-[28px] font-extrabold tracking-tight text-white">
                  Tell Launchpad where you want to go
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
                  Your goal helps us shape courses, opportunities, networking,
                  and CV recommendations.
                </Text>
              </>
            ) : step === 1 ? (
              <>
                <View className="mb-4 self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
                  <Text className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#93C5FD]">
                    Strengths
                  </Text>
                </View>

                <Text className="text-[28px] font-extrabold tracking-tight text-white">
                  What are you already building?
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
                  Choose the skills you already have or want to start growing
                  right away.
                </Text>
              </>
            ) : (
              <>
                <View className="mb-4 self-start rounded-full border border-[#60A5FA]/20 bg-[#0B1430] px-3 py-1.5">
                  <Text className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#93C5FD]">
                    Discovery
                  </Text>
                </View>

                <Text className="text-[28px] font-extrabold tracking-tight text-white">
                  What should Launchpad help you find?
                </Text>

                <Text className="mt-3 text-[15px] leading-7 text-[#A8B3C7]">
                  Choose the opportunities and communities you want to see more
                  often.
                </Text>
              </>
            )}
          </LinearGradient>

          <View className="rounded-[28px] border border-white/10 bg-[#0D1424] px-5 py-5">
            {step === 0 ? (
              <>
                <View className="mb-5 flex-row flex-wrap">
                  {goalOptions.map((item) => (
                    <SelectChip
                      key={item}
                      label={item}
                      selected={goal === item}
                      onPress={() => setGoal(item)}
                    />
                  ))}
                </View>

                <InputField
                  label="Short bio / summary"
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Write a short profile summary..."
                  multiline
                />

                <InputField
                  label="Current courses or focus areas"
                  value={courses}
                  onChangeText={setCourses}
                  placeholder="e.g. HCI, Data Structures, Research Methods"
                />
              </>
            ) : step === 1 ? (
              <>
                <View className="mb-2 flex-row items-center">
                  <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#102A63]">
                    <Brain size={20} color="#E5F0FF" strokeWidth={2.3} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[17px] font-extrabold text-white">
                      Select your skills
                    </Text>
                    <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                      These help Launchpad personalize your career path and
                      opportunity quality.
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row flex-wrap">
                  {skillOptions.map((item) => (
                    <SelectChip
                      key={item}
                      label={item}
                      selected={skills.includes(item)}
                      onPress={() => toggleInList(item, skills, setSkills)}
                    />
                  ))}
                </View>
              </>
            ) : (
              <>
                <View className="mb-4 rounded-[24px] border border-white/8 bg-[#101828] px-4 py-4">
                  <View className="flex-row items-center">
                    <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#31124E]">
                      <Sparkles size={20} color="#E5F0FF" strokeWidth={2.3} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[17px] font-extrabold text-white">
                        Pick your discovery interests
                      </Text>
                      <Text className="mt-1 text-[14px] leading-6 text-[#94A3B8]">
                        You can change these later in your profile settings.
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row flex-wrap">
                  {interestOptions.map((item) => (
                    <SelectChip
                      key={item}
                      label={item}
                      selected={interests.includes(item)}
                      onPress={() =>
                        toggleInList(item, interests, setInterests)
                      }
                    />
                  ))}
                </View>

                <View className="mt-6 rounded-[24px] border border-white/8 bg-[#101828] px-4 py-4">
                  <Text className="mb-4 text-[16px] font-extrabold text-white">
                    What Launchpad will use this for
                  </Text>

                  {[
                    {
                      icon: GraduationCap,
                      text: "Elective and course recommendations",
                    },
                    {
                      icon: BriefcaseBusiness,
                      text: "Internship and job matching",
                    },
                    {
                      icon: Microscope,
                      text: "Research and assistantship discovery",
                    },
                    {
                      icon: HeartHandshake,
                      text: "Volunteer and impact opportunities",
                    },
                    { icon: Users, text: "Peer and group recommendations" },
                    {
                      icon: Target,
                      text: "Dynamic CV and career readiness guidance",
                    },
                  ].map(({ icon: Icon, text }) => (
                    <View key={text} className="mb-3 flex-row items-start">
                      <View className="mr-3 mt-0.5 h-8 w-8 items-center justify-center rounded-full bg-blue-500/12">
                        <Icon size={16} color="#60A5FA" strokeWidth={2.4} />
                      </View>
                      <Text className="flex-1 text-[14px] leading-7 text-[#A8B3C7]">
                        {text}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            <Pressable onPress={nextStep} className="mt-6">
              <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center rounded-[18px] px-5 py-4"
              >
                <Text className="text-[15px] font-extrabold text-white">
                  {step === totalSteps - 1 ? "Finish onboarding" : "Continue"}
                </Text>
                <ArrowRight
                  size={16}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                  style={{ marginLeft: 8 }}
                />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
