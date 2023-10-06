import Image from "../ottery-ui/images/Image";
import { colors } from "../ottery-ui/styles/colors";
import styled from "styled-components";
import { roundOtterFullBody } from "../assets/images/otters";

const Main = styled.div`
    background: ${colors.background.primary};
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function Loading() {
    return (
        <Main>
            <Image 
                src={roundOtterFullBody}
                width={"100%"}
                animation={"spin"}
            />
        </Main>
    );
}