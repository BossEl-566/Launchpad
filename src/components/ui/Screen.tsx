import React, { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
}

export function Screen({ children, scroll = true }: ScreenProps) {
  const content = (
    <View className="flex-1 bg-slate-950">
      <View className="absolute -left-16 top-8 h-52 w-52 rounded-full bg-blue-500/20" />
      <View className="absolute right-0 top-72 h-52 w-52 rounded-full bg-cyan-400/10" />
      <View className="absolute bottom-16 left-8 h-44 w-44 rounded-full bg-fuchsia-500/10" />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-5"
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-5">{children}</View>
      )}
    </View>
  );

  return <SafeAreaView className="flex-1 bg-slate-950">{content}</SafeAreaView>;
}
