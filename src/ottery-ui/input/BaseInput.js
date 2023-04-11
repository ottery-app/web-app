import styled from "styled-components";
import {colors} from "../styles/colors";
import {radius as rad} from "../styles/radius";
import { clickable } from "../styles/clickable";
import useValidator, { makeValidator } from "./hooks/useValidator";
import useColors from "../hooks/useColors";

const border = "2px";

function isTimeType(type) {
    return type==="date" || type==="time";
}

export function makeInputStyle(props) {
    return`
        ${(isTimeType(props.type) && !props.value) && "color:#777"};
        width:100%;
        height: ${clickable.minHeight};
        outline: none !important;
        border: 0px solid white;
        box-shadow: 0 0 0 ${border} ${props.colors.primaryColor} inset;
        border-radius: ${rad.default};
        font-size: 16px;
        background: ${colors.primary};

        &:focus {
            box-shadow: 0 0 0 ${border} ${props.colors.secondaryColor} inset;
        }

        &:hover {
            box-shadow: 0 0 0 ${border} ${props.colors.secondaryColor} inset;
        }
    `
}

const Label = styled.label`
    position: absolute;
    padding-left: 5px;
    padding-right: 5px;
    color: ${props=>props.colors.primaryTextColor};
    background: ${colors.primary};
    white-space: nowrap;
`;

const C = styled.div`
    position: relative;
    height:0;
    width:0;
    top: -10px;
    left: 10px;
`;

export const I = styled.input`
    ${props=>makeInputStyle(props)}
`;

const Main = styled.div`
    width: 100%;
    transform: translate(-2px);
`

function toBool(val) {
    if (val === undefined || val==="") {
        return false;
    } else {
        return true;
    }
}

export function FloatingLabel({colors, title, watch}) {
    return watch && <C><Label colors={colors}>{title}</Label></C>
}

export default function BaseInput({
    type="text", //this is just here to make making other types of input easier
    primaryColor = colors.secondary,
    secondaryColor = colors.secondaryDark,
    primaryTextColor = colors.textDark,
    value = "",
    label,
    placeholder, //used if you only want a placeholder
    onChange,
    delay = 0,
    validator=makeValidator("default"),
    list, //for the datalist
}) {
    const status = useValidator(validator, value, delay);
    const colors = useColors({
        status,
        primaryColor,
        secondaryColor,
        primaryTextColor,
    });

    return(
        <Main>
            <FloatingLabel 
                colors={colors}
                title={label}
                watch={isTimeType(type) || toBool(value)}
            />
            <I
                list={list}
                colors={colors}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder || label}
            />
        </Main>
    );
}