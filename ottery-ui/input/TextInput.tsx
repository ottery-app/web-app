import * as React from "react";
import { TextInput as InternalTextInput } from "react-native-paper";
import { color, colors } from "../styles/colors";
import { makeValidator, useValidator } from "./useValidator";
import { useThemeMaker } from "../styles/Color";
import { margin } from "../styles/margin";
import { Text } from "react-native";
import { radius } from "../styles/radius";
import { InputProps } from "./Input";

export interface TextInputProps extends InputProps<string> {
  color?: color;
  placeholder?: string;
  password?: boolean;
  mode?: any;
  status?: string;
  style?: any;
  validator?: (val: any) => boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function TextInput({
  color = colors.primary,
  value = "",
  label = undefined,
  //outlineStyle = undefined,
  //outlineColor = undefined,
  placeholder = undefined, //used if you only want a placeholder
  //placeholderTextColor = undefined,
  multiline = false,
  numberOfLines = 1,
  onChange = undefined,
  mode = "outlined",
  password = undefined,
  status = undefined,
  //keyboardType = "numeric",
  style = {},
  validator = makeValidator(status),
}: TextInputProps) {
  const validatorStatus = useValidator(validator, value, 1000);
  const theme = useThemeMaker({
    primary: color,
    status: status || validatorStatus,
  });

  return (
    <InternalTextInput
      theme={{
        ...theme,
        roundness: radius.default,
      }}
      secureTextEntry={!!password}
      mode={mode}
      placeholder={placeholder}
      label={label}
      multiline={multiline}
      numberOfLines={numberOfLines}
      //outlineStyle={{ ...outlineStyle }}
      //outlineColor={outlineColor}
      //placeholderTextColor={placeholderTextColor}
      value={value}
      //keyboardType={keyboardType}
      style={{
        width: "100%",
        ...style,
      }}
      onChangeText={(text) => onChange(text)}
    />
  );
}
