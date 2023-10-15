import React from "react"
import styled from 'styled-components';
import { radius as rad } from "../styles/radius";
import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";
import useColors from "../hooks/useColors";
import { BUTTON_TYPES } from "./button.enum";
import {shadows} from "../styles/shadow";

const Butt = styled.button`
    border: ${props=>`${props.border} solid ${props.color.dark}`};
    background-color: ${props=>props.color.main};
    color: ${props=>props.color.contrastText};
    border-radius: ${props=>props.radius};
    min-height: ${props=>props.height};
    min-width: ${props=>props.width};
    width: 100%;
    max-width: ${props=>(props.width)?props.width:clickable.maxWidth};
    text-transform: uppercase;
    ${shadows.default};
    &:hover{
        ${clickable.onHover}
    }
`;

console.warn("needs to be updated to change colors")
function pipeStyles(type, color) {
    if (type==="outline") {
        return {
            color: color,
            border: "2px",
        };
    } else if (type === "text") {
        return {
            color: color,
            border: "0px",
        };
    } else if (type === "filled") {
        return {
            color:color,
            border: "1px",
        };
    }
}

export default function Button({
    color=colors.primary,
    radius=rad.default,
    type=BUTTON_TYPES.filled,
    children,
    width,
    height=clickable.minHeight,
    onClick,
    state="default"
}) {
    color = useColors({
        color: color,
        status: state,
    });

    return (
        <Butt
            {...pipeStyles(type, color)}
            radius={radius}
            type="button"
            width={width}
            height={height}
            onClick={onClick}
        >{children}</Butt>
    );
}