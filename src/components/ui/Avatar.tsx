import React from "react";
import { Image, Text, View } from "react-native";
import { initialsFromName } from "../../lib/helpers";

interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
}

export function Avatar({ uri, name, size = 56 }: AvatarProps) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  return (
    <View
      className="items-center justify-center rounded-full bg-blue-500/20"
      style={{ width: size, height: size }}
    >
      <Text className="text-lg font-bold text-white">{initialsFromName(name)}</Text>
    </View>
  );
}
