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
}: InputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.inputView}>
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
          <TouchableOpacity style={{ width: "70%",marginLeft:15, }}>
              <Text style={{ fontSize: 16, textAlignVertical:'center'}}>{value ? value : placeholder}</Text>
          </TouchableOpacity>
        )}
        {rightComponent && rightComponent}
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
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.light.textOpacity.text70,
    fontWeight: "500",
    marginLeft: 45,
  },
});
