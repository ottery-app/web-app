import React from "react"
import styled from 'styled-components';

import { clickable } from "../styles/clickable";
import {colors} from "../styles/colors";
import {radius as rad} from "../styles/radius";
import useColors from "../hooks/useColors";

const Button = styled.button`
    border:none;
    text-align: center;
    min-height: ${clickable.minHeight};
    min-width: ${clickable.minWidth};
    width: 100%;
    background-color: ${props=>props.color.main};
    color: ${props=>props.color.contrastText};
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

function SelectionButton({
    itemCount=0,
    itemTitle=["item", "items"],
    buttonTitle="Done",
    onClick,
    color=colors.primary,
    radius=rad.default,
    state,
}) {
    color = useColors({color});

    return(
        <Selection
            color={color}
            radius={radius}
            state={state}
        >
            <Field
                color={color}
            >{itemCount} {(itemCount === 1) ? itemTitle[0] : itemTitle[1]} selected</Field>
            <Button 
                onClick={onClick}
                color={color}
                radius={radius}
            >{buttonTitle}</Button>
        </Selection>
    );
}

export default SelectionButton;