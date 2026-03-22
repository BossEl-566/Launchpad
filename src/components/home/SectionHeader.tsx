import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({ title, actionLabel, onActionPress }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-[22px] font-semibold text-white">{title}</Text>

      {actionLabel ? (
        <Pressable onPress={onActionPress}>
          <Text className="text-[16px] text-[#D7DCE5]">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
