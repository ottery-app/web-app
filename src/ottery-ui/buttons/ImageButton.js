import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Image from "../images/Image";
import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";
import { radius as rad } from "../styles/radius";
import { image } from "../styles/image";
import useColors from "../hooks/useColors";

const Button = styled.button`
    display: grid;
    grid-template-columns: 44px auto 44px;
    align-items: center;
    min-height: ${clickable.minHeight};
    min-width: ${clickable.minWidth};
    width:100%;
    border-radius: ${props=>props.radius};
    background-color: ${colors.background.primary};
    color: ${props => props.color.contrastText};
    border: 2px solid ${props => props.color.main};
    &:hover {
        ${clickable.onHover}
    }
`;

const Canvas = styled.div`
    margin-top:2px;
`;

function ImageButton({
    left,
    right,
    content,
    color=colors.secondary,
    radius=rad.round,
    state,
    onClick,
}) {
    const [leftImg, setLeftImg] = useState();
    const [rightImg, setRightImg] = useState();
    color = useColors({color})

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
            color={color}
            radius={radius}
            onClick={onClick}
        >
            <Canvas>{leftImg}</Canvas>
            <div>{content}</div>
            <Canvas>{rightImg}</Canvas>
        </Button>
    );
}

export default ImageButton;