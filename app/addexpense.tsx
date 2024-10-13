import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { TextButton } from "@/components/Buttons";
import { router, useFocusEffect } from "expo-router";
import { DEFAULT_CURRENCY } from "@/resources/Currencies";
import { getLocalCurrency } from "@/utils/LocalStorage";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

const AddExpenseScreen = () => {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date().toString());
  const [paymentMode, setPaymentMode] = useState("");

  const getCurrency = async () => {
    const value = await getLocalCurrency();
    setCurrency(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCurrency();
    }, [])
  );
  const onPressAddExpense = () => {
    router.navigate("/currency");
  };

  const CurrencyView = () => (
    <TouchableOpacity
      onPress={() => router.navigate("/currency")}
      style={styles.currencyView}
    >
      <Text style={styles.currencyText}>{currency.symbol}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.page}>
          <Input
            value={expenseDate}
            onChangeText={setExpenseDate}
            leftComponent={
              <Ionicons name="calendar" size={24} color={Colors.light.tint} />
            }
            placeholder="0.00"
            keyboardType="numeric"
            editable={false}
            isTextInput={false}
            />
          <Input
            value={amount}
            onChangeText={setAmount}
            leftComponent={<CurrencyView />}
            inputStyle={{fontSize:18}}
            label="Amount"
            placeholder="0.00"
            keyboardType="numeric"
          />
          <Input
            value={category}
            onChangeText={setCategory}
            leftComponent={
              <Ionicons
                style={styles.iconView}
                name="calendar"
                size={24}
                color={Colors.light.tint}
              />
            }
            label="Category"
            placeholder="Food ..."
            keyboardType="numeric"
          />
          <Input
            value={amount}
            onChangeText={setAmount}
            leftComponent={
              <Ionicons
                style={styles.iconView}
                name={"wallet"}
                size={24}
                color={Colors.light.tint}
              />
            }
            label="Payment Mode"
            placeholder="Cash"
            isTextInput={false}
          />
          <TextButton onPress={onPressAddExpense} title="Add Expense" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  inputContainer: {
    width: "100%",
    marginHorizontal: 8,
  },
  input: {
    width: "70%",
    fontSize: 20,
    marginLeft: 10,
  },
  currencyView: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: Colors.light.tintOpacity.tint50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconView: {
    width: 30,
    height: 30,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.textOpacity.text70,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.light.textOpacity.text70,
    fontWeight: "500",
    marginLeft: 40,
  },
});
