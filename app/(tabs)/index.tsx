import { Text, View } from "react-native";
import "../../global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl text-center font-bold font-bold text-blue-500">
        Welcome to Nativewind! I have been configured and I am ready to use in
        your Expo Router app.
      </Text>
    </View>
  );
}
