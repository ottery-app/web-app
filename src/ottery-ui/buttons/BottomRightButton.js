import styled from "styled-components";
import React, { useState } from "react";
import AddButton from "./AddButton";

import {colors} from "../styles/colors";
import {clickable} from "../styles/clickable";

const Button = styled.div`
    position: fixed;
    bottom: ${clickable.minHeight};
    right: 0;
    padding: 30px 20px;
`;

export default function BottomRightButton(props) {
    //no idea how strongly done this is
    const [dto] = useState({
        primaryTextColor: "white",
        secondaryColor: "white",
        ...props,
    });

    //add icons later if needed.
    return (
        <Button>
            <AddButton {...dto} />
        </Button>
    );
}