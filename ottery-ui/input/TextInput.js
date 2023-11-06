import * as React from "react";
import { TextInput as InternalTextInput } from "react-native-paper";
import { colors } from "../styles/colors";
import { makeValidator, useValidator } from "./useValidator";
import { useThemeMaker } from "../styles/Color";

export default function TextInput({
  color = colors.primary,
  value = "",
  label = undefined,
  placeholder = undefined, //used if you only want a placeholder
  onChange = undefined,
  delay = undefined,
  mode = "outlined",
  password = undefined,
  status = undefined,
  style = {},
  validator = makeValidator(status),
}) {
  const validatorStatus = useValidator(validator, value, delay);
  const theme = useThemeMaker({
    primary: color,
    status: status || validatorStatus,
  });

  return (
    <InternalTextInput
      theme={theme}
      secureTextEntry={!!password}
      mode={mode}
      placeholder={placeholder}
      label={label}
      value={value}
      style={{
        width: "100%",
        ...style,
      }}
      onChangeText={(text) => onChange(text)}
    />
  );
}
