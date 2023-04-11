import styled from "styled-components"
import { zindex } from "../styles/zindex";
import { colors } from "../styles/colors";
const Background = styled.div`
    z-index: ${zindex.absolute};
    width: 100vw;
    height: 100vh;
    background: #00000099;
    position: fixed;
    left: 0; 
    right: 0;
    top: 0;
    bottom: 0;
    margin-bottom: auto;
    margin-top: auto;
    margin-left: auto; 
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Window = styled.div`
    background: ${props=>props.primaryColor};
    display:inline-block;
`;

export default function Popup({
    on = false,
    primaryColor = colors.primary,
    children,
}) {
    console.error("Ottery-ui: Popup is depreciated");
    return on && 
    <Background>
        <Window
            primaryColor={primaryColor}
        >
            {children}
        </Window>
    </Background>;
}