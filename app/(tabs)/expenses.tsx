import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";

const AddIcon = () => (
  <TouchableOpacity
    style={styles.addIcon}
    onPress={() => router.navigate("/addexpense")}
  >
    <Ionicons name="add-circle" size={45} color={"dark-gray"} />
  </TouchableOpacity>
);

const ExpenseScreen = () => {
  return (
    <View style={styles.page}>
      <AddIcon />
    </View>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  addIcon: {
    position: "absolute",
    bottom: 20,
    right: 30,
  },
});
