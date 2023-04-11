import { inputType } from "ottery-dto/lib/types/input/input.enums";
import Input from "./BaseInput";

export const PHONE = inputType.PHONE;

export default function PhoneInput(props) {
    return <Input type="text" {...props} />
} 