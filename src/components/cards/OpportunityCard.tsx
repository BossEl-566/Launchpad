import React from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Opportunity } from "../../types";
import { GlassCard } from "../ui/GlassCard";
import { Tag } from "../ui/Tag";

interface OpportunityCardProps {
  item: Opportunity;
  saved?: boolean;
  applied?: boolean;
  onToggleSave?: () => void;
}

export function OpportunityCard({
  item,
  saved = false,
  applied = false,
  onToggleSave,
}: OpportunityCardProps) {
  return (
    <Link href={`/opportunity/${item.id}`} asChild prefetch>
      <Pressable>
        <GlassCard className="mb-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <View className="mb-3 flex-row flex-wrap items-center">
                <Tag label={`${item.matchScore}% match`} tone="blue" />
                <Tag label={item.type} tone="green" />
                <Tag label={item.mode} />
              </View>
              <Text className="text-lg font-bold text-white">{item.title}</Text>
              <Text className="mt-1 text-sm text-slate-400">
                {item.company} • {item.location}
              </Text>
            </View>

            <Pressable onPress={onToggleSave} hitSlop={10}>
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={20}
                color={saved ? "#60A5FA" : "#CBD5E1"}
              />
            </Pressable>
          </View>

          <Text className="mt-4 text-sm leading-6 text-slate-300">{item.summary}</Text>

          <View className="mt-4 flex-row flex-wrap">
            {item.skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </View>

          <View className="mt-5 flex-row items-center justify-between">
            <View>
              <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">
                Deadline
              </Text>
              <Text className="mt-1 text-sm font-medium text-slate-200">
                {item.deadline}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xs uppercase tracking-[1.8px] text-slate-500">
                Reward
              </Text>
              <Text className="mt-1 text-sm font-medium text-slate-200">
                {item.stipend}
              </Text>
            </View>
          </View>

          {applied ? (
            <View className="mt-4 flex-row items-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-3">
              <Ionicons name="checkmark-circle" size={18} color="#34D399" />
              <Text className="ml-2 text-sm font-medium text-emerald-200">
                Application saved locally
              </Text>
            </View>
          ) : null}
        </GlassCard>
      </Pressable>
    </Link>
  );
}
