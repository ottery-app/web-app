import styled from "styled-components";
import React, {useRef, useState, useEffect} from "react";
import Image from "../images/Image"
import AddButton from "../buttons/actionButtons/AddButton";
import { radius as rad } from "../styles/radius";
import { colors } from "../styles/colors";
import { image } from "../styles/image"
import { inputType } from "@ottery/ottery-dto/lib/types/input/input.enums";

const Main = styled.div`
    position: relative;
    display: inline-block;
    &:hover {
        cursor: pointer;
    }
`;

const Edit = styled.div`
    position: absolute;
    display: inline-block;
    right: -5px;
    top: -5px;
`;

const Input = styled.input`
    left: -0px;
    color: rgba(0,0,0,0);
    position: absolute;
    opacity: 0;
`;

export const PICTURE = inputType.PICTURE

export default function ImageInput({
    value={src:"pfp"},
    label="editable image",
    radius=rad.round,
    width = image.largeProfile,
    height = width,
    onChange=()=>{}
}) {
    const [file, setFile] = useState({src:value.src});
    const inputFile = useRef(null);

    function updateFile(file) {
        setFile(file);

        onChange({
            target:{
                value:file
            }
        })
    }

    function handleImage(e) {
        const reader = new FileReader();

        reader.addEventListener('load', async (event) => {
            //should display a cropping popup
            let file = e.target.files[0];
            file.src = event.target.result;
            updateFile(file);
        });

        reader.readAsDataURL(e.target.files[0]);
    }

    function getImage() {
        inputFile.current.click();
    }

    return(
        //div is here for styling protection it seems not having it can cause random 
        //issues as css is passed down to main at times
        <div>
            <Main
                onClick={getImage}
            >
                <Edit>
                    <AddButton
                        color={colors.primary}
                        diameter="40px"
                        type="filled"
                        icon="edit"
                    />
                </Edit>
                <Image 
                    src={file.src}
                    alt={label}
                    width={width}
                    height={height}
                    radius={radius}
                />
                <Input
                    ref={inputFile}
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />
            </Main>
        </div>
    );
}