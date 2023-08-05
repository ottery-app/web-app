import { 
    AiOutlineLeft,
    AiOutlineRight, 
    AiOutlineMenu,
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineToTop,
    AiOutlineVerticalAlignBottom,
    AiOutlineMessage,
    AiOutlineTeam,
    AiOutlineRead,
    AiOutlineBell,
} from "react-icons/ai";

import {
    FiCheck,
    FiX,
    FiShare2,
    FiSend,
} from "react-icons/fi";

import {
    IoIosSettings,
} from "react-icons/io";

import {
    RiCalendarLine,
} from "react-icons/ri";

import {
    BiInfoCircle,
    BiSearch,
    BiPlus,
    BiMinus,
} from "react-icons/bi";

import {
    RiPencilLine,
} from "react-icons/ri";

import {
    BsClock,
} from "react-icons/bs";

import React, { useState } from "react";
import styled from "styled-components";

import addPx from "../functions/addPx";
import { radius as rad } from "../styles/radius";
import {clickable} from "../styles/clickable";
import {colors} from "../styles/colors";
import { useTheme } from "@mui/material";

const icons = {
    bell: <AiOutlineBell/>,
    back: <AiOutlineLeft/>,
    forward: <AiOutlineRight/>,
    menu: <AiOutlineMenu/>,
    home: <AiOutlineHome/>,
    user: <AiOutlineUser/>,
    dropoff: <AiOutlineToTop/>,
    pickup: <AiOutlineVerticalAlignBottom/>,
    settings: <IoIosSettings/>,
    calendar: <RiCalendarLine/>,
    info: <BiInfoCircle/>,
    search: <BiSearch/>,
    pluss: <BiPlus/>,
    minus: <BiMinus/>,
    edit: <RiPencilLine/>,
    check: <FiCheck/>,
    x: <FiX />,
    share: <FiShare2/>,
    msg: <AiOutlineMessage/>,
    team: <AiOutlineTeam/>,
    orgs: <AiOutlineRead/>,
    clock: <BsClock/>,
    send: <FiSend/>,
}

//im sure there is a better way :/
//but if i do it the better way I loose the type hinting that vs code gives :/
export const ICON_NAMES = {
    bell: "bell",
    back: "back",
    forward: "forward",
    menu: "menu",
    home: "home",
    user: "user",
    dropoff: "dropoff",
    pickup: "pickup",
    settings: "settings",
    calendar: "calendar",
    info: "info",
    search: "search",
    pluss: "pluss",
    minus: "minus",
    edit: "edit",
    check: "check",
    x: "x",
    share: "share",
    msg: "msg",
    team: "team",
    orgs: "orgs",
    clock: "clock",
    send:"send",
}

if (Object.keys(ICON_NAMES).length !== Object.keys(icons).length) {
    throw new Error("Developer. You messed up. you gotta have the same num of names and icons");
}

const names = Object.values(ICON_NAMES);
for (let i = 0; i < names.length; i++) {
    if (!icons[names[i]]) {
        throw new Error("Developer. You messed up. there is a name icon missmatch");
    }
}

const Backdrop = styled.div`
    background-color: ${props=>props.primaryColor};
    border: ${props => "1px solid" + props.secondaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props=>addPx(props.fontSize, 1)};
    height: ${props=>addPx(props.fontSize, 1)};
    border-radius: ${props=>props.radius};
`;


const Icon = styled.div`
    max-width: ${props=>addPx(props.fontSize, -8)};
    font-size: ${props=>addPx(props.fontSize, -8)};
    color: ${props=>props.primaryTextColor};
    position: relative;
    top: 4.5px;
    &:hover {
        ${clickable.onHover}
    }
`

console.warn("this needs work");

/**
 * This is the IconButton. It is a large set of buttons that the user is able to chose from
 * and modify. These images were found in react-icons
 * @param {string} type - The type of button. Can be outline, filled, or text.
 * @param {string} secondaryTextColor - the secondary text color of the button. This can be either a hex code or a color name. The secondary text color is used to modify the text color of the button.
 * @param {string} primaryTextColor - The primary text color of the button. This can be either a hex code or a color name. The primary text color is used to modify the text color of the button.
 * @param {string} fontSize - The font size of the button. Should be in any css size format.
 * @param {Object} onClick - The function that is called when the button is clicked.
 * @returns {React.Component} The button component.
 */
export function IconButton({
    icon="forward",
    onClick,
    palette,
    fontSize = clickable.minHeight,
    radius = rad.round,
}) {
    const {palette:defaultPalette} = useTheme();

    const primaryColor = palette?.primary?.main || defaultPalette.primary.main;
    const secondaryColor = palette?.secondary?.main || defaultPalette.secondary.main;
    const primaryTextColor = palette?.text?.primary || defaultPalette.text.primary;

    return (
        <Backdrop
            onClick={onClick}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            fontSize={fontSize}
            radius={radius}
        >
            <Icon 
                className="oui-icon-button" 
                fontSize={fontSize}
                primaryTextColor={primaryTextColor}
            >
                {icons[icon] || icon}
            </Icon>
        </Backdrop>
    )
}