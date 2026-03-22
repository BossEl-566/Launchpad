import { LinearGradient } from "expo-linear-gradient";
import { Bell, Menu, MessageSquare } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  name: string;
  avatar?: string | null;
  onMessagesPress: () => void;
  onNotificationsPress: () => void;
  onProfilePress: () => void;
};

export function HomeHeader({
  name,
  avatar,
  onMessagesPress,
  onNotificationsPress,
  onProfilePress,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <View className="px-5 pb-3 pt-2">
      <View className="relative">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => setOpenMenu((prev) => !prev)}
            className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5"
          >
            <Menu size={20} color="#E5E7EB" strokeWidth={2.4} />
          </Pressable>

          <Pressable onPress={onProfilePress}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                className="h-12 w-12 rounded-full border border-white/15"
              />
            ) : (
              <LinearGradient
                colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                className="h-12 w-12 items-center justify-center rounded-full"
              >
                <Text className="text-base font-bold text-white">
                  {name?.charAt(0).toUpperCase()}
                </Text>
              </LinearGradient>
            )}
          </Pressable>
        </View>

        {openMenu ? (
          <View className="absolute left-0 top-16 z-50 w-[200px] rounded-[24px] border border-white/10 bg-[#10182B] p-3">
            <Pressable
              onPress={() => {
                setOpenMenu(false);
                onMessagesPress();
              }}
              className="mb-2 flex-row items-center rounded-[18px] bg-white/5 px-4 py-3"
            >
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#1C2B4A]">
                <MessageSquare size={18} color="#8AB4FF" />
              </View>
              <Text className="text-[15px] font-semibold text-white">
                Messages
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setOpenMenu(false);
                onNotificationsPress();
              }}
              className="flex-row items-center rounded-[18px] bg-white/5 px-4 py-3"
            >
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#1C2B4A]">
                <Bell size={18} color="#8AB4FF" />
              </View>
              <Text className="text-[15px] font-semibold text-white">
                Notifications
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View className="mt-5">
        <Text className="text-[18px] text-[#A7B0C2]">Hi..! {name}</Text>
        <Text className="mt-2 max-w-[290px] text-[28px] font-semibold leading-9 text-white">
          What’s your next career move?
        </Text>
      </View>
    </View>
  );
}
