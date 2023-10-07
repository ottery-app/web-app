import { inputType } from "@ottery/ottery-dto/lib/types/input/input.enums";
import Input from "./BaseInput";

export const LOCATION = inputType.LOCATION;

export default function LocationInput(props) {
    return <Input type="text" {...props} />
} 