import { makeDuck } from "ducktyper";
import styled from "styled-components";
import { useState } from "react";
import CheckboxInput from "./CheckboxInput";
import { useEffect } from "react";
import { inputType } from "@ottery/ottery-dto/lib/types/input/input.enums";

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const isKeyValArray = makeDuck([String, String]);

export const ABRCHECKBOX = inputType.ABRCHECKBOX;

export default function AbrCheckBoxInput({
    onChange=()=>{},
    values=[],
    options=[],
}) {
    const [fields, setFields] = useState({});

    useEffect(()=>{
        const ret = {};
        options.forEach((option)=>{
            if (isKeyValArray(option)) {
                ret[option[0]] = values.includes(option[0]);
            } else {
                ret[option] = values.includes(option);
            }
        });

        setFields(ret);
    }, [values]);

    return(
        <Main>
            {options.map((option, i)=>{
                function handleChange(e) {
                    setFields(p=>{
                        p[e.for] = e.target.value;
                        return p;
                    });
                    onChange(e);
                }

                if (isKeyValArray(option)) {
                    return <CheckboxInput
                        key={i}
                        value={option[0]}
                        label={option[1]}
                        checked={fields[option[0]]}
                        onChange={handleChange}
                        position={ABRCHECKBOX}
                    />
                } else {
                    return <CheckboxInput
                        key={i}
                        value={option}
                        label={option}
                        checked={fields[option]}
                        onChange={handleChange}
                        position={ABRCHECKBOX}
                    />
                }
            })}
        </Main>
    );
}