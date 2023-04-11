import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { zindex } from "../styles/zindex";

export const MainHeaderHeight = "60px";

const Header = styled.div`
    background-color: ${props=>props.primaryColor};
    border-bottom: 1px solid ${props=>props.secondaryColor};
    height: ${props=>props.height};
    position: sticky; top: 0;
    z-index: ${zindex.absolute};
`;

const forAll = `
    height: ${props=>props.height};
    margin: 7px 10px;
`;

const Item = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Left = styled.span`
    ${forAll}
    display: float;
    float: left;
`;

const Main = styled.span`
    height: ${props=>props.height};
    display: float;
    float: left;
`;

const Right = styled.span`
    ${forAll}
    display: float;
    float: right;
`;

/**
 * The MainHeader component is the main header of the application. It is used as a banner
 * that spreads from left to right. It however on its own does not spread itself forcefully to the top of the page.
 * It needs to be put in a container that does so or directly modified to do so using the class name oui-main-header
 * or attaching an id or class name as a property.
 * @param {string} id - The id of the header. Used in css to style the header.
 * @param {string} className - The class name of the header. Used in css to style the header.
 * @param {*} left - The left side of the header. This displays on the left side of the header. Can be any component that is renderable.
 * @param {*} main - The main content of the header. This displays on the left side of the header. Can be any component that is renderable.
 * @param {*} right - The right side of the header. This displays on the right side of the header. Can be any component that is renderable.
 * @param {string} primaryColor - The primary color of the header. This can be either a hex code or a color name. The primary color is used to modify the background color of the header.
 * @param {string} secondaryColor - The secondary color of the header. This can be either a hex code or a color name. The secondary color is used to modify the border color of the header.
 * @returns {React.Component} The MainHeader component.
 */
export default function MainHeader({
    id,
    className,
    main,
    left,
    right,
    height=MainHeaderHeight,
    primaryColor=colors.secondary,
    secondaryColor=colors.secondary,
}) {
    return (
        <Header 
            id={id}
            className={className | "oui-main-header"}
            primaryColor = {primaryColor}
            secondaryColor = {secondaryColor}
            height = {height}
        >
            {left && <Left><Item>{left}</Item></Left>}
            {main && <Main><Item>{main}</Item></Main>}
            {right && <Right><Item>{right}</Item></Right>}
        </Header>
    )
}