import { inputType } from "ottery-dto/lib/types/input/input.enums";
import Input from "./BaseInput";

export const TEXT = inputType.TEXT;

export default function TextInput(props) {
    return <Input type={inputType.TEXT} {...props} />
} 