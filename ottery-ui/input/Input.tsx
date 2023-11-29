import { inputType } from "@ottery/ottery-dto"
import DateInput from "./DateInput"
import ImageInput from "./ImageInput"

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

function UnsupportedInput() {throw new Error("input type not yet supported")}

const inputTypeMap = {
    [inputType.DATE]:DateInput,
    //[inputType.PICTURE]:ImageInput,
}

export function Input({type, label, value, onChange, ...props}:InputProps<any>) {

}