import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface MainButtonProps {
  onPress: () => void;
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const TextButton = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}: MainButtonProps) => (
  <TouchableOpacity style={[styles.addBtn, buttonStyle]} onPress={onPress}>
    <Text style={[styles.addBtnText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  addBtn: {
    borderRadius: 8,
    backgroundColor: Colors.light.tintOpacity.tint100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  addBtnText: {
    color: Colors.dark.text,
    fontWeight: "600",
  },
});
