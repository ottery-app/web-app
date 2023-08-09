import styled from "styled-components"
import Image from "../images/Image";
import { image as imageHeights } from "../styles/image";
import { radius } from "../styles/radius";
import { Title, H_TYPES } from "../text/Title";
import { margin } from "../styles/margin";
import { clickable } from "../styles/clickable";
import { TIME, Time } from "../text/Time";
import {colors} from '../styles/colors';
import { border } from "../styles/border";

const Main = styled.div`
    width: 100%;
    display: flex;
    gap: ${margin.small};
    background: ${colors.primary};
    border: ${border.thin} solid ${colors.background.secondary};
    &:hover {
        ${clickable.onHover}
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
`;

export function IconCard({
    onClick = ()=>{},
    image,
    title,
    time,
    timeType=TIME.md,
    children,
}) {
    return (
        <Main 
            onClick={onClick}
        >
            <Image 
                src={image}
                alt={'icon card image'}
                radius={radius.round}
                height={imageHeights.mediumProfile}
                width={imageHeights.mediumProfile} 
            />
            <Info>
                {title && <Title h={H_TYPES.four} margin={'0px'}>{title}</Title>}
                <div>{children}</div>
                {time && <Time time={time} type={timeType}/>}
            </Info>
        </Main>
    );
}