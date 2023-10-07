import styled, { css } from "styled-components";
import { AwaitLoad } from "./AwaitLoad";
import { useQueryStatus } from "./QueryStatusProvider";

const ScrollLock = styled.div`
    ${({ scroll }) => !scroll && css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    `}
`;

export function AwaitGlobalLoad({children}) {
    const {status} = useQueryStatus();

    const done = status.every(stat=>stat==="success");

    return (
        <ScrollLock scroll={done} >
            <AwaitLoad status={status}/>
            {children}
        </ScrollLock>
    )
}