import { inputType } from "ottery-dto/lib/types/input/input.enums";
import Input from "./BaseInput";

function forceBetween(val, min, max) {
    if (val === undefined || val.length === 0) {
        return undefined;
    }

    val = +val;

    if (isNaN(val)) {
        return min;
    }

    if (min !== undefined && min > val) {
        return min;
    }

    if (max !== undefined && max < val) {
        return max
    }

    return val;
}

export const NUMBER = inputType.NUMBER;

export default function NumberInput(props) {
    function formatChange(e) {
        e.target.value = forceBetween(e.target.value, props.min, props.max);

        if (props.onChange) {
            return props.onChange(e);
        } else {
            return e;
        }
    }

    function formatValue(val) {
        return val; //forceBetween(val, props.min, props.max);
    }

    return (
        <Input
            {...props}
            type="number"
            value={formatValue(props.value)}
            onChange={formatChange}
        />
    );
} 