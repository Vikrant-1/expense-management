import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

interface CloseButtonProps {
  onPress?: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps) => {
  return (
    <Ionicons
      onPress={onPress ? onPress : () => router.back()}
      name="close"
      size={25}
      color={"black"}
    />
  );
};
