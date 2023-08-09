import React from "react";
import styled from "styled-components";

import { clickable } from "../styles/clickable";

import addPx from "../functions/addPx";
import { margin } from "../styles/margin";
import { colors } from "../styles/colors";

export const NAV_HEIGHT = addPx(clickable.minHeight, margin.medium);

const Nav = styled.nav`
    border-top: 1px solid black;
    height: ${NAV_HEIGHT};
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${colors.background.primary};

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

export default function NavBar({
    children,
}) {
    return (
        <>
            <Filler/>
            <Nav>
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