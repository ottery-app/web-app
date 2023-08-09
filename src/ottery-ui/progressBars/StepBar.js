import React from "react";
import styled from 'styled-components';
import addPx from "../functions/addPx";

import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { zindex } from "../styles/zindex";

const Main = styled.div`
    width: 100%;
`;

const ProgressBar = styled.div`
    display:flex;
    justify-content: space-between;
    width: 100%;
`;

const Bar = styled.div`
    background-color: ${props=>props.color.main};
    height: 3.5px;
    transform: translate(0, ${addPx(clickable.minHeight, -17)});
    z-index: ${zindex.back};
`;

const Circle = styled.div`
    background-color: ${colors.background.primary};
    border: 3px solid ${props=>{
        if (props.active) {
            return colors.background.secondary;
        } else {
            return colors.primary.main;
        }
    }};
    color: ${colors.text.main};
    z-index: ${zindex.front};
    border-radius: ${radius.round};
    height: ${clickable.minHeight};  
    width: ${clickable.minWidth};
    display: flex;
    justify-content: center;
    align-items:center;
    &:hover {
        ${clickable.onHover};
    }
`;

/**
 * The step bar is designed to be used in multifield forms allowing quick on click access to a page of 
 * the form an clear denotation of your location in the form. It starts counting at 1.
 * @param {int} numFields - The number of fields in the step bar. This can be any quantity of fields.
 * @param {int} current - The current field that the user is on.
 * @param {string} primaryColor - The primary color of the step bar. Can be a hex value or a color name.
 * @param {string} secondaryColor - The secondary color of the step bar. Can be a hex value or a color name.
 * @param {string} textColor - The primary text color of the step bar. Can be a hex value or a color name.
 * @param {string} secondaryTextColor - The secondary text color of the step bar. Can be a hex value or a color name.
 * @param {function} onClick - The callback function that is called when a field is clicked on. That value of the field is passed into the function.
 */
export default function StepBar({
    numFields,
    current,
    onClick=()=>{},
}) {
    return(
        <Main>
            <Bar/>
            <ProgressBar>
                {[...Array(numFields).keys()].map((n)=>
                    <Field
                        key={n+1}
                        active={current === n+1}
                        onClick={onClick}
                    >
                        {n + 1}
                    </Field>
                )}
            </ProgressBar>
        </Main>
    );
}

function Field({
    children,
    active,
    onClick
}) {
    return(
        <Circle
            active={active}
            onClick={()=>onClick(children)}
        > 
            {children}
        </Circle> 
    );
}