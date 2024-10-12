import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AddButton = () => (
  <TouchableOpacity style={styles.addBtn} onPress={() => {}}>
    <Text>Add Expense</Text>
  </TouchableOpacity>
);

const AddExpenseScreen = () => {
  return (
    <View>
      <AddButton />
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  addBtn: {
    borderRadius: 12,
    backgroundColor:''
  }
});
