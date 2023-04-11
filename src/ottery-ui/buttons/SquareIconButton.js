import SquareButton from "./SquareButton";
import IconButton from "./IconButton";
import styled from "styled-components";

const Main = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
`;

const Info = styled.div`
    font-weight: bold;
`;

export default function SquareIconButton({
    icon="home",
    onClick=()=>{},
    children,
}) {
    return (
        <SquareButton onClick={onClick}>
            <Main>
                <IconButton fontSize={"90px"} icon={icon} />
                <Info>{children}</Info>
            </Main>
        </SquareButton>
    );
}