import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
// import { TextInput } from "react-native-paper";
import { colors } from "../styles/colors";
import { margin } from "../styles/margin";
import { radius } from "../styles/radius";
import TextInput from "./TextInput";

const PhoneNumberInput = ({ label, value, onChange }) => {
  const validator = () => {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^$/;

    return phoneRegex.test(value);
  };

  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        outlineStyle={{ borderRadius: radius.default }}
        outlineColor={colors.primary.main}
        placeholder="Phone number"
        placeholderTextColor={colors.background.contrast}
        onChange={onChange}
        keyboardType="numeric"
        validator={validator}
        value={value}
        errorMsg={"Please provide a valid number"}
      />
    </View>
  );
};

export default PhoneNumberInput;
