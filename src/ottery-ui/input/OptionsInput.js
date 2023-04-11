import { colors } from "../styles/colors";
import { useMemo } from "react";
import styled from "styled-components";
import { makeInputStyle, FloatingLabel } from "./BaseInput";
import { makeDuck } from "ducktyper/";
import { inputType } from "ottery-dto/lib/types/input/input.enums";

const Main = styled.div`
    width:100%;
`;

const Select = styled.select`
    ${props=>props.value||"color: #777"};
    ${props=>makeInputStyle(props)}
`;

const isKeyValArray = makeDuck([String, String]);

export const OPTIONS = inputType.OPTIONS;

export default function OptionsInput({
    primaryColor = colors.secondary,
    secondaryColor = colors.secondaryDark,
    primaryTextColor = colors.textDark,
    value = "",
    options=[], //this can either be an array of strings or an array of key value arrays
    label,
    placeholder,
    onChange,
}) {
    const colors = useMemo(()=>{
        return {
            primaryColor,
            secondaryColor,
            primaryTextColor,
        }
    }, [primaryColor, secondaryColor, primaryTextColor]);

    return (
        <Main>
            <FloatingLabel
                title={label}
                colors={colors}
                watch={value}
            />
            <Select
                name={label}
                colors={colors}
                onChange={onChange}
                value={value} //used to change from gray to black
            >
                <option hidden>{label || placeholder}</option>
                {options.map((value, i)=>{
                    if (isKeyValArray(value)) {
                        return <option key={i} value={value[0]}>{value[1]}</option>
                    } else {
                        return <option key={i} value={value}>{value}</option>
                    }
                })}
            </Select> 
        </Main>
    );
}