import styled from "styled-components";
import {colors} from "../styles/colors";
import {radius as rad} from "../styles/radius";
import { clickable } from "../styles/clickable";
import useValidator, { makeValidator } from "./hooks/useValidator";
import useColors from "../hooks/useColors";
import { zindex } from "../styles/zindex";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";

const border = "1px";

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
        box-shadow: 0 0 0 ${border} ${"#ccc"} inset;
        border-radius: ${rad.default};
        font-size: 16px;
        background: ${colors.background.primary};

        &:focus {
            box-shadow: 0 0 0 ${border} ${props.color.dark} inset;
        }

        &:hover {
            box-shadow: 0 0 0 ${border} ${props.color.dark} inset;
        }
    `
}

const Label = styled.label`
    position: absolute;
    padding-left: 5px;
    padding-right: 5px;
    color: ${colors.text.primary};
    white-space: nowrap;
    z-index: ${zindex.front};

    :after {
        content: "";
        position: absolute;
        bottom: 40%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${colors.background.primary};
        z-index: -1;
      }
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

export function FloatingLabel({color, title, watch}) {
    return watch && <C><Label color={color}>{title}</Label></C>
}

export default function BaseInput({
    type="text", //this is just here to make making other types of input easier
    color=colors.primary,
    value = "",
    label,
    placeholder, //used if you only want a placeholder
    onChange,
    delay = 0,
    validator=makeValidator("default"),
    list, //for the datalist
}) {
    const status = useValidator(validator, value, delay);
    color = useColors({status,color});

    return(
        <Main>
            <FloatingLabel 
                color={color}
                title={capitalizeFirstLetter(label)}
                watch={isTimeType(type) || toBool(value)}
            />
            <I
                list={list}
                color={color}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder || label}
            />
        </Main>
    );
}