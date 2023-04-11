import Input from "./BaseInput";
import { formatTime } from "../../functions/time";
import { isDateObj } from "ottery-dto";
import { inputType } from "ottery-dto/lib/types/input/input.enums";

export const TIME = inputType.TIME;

export default function TimeInput(props) {
    function formatValue(value) {
        value = isDateObj(value) 
            ? formatTime(value)
            : value;

        return value;
    }

    return (
        <Input 
            {...props}
            type="time"
            value={formatValue(props.value)}
        />
    );
} 