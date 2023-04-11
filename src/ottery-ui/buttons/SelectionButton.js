import React from "react"
import styled from 'styled-components';

import { clickable } from "../styles/clickable";
import {colors} from "../styles/colors";
import {radius as rad} from "../styles/radius";

const Button = styled.button`
    border:none;
    text-align: center;
    min-height: ${clickable.minHeight};
    min-width: ${clickable.minWidth};
    width: 100%;
    background-color: ${props=>props.secondaryColor};
    color: ${props=>props.secondaryTextColor};
    width: 100%;
    border-radius: ${props => `0 ${props.radius} ${props.radius} 0`};
    &:hover {
        ${clickable.onHover}
    }
`;

const Field = styled.div`
    color: ${props=>props.primaryTextColor};
    text-align:center;
`;

const Selection = styled.div`
    width: 100%;
    outline: 1px solid ${props=>props.secondaryColor};
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    grid-template-columns: auto 60px;
    background-color: ${props=>props.primaryColor};
    border-radius: ${props=>props.radius};
`;

/**
 * The selection button is used in tandem with a list of items. As items get selected its
 * number should increase through the val field. And finally the button can be pressed by
 * the user when they have the number of elements selected that they desire. It has two other 
 * states it can be in error and success.
 * @prop {string} id - The id of the button. Used in css to style the button.
 * @prop {string} className - The class name of the button. Used in css to style the button.
 * @prop {string} primaryColor - The primary color of the button. This can be either a hex code or a color name. The primary color is used to modify the background color of the button.
 * @prop {string} secondaryColor - The secondary color of the button. This can be either a hex code or a color name. The secondary color is used to modify the border color of the button.
 * @prop {string} primaryTextColor - The primary text color of the button. This can be either a hex code or a color name. The primary text color is used to modify the text color of the button.
 * @prop {string} secondaryTextColor - The secondary text color of the button. This can be either a hex code or a color name. The secondary text color is used to modify the text color of the button.
 * @prop {string} state - The state of the button. This can be either error or success. The state is used to modify the background color of the button.
 * @prop {string} radius - The radius of the button. This can be either a number or a radius name. The radius is used to modify the border radius of the button.
 * @prop {int} itemCount - The number of items selected.
 * @prop {Object} itemTitle - the two different states that the title can be in. Plural and singular.
 * @returns {React.Component} The selection button.
 */
function SelectionButton({
    itemCount=0,
    itemTitle=["item", "items"],
    buttonTitle="Done",
    onClick,
    primaryColor=colors.primary,
    secondaryColor=colors.secondary,
    primaryTextColor=colors.textDark,
    secondaryTextColor=colors.textLight,
    radius=rad.default,
    state,
}) {
    return(
        <Selection
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            primaryTextColor={primaryTextColor}
            secondaryTextColor={secondaryTextColor}
            radius={radius}
            state={state}
        >
            <Field
                primaryTextColor={primaryTextColor}
            >{itemCount} {(itemCount === 1) ? itemTitle[0] : itemTitle[1]} selected</Field>
            <Button 
                onClick={onClick}
                secondaryColor={secondaryColor}
                secondaryTextColor={secondaryTextColor}
                radius={radius}
            >{buttonTitle}</Button>
        </Selection>
    );
}

export default SelectionButton;