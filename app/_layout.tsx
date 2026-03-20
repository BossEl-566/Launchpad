import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LaunchpadProvider } from "../src/context/LaunchpadContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
