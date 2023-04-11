import React from "react";
import styled from 'styled-components';
import TabButtons from "../buttons/TabButtons";
import Image from "../images/Image";
import { image } from "../styles/image"
import { colors } from "../styles/colors.js";
import { radius as rad } from "../styles/radius";
import { margin } from "../styles/margin";
import multPx from "../functions/multPx";

const IMAGE_RAD = image.mediumProfile;

const HEADER_PADDING = margin.medium;

const Header = styled.div`
    padding-top: ${HEADER_PADDING};
    padding-left: ${HEADER_PADDING};
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    gap: ${margin.medium};
    width: 100%;
    background-color: ${props=>props.backgroundColor};
    border-radius: ${props=>props.radius} ${props=>props.radius} 0 0;
`;

const Left = styled.div`
    flex: 0 0 ${IMAGE_RAD};
    position: relative;
    top: -${multPx(HEADER_PADDING, 0.5)};
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: end;
    gap: ${margin.large};
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: ${HEADER_PADDING};
    justify-content: space-around;
    gap: ${margin.small};
`;


export function MultiFieldHeader({
    //top row
    title="title", //can be an array

    //image
    src="pfp",
    alt="profile photo",

    //tabs
    tabs=[],
    tab=tabs[0],
    onTab=()=>{},

    //style
    primaryColor=colors.primaryDark,
    secondaryColor=colors.tertiaryDark,
    tertiaryColor=colors.tertiary,
    radius=rad.square,
}) {
    const head = (Array.isArray(title)) ? title : [title];

    return (
        <Header
            backgroundColor = {primaryColor}
            radius = {radius}
        >
            <Left>
                <Image 
                    src={src}
                    alt={alt}
                    width={IMAGE_RAD}
                    height={IMAGE_RAD}
                    radius={rad.round}
                />
            </Left>
            <Right>
                <Title>
                    {head}
                </Title>
                <TabButtons 
                    primaryColor={secondaryColor}
                    secondaryColor={tertiaryColor}
                    value={tab}
                    onTab={onTab}
                >
                    {tabs.map((tab)=><span key={tab} onClick={()=>{onTab(tab)}}>{tab}</span>)}
                </TabButtons>
            </Right>
        </Header>
    );
}