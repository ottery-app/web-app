import styled from "styled-components";
import React, { useEffect } from "react";
import gear from "./gear.svg";
import pfp from "./pfp.svg";
import dice from "./dice.svg";
import check from "./check.svg";
import alert from "./alert.svg";
import x from "./x.svg";
import { useState } from "react";
import { spinSlow } from "../animations/spinning";

const Container = styled.div`
    overflow: hidden;
    ${props=>props.height && `height: ${props.height}`}
    ${props=>props.width && `width: ${props.width}`}
`;

const I = styled.img`
    border-radius: ${props=>props.radius};
    object-fit: cover;
    ${props=>props.animation}
`;

export const defaultImages = {
    gear,
    pfp,
    dice,
    check,
    alert,
    x,
};

export const defaultAnimations = {
    spin: "spin",
}

/**
 * this is the same as a regular image tag however it has a few extra features. For one it allows the user access to default images.
 * secondly it throws warnings when best practices are not followed.
 * @param {string} src - The source of the image.
 * @param {string} alt - The alternative text of the image.
 * @param {string} id - The id of the image.
 * @param {string} className - The class name of the image.
 * @param {string} width - The width of the image. This should be any valid css size value.
 * @param {string} height - The height of the image. This should be any valid css size value.
 * @param {function} onClick - The onClick function of the image.
 * @returns {ReactElement} - The image.
 */
function Image({
    src,
    alt,
    radius,
    width = radius,
    height = radius,
    id,
    className = "oui-image",
    onClick,
    animation,
}) {
    const [anime, setAnime] = useState();

    useEffect(()=>{
        if (animation === defaultAnimations.spin) {
            setAnime(spinSlow);
        }
    }, [animation]);

    useEffect(()=>{
        if (alt === undefined) {
            console.warn("oui: Image should always have a alt field");
        }
    
        if (width === undefined && height === undefined) {
            console.warn("oui: Image should always have a width or height field");
        }
    },[alt, width, height]);

    return (
        <Container
            height={height}
            widht={width}
        >
            <I 
                id={id}
                src={(defaultImages[src]) ? defaultImages[src] : src} 
                alt={alt} 
                width={width} 
                height={height}
                onClick={onClick}
                className={className}
                radius={radius}
                animation={anime}
            />
        </Container>
    );
}

export default Image;