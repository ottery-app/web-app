import styled from "styled-components";
import React from "react";
import AddButton from "./AddButton";
import {clickable} from "../styles/clickable";

const Button = styled.div`
    position: fixed;
    bottom: ${clickable.minHeight};
    right: 0;
    padding: 30px 20px;
`;

export default function BottomRightButton(props) {
    //add icons later if needed.
    return (
        <Button>
            <AddButton {...props} />
        </Button>
    );
}