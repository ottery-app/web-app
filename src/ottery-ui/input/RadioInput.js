import { makeDuck } from "ducktyper";
import styled from "styled-components";
import { useState } from "react";
import { inputType } from "ottery-dto/lib/types/input/input.enums";

const Radio = styled.input.attrs({type:'radio'})`
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

const IsKeyValArray = makeDuck([String, String]);

let CURRNAME = 0;

export const RADIO = inputType.RADIO;

function RadioButton({
    name,
    value="",
    label=value,
    onChange
}) {
    return(
        <label>
            <Radio 
                type="radio"
                value={value}
                name={name}
                onChange={onChange}
            />
            {label}
        </label>
    );
}

export default function RadioInput({
    label="",
    onChange,
    options=[]
}) {
    const [name] = useState(CURRNAME++);

    return (
        <Field>
            {label}
            {options.map((value, i)=>{
                if (IsKeyValArray(value)) {
                    return <RadioButton key={i} name={name} onChange={onChange} value={value[1]} label={value[0]}/>
                } else {
                    return <RadioButton key={i} name={name} onChange={onChange} value={value}/>
                }
            })}
        </Field>
    );
}