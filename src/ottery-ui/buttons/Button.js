import React, { useEffect, useState } from "react"
import styled from 'styled-components';

import { radius as rad } from "../styles/radius";
import { colors as cols } from "../styles/colors";
import { clickable } from "../styles/clickable";
import useColors from "../hooks/useColors";

const Butt = styled.button`
    border: ${props=>`${props.border} solid ${props.secondaryColor}`};
    background-color: ${props=>props.primaryColor};
    color: ${props=>props.primaryTextColor};
    border-radius: ${props=>props.radius};
    min-height: ${props=>props.height};
    min-width: ${props=>props.width};
    width: 100%;
    max-width: ${props=>(props.width)?props.width:clickable.maxWidth};
    text-transform: uppercase;
    &:hover{
        ${clickable.onHover}
    }
`;

function pipeStyles(type, colors) {
    if (type==="outline") {
        return {
            primaryColor: "inherit",
            secondaryColor: colors.primaryColor,
            primaryTextColor: colors.primaryColor,
            border: "2px",
        };
    } else if (type === "text") {
        return {
            primaryColor: "inherit",
            secondaryColor: colors.primaryColor,
            primaryTextColor: colors.primaryColor,
            border: "0px",
        };
    } else if (type === "filled") {
        return {
            primaryColor: colors.primaryColor,
            secondaryColor: colors.secondaryColor,
            primaryTextColor: colors.primaryTextColor,
            border: "1px",
        };
    }
}

export const BUTTON_TYPES = {
    filled: "filled",
    outline: "outline",
    text: "text",
}

/**
 * This is the Button component. It is a button with an onClick callback.
 * It has three states that it is able to be in filled (default), outline, and text.
 * @param {function} onClick - The callback to be called when the button is clicked.
 * @param {string} type - The type of button. Can be outline, filled, or text.
 * @param {string} diameter - The diameter of the button. Should be in any css size format.
 * @param {string} primaryColor - The primary color of the button. This can be either a hex code or a color name. The primary color is used to modify the background color of the button.
 * @param {string} secondaryColor - The secondary color of the button. This can be either a hex code or a color name. The secondary color is used to modify the border color of the button.
 * @param {string} primaryTextColor - The primary text color of the button. This can be either a hex code or a color name. The primary text color is used to modify the text color of the button.
 * @param {string} radius - The radius of the button. Should be in any css size format.
 * @param {*} children - The children of the button. This is the what will be displayed on the button.
 * @param {string} height - The height of the button. Should be in any css size format.
 * @param {string} width - The width of the button. Should be in any css size format.
 * @returns {React.Component} The button component.
 */
export default function Button({
    primaryColor=cols.secondary,
    secondaryColor=cols.primary,
    primaryTextColor=secondaryColor,
    radius=rad.default,
    type=BUTTON_TYPES.filled,
    children,
    width,
    height=clickable.minHeight,
    onClick,
    state="default"
}) {
    const colors = useColors({
        primaryColor,
        secondaryColor,
        primaryTextColor,
        status: state,
    });

    return (
        <Butt
            {...pipeStyles(type, colors)}
            radius={radius}
            type="button"
            width={width}
            height={height}
            onClick={onClick}
        >{children}</Butt>
    );
}