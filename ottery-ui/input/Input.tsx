import { inputType } from "@ottery/ottery-dto"
import DateInput from "./DateInput"
import ImageInput from "./ImageInput"
import { CheckBox } from "./CheckBox";
import { Dropdown } from "./Dropdown";
import PhoneNumberInput from "./PhoneInput";
import TextInput, { TextInputProps } from "./TextInput";
import React from "react";

export interface InputOption<T> {
    label: string;
    value: T;
}

export interface InputProps<T> {
    type?: inputType,
    label?: string,
    value: T,
    onChange: (value:T)=>void,
    //props: any, //custom props for that interface
}

const inputs = {
    [inputType.CHECKBOX]: CheckBox,
    [inputType.DATE]:DateInput,
    [inputType.OPTIONS]: Dropdown,
    [inputType.PICTURE]:ImageInput,
    [inputType.PHONE]:PhoneNumberInput,
    [inputType.TEXT]:TextInput,
    [inputType.PASSWORD]:(props:TextInputProps)=><TextInput {...props} password={true}/>
};

export function Input({type=inputType.TEXT, ...props}:InputProps<any>) {
    if (!inputs[type]) {
        throw new Error(`${type} is not yet supported as an input`);
    }

    return React.createElement(inputs[type], props);
}