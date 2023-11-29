import React from "react";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import TextInput from "./TextInput";
import { InputProps } from "./Input";

export interface PhoneNumberInputProps extends InputProps<any> {}

const PhoneNumberInput = ({ label, value, onChange }: PhoneNumberInputProps) => {
  const validator = () => {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^$/;

    return phoneRegex.test(value);
  };

  return (
    <TextInput
      label={label}
      mode="outlined"
      placeholder="Phone number"
      onChange={onChange}
      validator={validator}
      value={value}
      errorMsg={"Please provide a valid number"}
    />
  );
};

export default PhoneNumberInput;
