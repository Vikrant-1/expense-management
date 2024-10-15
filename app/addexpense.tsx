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
import React, { useCallback, useRef, useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import TagComponent from "@/components/TagComponent";
import Attachments from "@/components/Attachments";
import { useDocumentPicker } from "@/hooks/useDocumentPicker";

const paymentOptions = [
  { label: "UPI", value: "upi" },
  { label: "Credit Card", value: "credit_card" },
  { label: "Debit Card", value: "debit_card" },
  { label: "Cash", value: "cash" },
  { label: "Net Banking", value: "net_banking" },
  { label: "PayPal", value: "paypal" },
  { label: "Cryptocurrency", value: "crypto" },
];

const AddExpenseScreen = () => {
  const route = useRoute();

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [paymentMode, setPaymentMode] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tagsList, setTagsList] = useState([]);

  const { uploadDocs,docs } = useDocumentPicker();

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.category !== category)
        setCategory(route?.params?.category);
    }, [route?.params?.category])
  );

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

  const paymentTitle = (paymentMode: string) =>
    paymentOptions.find((i) => i.value === paymentMode)?.label;

  // Date -> done
  // Amount + currency handle (2 digit max) -> done
  // Category -> done
  // Payment Mode -> done
  // Tags -> not now
  // attachment multiple photo pdf -> we can do this later
  // notes
  const pickerRef = useRef();

  function open() {
    pickerRef?.current?.focus();
  }

  function close() {
    pickerRef?.current?.blur();
  }
  const PaymentPicker = () => (
    <Picker
      ref={pickerRef}
      mode="dialog"
      selectedValue={paymentMode}
      onValueChange={(itemValue) => setPaymentMode(itemValue)}
      style={{ display: "none" }}
    >
      <Picker.Item
        enabled={false}
        style={{ fontWeight: "700", fontSize: 20 }}
        label="Select the Payment Mode"
        value=""
      />
      <Picker.Item label="UPI" value="upi" />
      <Picker.Item label="Credit Card" value="credit_card" />
      <Picker.Item label="Debit Card" value="debit_card" />
      <Picker.Item label="Cash" value="cash" />
      <Picker.Item label="Net Banking" value="net_banking" />
      <Picker.Item label="PayPal" value="paypal" />
      <Picker.Item label="Cryptocurrency" value="crypto" />
    </Picker>
  );

  const openDocumentPicker = () => {};

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
                onPress={() =>
                  router.navigate({
                    pathname: "/categoryList",
                    params: { category },
                  })
                }
              />
            }
            isTextInput={false}
            onPressText={() =>
              router.navigate({
                pathname: "/categoryList",
                params: { category },
              })
            }
            placeholder="Food ..."
          />
          <Input
            value={paymentTitle(paymentMode)}
            leftComponent={
              <Ionicons
                style={styles.iconView}
                name={"wallet"}
                size={24}
                color={Colors.light.tint}
              />
            }
            rightComponent={<ArrowRightComponent onPress={() => open()} />}
            label="Payment Mode"
            placeholder="Cash"
            onPressText={() => open()}
            isTextInput={false}
          />

          <Input
            leftComponent={
              <Ionicons
                style={styles.iconView}
                name={"document-attach"}
                size={24}
                color={Colors.light.tint}
              />
            }
            rightComponent={<ArrowRightComponent onPress={uploadDocs} />}
            placeholder="Pick your document"
            onPressText={uploadDocs}
            isTextInput={false}
          />

          <Attachments attachments={docs} />
          <TextButton onPress={onPressAddExpense} title="Add Expense" />
          <PaymentPicker />
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
