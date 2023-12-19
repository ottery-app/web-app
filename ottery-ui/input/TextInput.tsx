import * as React from "react";
import { TextInput as InternalTextInput } from "react-native-paper";
import { color, colors } from "../styles/colors";
import { makeValidator, useValidator } from "./useValidator";
import { useThemeMaker } from "../styles/Color";
import { radius } from "../styles/radius";
import { InputProps } from "./Input";
import { clickable } from "../styles/clickable";

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
  placeholder = undefined, //used if you only want a placeholder
  multiline = false,
  numberOfLines = 1,
  onChange = undefined,
  mode = "outlined",
  password = undefined,
  status = undefined,
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
      value={value}
      style={{
        width: "100%",
        ...style,
      }}
      onChangeText={(text) => onChange(text)}
    />
  );
}
