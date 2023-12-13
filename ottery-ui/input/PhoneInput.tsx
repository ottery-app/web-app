import React from "react";
import TextInput from "./TextInput";
import { InputProps } from "./Input";
import { isPhone } from "@ottery/ottery-dto";

export interface PhoneNumberInputProps extends InputProps<any> {}

const PhoneNumberInput = ({ label, value, onChange }: PhoneNumberInputProps) => {
  return (
    <TextInput
      label={label}
      mode="outlined"
      placeholder="Phone number"
      onChange={onChange}
      validator={isPhone}
      value={value}
    />
  );
};

export default PhoneNumberInput;
