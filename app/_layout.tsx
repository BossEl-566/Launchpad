import "../global.css";

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { LaunchpadProvider } from "../src/context/LaunchpadContext";

export default function RootLayout() {
  return (
    <LaunchpadProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "#020617" },
        }}
      />
    </LaunchpadProvider>
  );
}
