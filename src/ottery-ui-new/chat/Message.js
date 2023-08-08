import styled from "styled-components";
import {colors} from '../styles/colors';
import { Shadowbox } from "../containers/Shadowbox";

const Spread = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${(props)=>(props.self)
        ?'flex-end'
        :'flex-start'
    };
`;

export function Message({
    self=false,
    children,
}) {
    return (
        <Spread self={self}>
            <Shadowbox palette={{
                background:{
                    default: (self) ? colors.secondary.main : colors.disabled.light
                }
            }}>
                {children}
            </Shadowbox>
        </Spread>
    )
}