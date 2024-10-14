import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  isTextInput?: boolean;
  inputType?: string;
  onPressText?: () => void;
}

const Input = ({
  rightComponent,
  leftComponent,
  style,
  label,
  inputStyle,
  isTextInput = true,
  value,
  keyboardType,
  onChangeText,
  placeholder,
  onPressText,
}: InputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.inputView}>
        <View style={{ width: "85%", flexDirection: "row" }}>
          {leftComponent && leftComponent}
          {isTextInput ? (
            <TextInput
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType ?? "default"}
              style={[styles.input, inputStyle]}
              placeholder={placeholder}
            />
          ) : (
            <TouchableOpacity
              onPress={onPressText}
              style={{
                width: "85%",
                marginLeft: 15,
                marginTop: 2,
              }}
            >
              <Text style={{ fontSize: 16, textAlignVertical: "center" }}>
                {value ? value : placeholder}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{ width: "15%", paddingRight: 15,}}
        >
          {rightComponent && rightComponent}
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginHorizontal: 8,
    marginTop: 20,
  },
  input: {
    width: "70%",
    fontSize: 16,
    marginLeft: 15,
  },
  inputView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 3,
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.light.textOpacity.text70,
    fontWeight: "500",
    marginLeft: 45,
  },
});
