import SquareIconButton from "../buttons/SquareIconButton";
import styled from "styled-components";
import { margin } from "../styles/margin";

const Main = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-content: stretch;
    flex-wrap: wrap;
    margin-top: ${margin.medium};
    gap: ${margin.medium};
`;

export default function SquareButtonList({buttons=[{
    //icon:"icon",
    //title:"title",
    //onClick:()=>{},
}]}) {
    return (
        <Main>
            {buttons.map((button, i)=>{
                return (
                    <SquareIconButton
                        key={i}
                        icon={button.icon}
                        onClick={()=>{
                            if (button.onClick) {
                                button.onClick();
                            }
                        }}
                    >{button.title}</SquareIconButton>
                );
            })}
        </Main>
    );
}