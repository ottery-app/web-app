import styled from "styled-components";
import {radius} from '../styles/radius';
import {colors} from '../styles/colors';
import { margin } from "../styles/margin";

const Spread = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${(props)=>(props.self)
        ?'flex-end'
        :'flex-start'
    };
`;

const Bubble = styled.div`
    display: block;
    box-sizing: border-box;
    padding: ${margin.medium};
    background: ${(props)=>(props.self)
        ? colors.secondary.light
        : colors.background.secondary
    };
    border-radius: ${radius.default};
    max-width: ${window.innerWidth / 2.5}px;
    overflow-wrap: break-word;
`;

export function Message({
    self=false,
    children,
}) {
    return (
        <Spread self={self}>
            <Bubble self={self}>
                {children}
            </Bubble>
        </Spread>
    )
}