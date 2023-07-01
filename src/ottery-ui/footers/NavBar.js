import React from "react";
import styled from "styled-components";

import { clickable } from "../styles/clickable";

import addPx from "../functions/addPx";
import { margin } from "../styles/margin";

export const NAV_HEIGHT = addPx(clickable.minHeight, margin.medium);

const Nav = styled.nav`
    border-top: 1px solid black;
    height: ${NAV_HEIGHT};
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${props=>props.primaryColor};

    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;

const Link = styled.div`
    height: ${clickable.minHeight};
    width: ${clickable.minWidth};
    line-height: ${clickable.minHeight};
    &:hover {
        ${clickable.onHover}
    }
`;

const Filler = styled.div`
    height: ${NAV_HEIGHT};
`

/**
 * The nav bar is designed for the use of phone apps specifically at the bottom of the sreen.
 * It takes the children passed into the component and displays them in the nav bar style.
 * All items in the nav are displaced evenly regardless of how many elements there are in it.
 * @param {string} id - The id of the nav bar.
 * @param {string} className - The class name of the nav bar.
 * @param {Object} children - an array of react elements to be displayed in the nav bar.
 * @returns {ReactElement} - The nav bar.
 */
export default function NavBar({
    id,
    className,
    children,
    primaryColor="white",
}) {
    return (
        <>
            <Filler/>
            <Nav 
                id={id}
                className={className | "oui-nav-footer"}
                primaryColor={primaryColor}
            >
                {((children && children.length) ? children.map(child => {
                    return child;
                }) : (()=>{
                    console.warn("oui: NavBar should have more then one child");
                    return (children) ? [children] : [];
                })()).map((child, index) => {
                    return <Link key={index}>{child}</Link>;
                })}
            </Nav>
        </>
    );
}