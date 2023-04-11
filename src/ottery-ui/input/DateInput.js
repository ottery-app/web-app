import Input from "./BaseInput";
import { formatDate } from "../../functions/time";
import { updateTargetValue } from "../../functions/event";
import { inputType } from "ottery-dto/lib/types/input/input.enums";

export const DATE = inputType.DATE;

export default function DateInput(props) {

    function formatChange(e) {
        const unix = new Date(e.target.value).getTime();
        e = updateTargetValue(e, unix);
        return props.onChange(e);
    }

    return (
        <Input 
            type="date" 
            {...props}
            onChange = {formatChange}
            value = {formatDate(props.value)}
        />
    );
}