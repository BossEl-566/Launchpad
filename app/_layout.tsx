import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { LaunchpadProvider } from "../src/context/LaunchpadContext";

export default function RootLayout() {
  return (
    <LaunchpadProvider>
      <StatusBar style="dark" />
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
