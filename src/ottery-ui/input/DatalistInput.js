import { useRef } from "react";
import makeId from "../functions/makeId";
import TextInput from "./TextInput";

export const DATALIST = "datalist";

export default function DatalistInput({
    value = "",
    options=[], //this can either be an array of strings or an array of key value arrays
    label,
    placeholder,
    onChange,
}) {
    const {current} = useRef(makeId());

    return (
        <>
        <TextInput
            placeholder={placeholder}
            label={label}
            list={current}
            value={value}
            onChange={onChange}
        />
        <datalist id={current} >
            {options.map((option, i)=>
                <option key={i} value={option} />
            )}
        </datalist>
        </>
    );
}