import { inputType } from "@ottery/ottery-dto"
import DateInput from "./DateInput"
import ImageInput from "./ImageInput"
import { CheckBox } from "./CheckBox";
import { Dropdown } from "./Dropdown";
import PhoneNumberInput from "./PhoneInput";
import TextInput, { TextInputProps } from "./TextInput";
import React from "react";
import TimeInput from "./TimeInput";
import NumericInput from "./NumericInput";
import { radius } from "../styles/radius";

export interface InputOption<T> {
    label: string;
    value: T;
}

export interface InputProps<T> {
    status?: string, //this is the query status (includes disabled);
    type?: inputType,
    label?: string,
    value: T,
    placeholder?: string,
    onChange: (value:T)=>void,
    //props: any, //custom props for that interface
}

export interface BaseInputProps extends InputProps<any> {
    type: inputType,
}

// const inputs = {
//     [inputType.CHECKBOX]: CheckBox,
//     [inputType.DATE]:DateInput,
//     [inputType.TIME]:TimeInput,
//     [inputType.NUMBER]:NumericInput,
//     [inputType.OPTIONS]:Dropdown,
//     [inputType.PICTURE]:ImageInput,
//     [inputType.PHONE]:PhoneNumberInput,
//     [inputType.TEXT]:TextInput,
//     [inputType.PASSWORD]:(props:TextInputProps)=><TextInput {...props} password={true}/>
// };

export function Input({ type = inputType.TEXT, ...props }:BaseInputProps) {
    switch (type) {
      case inputType.CHECKBOX:
        return <CheckBox {...props} />;
      case inputType.DATE:
        return <DateInput {...props} />;
      case inputType.TIME:
        return <TimeInput {...props} />;
      case inputType.NUMBER:
        return <NumericInput {...props} />;
      case inputType.OPTIONS:
        throw new Error("Dropdown not supported for Input")
        //return <Dropdown {...props} />;
      case inputType.PICTURE:
        return <ImageInput {...props} />;
      case inputType.PHONE:
        return <PhoneNumberInput {...props} />;
      case inputType.TEXT:
        return <TextInput {...props} />;
      case inputType.PASSWORD:
        return <TextInput {...props} password={true} />;
      default:
        throw new Error(`${type} is not yet supported as an input`);
    }
  }
  