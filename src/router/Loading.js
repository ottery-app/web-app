import Image from "../ottery-ui/images/Image";
import { colors } from "../ottery-ui/styles/colors";
import styled from "styled-components";

const Main = styled.div`
    background: ${colors.secondary};
    width: 100%;
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
`;

export default function Loading() {
    return (
        <Main>
            <Image width="400px" alt="loading screen" src="https://raw.githubusercontent.com/ottery-app/global-data/67d6aea72e97a3f129b6af9d2f5379a51d066cec/images/logos/Ottery(Demo).svg" />
        </Main>
    );
}