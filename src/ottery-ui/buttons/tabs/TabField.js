import { colors } from "../../styles/colors";
import TabButton from "./TabButton";
import { useState } from "react";
import styled from "styled-components";

function generateAutos(length) {
    let auto = "";
    for (let i = 0; i < length; i++) {
        auto = auto.concat(" auto");
    }
    return auto;
}

const Main = styled.div`
    background: ${props=>props.primaryColor};
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: ${props=>generateAutos(props.children.length)};
    grid-template-rows: auto;
`;

export default function TabField({
    primaryColor,
    secondaryColor,
    tertiaryColor = colors.primary,
    textColor = colors.textDark,
    type = "default",
    tabs=[],
    active=tabs[0],
    onTab=()=>{},
}) {
    const [current, setCurrent] = useState(active);

    return(
        <Main
            primaryColor={tertiaryColor}
        >
            {tabs.map((tab)=>
                <TabButton
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    textColor={textColor}
                    key={tab}
                    onClick={()=>{
                        setCurrent(tab);
                        onTab(tab);
                    }}
                    active={tab === current}
                    type={type}
                >
                    {tab}
                </TabButton>
            )}
        </Main>
    );
}