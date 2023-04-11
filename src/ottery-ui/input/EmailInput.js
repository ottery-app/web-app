import { inputType } from "ottery-dto/lib/types/input/input.enums";
import Input from "./BaseInput";

export const EMAIL = inputType.EMAIL;

export default function EmailInput(props) {
    return <Input type="text" {...props} />
} 