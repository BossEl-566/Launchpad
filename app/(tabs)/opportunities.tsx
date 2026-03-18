import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { OpportunityCard } from "../../src/components/cards/OpportunityCard";
import { Screen } from "../../src/components/ui/Screen";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { Tag } from "../../src/components/ui/Tag";
import { useLaunchpad } from "../../src/context/LaunchpadContext";

// TODO: Add pagination and sorting options. Consider adding a "Recommended for you" section at the top that surfaces AI-personalized matches based on the user's profile and activity.

const filters = [
  "All",
  "Internship",
  "Research",
  "Volunteer",
  "Scholarship",
  "Job",
];

export default function OpportunitiesScreen() {
  const { opportunities, savedIds, appliedIds, toggleSaveOpportunity } =
    useLaunchpad();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = useMemo(() => {
    return opportunities.filter((item) => {
      const passesType =
        activeFilter === "All" ? true : item.type === activeFilter;
      const haystack =
        `${item.title} ${item.company} ${item.location} ${item.summary}`.toLowerCase();
      const passesQuery = haystack.includes(query.toLowerCase());
      return passesType && passesQuery;
    });
  }, [activeFilter, opportunities, query]);

  return (
    <Screen>
      <View className="pt-2">
        <SectionTitle
          title="Opportunity matches"
          subtitle="Search and filter internships, research, scholarships, volunteer work, and jobs."
        />

        <View className="mb-5 flex-row items-center rounded-[22px] border border-white/10 bg-white/5 px-4">
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by role, company, or city"
            placeholderTextColor="#64748B"
            className="flex-1 px-3 py-4 text-base text-white"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {filters.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className="mr-3"
            >
              <Tag
                label={filter}
                tone={activeFilter === filter ? "blue" : "default"}
              />
            </Pressable>
          ))}
        </ScrollView>

        <Text className="mb-4 text-sm text-slate-400">
          Showing {filteredItems.length} result
          {filteredItems.length === 1 ? "" : "s"}
        </Text>

        {filteredItems.map((item) => (
          <OpportunityCard
            key={item.id}
            item={item}
            saved={savedIds.includes(item.id)}
            applied={appliedIds.includes(item.id)}
            onToggleSave={() => toggleSaveOpportunity(item.id)}
          />
        ))}
      </View>
    </Screen>
  );
}
