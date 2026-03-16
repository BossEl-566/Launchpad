import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

import {
  activities as initialActivities,
  aiTips,
  courses,
  electiveSuggestions,
  milestones,
  notifications as initialNotifications,
  opportunities as initialOpportunities,
  profile,
  quickStats,
} from "../data/mock";
import { NotificationItem, Opportunity } from "../types";

interface LaunchpadContextValue {
  hasDemoSession: boolean;
  profile: typeof profile;
  quickStats: typeof quickStats;
  opportunities: Opportunity[];
  featuredOpportunities: Opportunity[];
  savedIds: string[];
  appliedIds: string[];
  notifications: NotificationItem[];
  unreadCount: number;
  courses: typeof courses;
  activities: typeof initialActivities;
  milestones: typeof milestones;
  electiveSuggestions: typeof electiveSuggestions;
  aiTips: typeof aiTips;
  startDemoSession: () => void;
  toggleSaveOpportunity: (id: string) => void;
  applyToOpportunity: (id: string) => void;
  markNotificationRead: (id: string) => void;
  getOpportunityById: (id: string) => Opportunity | undefined;
}

const LaunchpadContext = createContext<LaunchpadContextValue | null>(null);

export function LaunchpadProvider({ children }: PropsWithChildren) {
  const [hasDemoSession, setHasDemoSession] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(["opp-2", "opp-4"]);
  const [appliedIds, setAppliedIds] = useState<string[]>(["opp-3"]);
  const [notifications, setNotifications] = useState(initialNotifications);

  const startDemoSession = () => setHasDemoSession(true);

  const toggleSaveOpportunity = (id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [id, ...current]
    );
  };

  const applyToOpportunity = (id: string) => {
    setAppliedIds((current) => (current.includes(id) ? current : [id, ...current]));
    setNotifications((current) => [
      {
        id: `auto-${id}`,
        title: "Application recorded",
        message: "This demo app saved your application locally. Replace this with your API call later.",
        createdAt: "Now",
        tone: "success",
        read: false,
      },
      ...current,
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const featuredOpportunities = useMemo(
    () => initialOpportunities.filter((item) => item.featured).concat(initialOpportunities.filter((item) => !item.featured).slice(0, 3)),
    []
  );

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const value = useMemo(
    () => ({
      hasDemoSession,
      profile,
      quickStats,
      opportunities: initialOpportunities,
      featuredOpportunities,
      savedIds,
      appliedIds,
      notifications,
      unreadCount,
      courses,
      activities: initialActivities,
      milestones,
      electiveSuggestions,
      aiTips,
      startDemoSession,
      toggleSaveOpportunity,
      applyToOpportunity,
      markNotificationRead,
      getOpportunityById: (id: string) =>
        initialOpportunities.find((item) => item.id === id),
    }),
    [hasDemoSession, savedIds, appliedIds, notifications, unreadCount, featuredOpportunities]
  );

  return <LaunchpadContext.Provider value={value}>{children}</LaunchpadContext.Provider>;
}

export function useLaunchpad() {
  const context = useContext(LaunchpadContext);

  if (!context) {
    throw new Error("useLaunchpad must be used within a LaunchpadProvider");
  }

  return context;
}
