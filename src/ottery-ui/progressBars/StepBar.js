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
    background-color: ${colors.background.secondary};
    height: 3.5px;
    transform: translate(0, ${addPx(clickable.minHeight, -17)});
    z-index: ${zindex.back};
`;

const Circle = styled.div`
    background-color: ${colors.background.primary};
    border: 3px solid ${props=>{
        if (props.active) {
            return colors.primary.main;
        } else {
            return colors.background.secondary;
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