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
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AMOUNT_REGX } from "@/utils/Regx";

const AddExpenseScreen = () => {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [paymentMode, setPaymentMode] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  const getCurrency = async () => {
    const value = await getLocalCurrency();
    setCurrency(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCurrency();
    }, [])
  );
  const onPressAddExpense = () => {};

  const CurrencyView = () => (
    <TouchableOpacity
      onPress={() => router.navigate("/currency")}
      style={styles.currencyView}
    >
      <Text style={styles.currencyText}>{currency.symbol}</Text>
    </TouchableOpacity>
  );

  type ArrowRightComponentProps = {
    onPress: () => void;
  };
  const ArrowRightComponent = ({ onPress }: ArrowRightComponentProps) => (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={"chevron-forward-outline"}
        size={24}
        color={Colors.light.tint}
      />
    </TouchableOpacity>
  );

  // Date -> done
  // Amount + currency handle (2 digit max) -> done
  // Category
  // Payment Mode
  // Tags
  // attachment multiple photo pdf -> we can do this later
  // notes

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.page}>
          {showDatePicker && (
            <DateTimePicker
              value={expenseDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setExpenseDate(selectedDate || expenseDate);
                setShowDatePicker(false);
              }}
            />
          )}
          <Input
            value={moment(expenseDate).format("DD/MM/YYYY")}
            leftComponent={
              <Ionicons name="calendar" size={24} color={Colors.light.tint} />
            }
            placeholder="10/10/2001"
            isTextInput={false}
            onPressText={() => setShowDatePicker(true)}
          />
          <Input
            value={amount}
            onChangeText={(text) => {
              if (AMOUNT_REGX.test(text)) {
                setAmount(text);
              }
            }}
            leftComponent={<CurrencyView />}
            inputStyle={{ fontSize: 18 }}
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
                name="cafe"
                size={24}
                color={Colors.light.tint}
              />
            }
            label="Category"
            rightComponent={
              <ArrowRightComponent
                onPress={() => router.navigate("/categoryList")}
              />
            }
            isTextInput={false}
            onPressText={() => router.navigate("/categoryList")}
            placeholder="Food ..."
          />
          <Input
            value={paymentMode}
            leftComponent={
              <Ionicons
                style={styles.iconView}
                name={"wallet"}
                size={24}
                color={Colors.light.tint}
              />
            }
            rightComponent={<ArrowRightComponent onPress={() => {}} />}
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
