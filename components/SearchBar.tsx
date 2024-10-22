import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface SearchBarProps {
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholderText?: string;
  style?: ViewStyle;
  onPressClear?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholderText,
  style,
  onPressClear,
}: SearchBarProps) => {
  return (
    <View style={[styles.searchBar, style]}>
      <View
        style={{ width: "85%", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons name={"search"} size={20} color={"gray"} />
        <TextInput
          style={{ marginLeft: 5, width: "100%" }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholderText}
        />
      </View>

      {value?.length > 0 && (
        <Ionicons
          onPress={onPressClear}
          name={"close"}
          size={20}
          color={"gray"}
        />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
