import Image from "../ottery-ui/images/Image";
import { colors } from "../ottery-ui/styles/colors";
import styled from "styled-components";
import { roundOtterFullBody } from "../assets/images/otters";
import { MainHeaderHeight } from "../ottery-ui/headers/MainHeader";
import { NAV_HEIGHT } from "../ottery-ui/footers/NavBar";

const Main = styled.div`
    background: ${colors.background.primary};
    width: 100%;
    height: ${window.innerHeight - +MainHeaderHeight.replace("px", "") - +NAV_HEIGHT.replace("px", "") + 100}px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function Loading() {
    return (
        <Main>
            <Image 
                src={roundOtterFullBody}
                width={"200px"}
                animation={"spin"}
            />
        </Main>
    );
}