import React from "react";
import styled from 'styled-components';

import {radius as rad} from "../styles/radius";
import {clickable} from '../styles/clickable';
import {colors} from "../styles/colors";

import removeProps from "../functions/removeProps";

function generateAutos(length) {
    let auto = "";
    for (let i = 0; i < length; i++) {
        auto = auto.concat(" auto");
    }
    return auto;
}

const Tab = styled.button`
    min-width: ${clickable.minWidth};
    height: ${clickable.minHeight};
    border: 0px solid ${props=>props.secondaryColor};
    color: ${props=>props.primaryTextColor};    

    border-bottom: 3px solid ${props=>props.secondaryColor};
    background-color: inherit;
    &:hover {
        ${clickable.onHover}
    }
`;

const Selected = styled.button`
    background-color: ${props=>props.primaryColor};
    color: ${props=>props.secondaryTextColor};
    min-width: ${clickable.minWidth};
    height: ${clickable.minHeight};
    border: 1px solid ${props=>props.tertiaryColor};
    border-radius: ${rad.default} ${rad.default} 0 0;
`;

const Field = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: ${props=>generateAutos(props.children.length)};
    grid-template-rows: auto;
`;

/**
 * @deprecated
 */
export default function TabButtons({
    id,
    className = "oui-field",
    primaryColor = colors.tertiaryLight,
    secondaryColor = colors.tertiary,
    tertiaryColor = primaryColor,
    primaryTextColor = colors.textDark,
    secondaryTextColor = colors.textDark,
    value="",
    onTab=()=>{},
    children,
}) {
    const[current, setCurrent] = React.useState(value);
    //why did I do this?
    console.warn("OUI: TabButtons is depreciated");

    let props = {
        id,
        className,
        primaryColor,
        secondaryColor,
        tertiaryColor,
        primaryTextColor,
        secondaryTextColor,
        children,
    }

    return (
        <Field 
            id={id}
            className={className}
            {...props}
        >
            {children.map((child, index)=>{
                const filteredChild = removeProps(child, ["onClick"]);
                //This is a joke for my brother:
                //after reading this months later its now an annoying joke
                return (child.key === current) ? 
                    <Selected 
                        key={index}
                        className="oui-tab-selected"
                        {...props}
                    >
                        {filteredChild}
                    </Selected>
                    :
                    <Tab
                        key={index}
                        className="oui-tab"
                        onClick={()=>{
                            if (child.props.onClick) {
                                child.props.onClick();
                            }
                            setCurrent(child.key);
                            onTab(child.key);
                        }}
                        {...props}
                    >
                        {filteredChild}
                    </Tab>; 
            })}
        </Field>
    );
}