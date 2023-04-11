import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Image from "../images/Image";

import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";
import { radius as rad } from "../styles/radius";
import { image } from "../styles/image";

const Button = styled.button`
    display: grid;
    grid-template-columns: 44px auto 44px;
    align-items: center;
    min-height: ${clickable.minHeight};
    min-width: ${clickable.minWidth};
    width:100%;
    border-radius: ${props=>props.radius};
    background-color: ${props => props.primaryColor};
    color: ${props => props.primaryTextColor};
    border: 2px solid ${props => props.secondaryColor};
    &:hover {
        ${clickable.onHover}
    }
`;

const Canvas = styled.div`
    margin-top:2px;
`;

/**
 * This is the ImageButton. It is nifty because it allows the user to create buttons with built
 * in image alignment. It has three states that it can be in: default, selected, and error.
 * These will change the styling of the buttons. Aditionally you also have acess to all the
 * default icons saved in Image. It is important to note that this can also use custom images.
 * @prop {string} id - The id of the button. Used in css to style the button.
 * @prop {string} className - The class name of the button. Used in css to style the button.
 * @prop {string} left - The left image of the button. This is the image that will be displayed on the left of the button. This should either be the src to an image or a default of Image.js
 * @prop {string} right - The right image of the button. This is the image that will be displayed on the right of the button. This should either be the src to an image or a default of Image.js
 * @prop {string} content - The center image of the button. This is the content that will be displayed in the center of the button.
 * @prop {string} primaryColor - The primary color of the button. This can be either a hex code or a color name. The primary color is used to modify the background color of the button.
 * @prop {string} secondaryColor - The secondary color of the button. This can be either a hex code or a color name. The secondary color is used to modify the border color of the button.
 * @prop {string} primaryTextColor - The primary text color of the button. This can be either a hex code or a color name. The primary text color is used to modify the text color of the button.
 * @prop {string} radius - The radius of the button. Should be in any css size format.
 * @prop {string} state - The state of the button. Can be default, selected, or error.
 * @prop {string} onClick - The function that will be called when the button is clicked.
 * @returns {React.Component} - A React component that will render a button.
 */
function ImageButton({
    left,
    right,
    content,
    primaryColor=colors.tertiary,
    secondaryColor=colors.tertiaryDark,
    primaryTextColor=colors.textDark,
    radius=rad.round,
    state,
    onClick,
}) {
    const [leftImg, setLeftImg] = useState();
    const [rightImg, setRightImg] = useState();

    useEffect(()=>{
        let link = left;

        if (state === "error") {
            link = "alert";
        } else if (state === "success") {
            link = "check";
        }

        if (typeof link === "string") {
            setLeftImg(
                <Image 
                    src={link}
                    alt={left}
                    //radius={image.smallProfile}
                    width={image.smallProfile}
                    height={image.smallProfile}
                />
            );
        } else {
            setLeftImg(left);
        }
    }, [left, state]);

    useEffect(()=>{
        if (typeof right === "string") {
            setRightImg(
                <Image 
                    src={right}
                    alt={right}
                    radius={image.smallProfile}
                    width={image.smallProfile}
                    height={image.smallProfile}
                />
            )
        } else {
            setRightImg(right);
        }
    }, [right])

    return (
        <Button
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            radius={radius}
            primaryTextColor={primaryTextColor}
            onClick={onClick}
        >
            <Canvas>{leftImg}</Canvas>
            <div>{content}</div>
            <Canvas>{rightImg}</Canvas>
        </Button>
    );
}

export default ImageButton;