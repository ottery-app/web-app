import Button from "./Button";
import styled from 'styled-components';
import React from "react";

import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { clickable } from "../styles/clickable";

const Plus = styled.div`
    font-weight:bold;
`

/**
 * This is the check button component. It is a button with an onClick callback and looks like a generic check sign.
 * It has three states that it is able to be in filled (default), outline, and text.
 * @param {function} onClick - The callback to be called when the button is clicked.
 * @param {string} type - The type of button. Can be outline, filled, or text.
 * @param {string} diameter - The diameter of the button. Should be in any css size format.
 * @param {string} primaryColor - The primary color of the button.
 * @param {string} secondaryColor - The secondary color of the button. 
 * @param {string} tertiaryColor - The tertiary color of the button
 * @param {string} testColor - The color of the text
 * @param {string} radius - The radius of the button. Should be in any css size format.
 * @returns {React.Component} The button component.
 */
export default function CheckButton({
    type="filled",
    diameter = clickable.minHeight,
    primaryColor = colors.secondary,
    secondaryColor= colors.primaryColor,
    primaryTextColor = secondaryColor,
    radius = rad.round,
    onClick,
}) {
    return (
        <Button
            type={type}
            width={diameter}
            height={diameter}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            primaryTextColor={primaryTextColor}
            radius={radius}
            onClick={onClick}
        >
            <Plus>&#10004;</Plus>
        </Button>
    );
}