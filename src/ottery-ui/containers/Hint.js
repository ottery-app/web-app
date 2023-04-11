import styled from "styled-components";
import IconButton from "../buttons/IconButton";
import ShadowBox from "./Shadowbox";
import { margin } from "../styles/margin";

const Main = styled.div`
    display: flex;
    text-align: left;
    justify-content: center;
    align-items: center;
    gap: ${margin.small};
`;

export default function Hint({peak}) {
    return (
        <ShadowBox>
            <Main>
                <IconButton icon="info" />
                {peak}
            </Main>
        </ShadowBox>
    );
}