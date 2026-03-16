import React from "react";
import { Stack } from "expo-router";

import { Screen } from "../src/components/ui/Screen";
import { SectionTitle } from "../src/components/ui/SectionTitle";
import { NotificationCard } from "../src/components/cards/NotificationCard";
import { useLaunchpad } from "../src/context/LaunchpadContext";

export default function NotificationsScreen() {
  const { notifications, markNotificationRead } = useLaunchpad();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Notifications",
          headerStyle: { backgroundColor: "#020617" },
          headerTintColor: "#F8FAFC",
          headerShadowVisible: false,
        }}
      />
      <Screen>
        <SectionTitle
          title="Notifications"
          subtitle="All alerts are still local dummy data. Keep the UX and swap the source later."
        />
        {notifications.map((item) => (
          <NotificationCard
            key={item.id}
            item={item}
            onPress={() => markNotificationRead(item.id)}
          />
        ))}
      </Screen>
    </>
  );
}
