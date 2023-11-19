import * as React from "react";
import { TextInput as InternalTextInput } from "react-native-paper";
import { colors } from "../styles/colors";
import { makeValidator, useValidator } from "./useValidator";
import { useThemeMaker } from "../styles/Color";
import { margin } from "../styles/margin";
import { Text } from "react-native";
import { radius } from "../styles/radius";

export default function TextInput({
  color = colors.primary,
  value = "",
  label = undefined,
  outlineStyle = undefined,
  outlineColor = undefined,
  placeholder = undefined, //used if you only want a placeholder
  placeholderTextColor = undefined,
  onChange = undefined,
  delay = undefined,
  mode = "outlined",
  password = undefined,
  status = undefined,
  keyboardType = "numeric",
  style = {},
  errorMsg = undefined,
  validator = makeValidator(status),
}) {
  const validatorStatus = useValidator(validator, value, delay);
  const theme = useThemeMaker({
    primary: color,
    status: status || validatorStatus,
  });

  return (
    <>
      <InternalTextInput
        theme={{
          ...theme,
          roundness: radius.default,
        }}
        secureTextEntry={!!password}
        mode={mode}
        placeholder={placeholder}
        label={label}
        outlineStyle={{ ...outlineStyle }}
        outlineColor={outlineColor}
        placeholderTextColor={placeholderTextColor}
        value={value}
        keyboardType={keyboardType}
        style={{
          width: "100%",
          ...style,
        }}
        onChangeText={(text) => onChange(text)}
      />
      {(errorMsg && validatorStatus == "error")
        ?<Text
          style={{
            marginLeft: margin.small,
            marginTop: margin.small,
            fontSize: 12,
            color: colors.error.main,
          }}
        >
          {errorMsg}
        </Text>
        :undefined
      }
    </>
  );
}
