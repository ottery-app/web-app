import { inputType } from "ottery-dto/lib/types/input/input.enums";
import Input from "./BaseInput";

export const PASSWORD = inputType.PASSWORD;

export default function PasswordInput(props) {
    return <Input type="password" {...props} />
} 