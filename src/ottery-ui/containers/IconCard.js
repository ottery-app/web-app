import styled from "styled-components"
import Image from "../images/Image";
import { image as imageHeights } from "../styles/image";
import { radius } from "../styles/radius";
import { Title, H_TYPES } from "../text/Title";


const Main = styled.div`
    display: flex;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

export function IconCard({image, title, children}) {
    return (
        <Main>
            <Image 
                src={image}
                radius={radius.round}
                height={imageHeights.mediumProfile}
                width={imageHeights.mediumProfile} 
            />
            <Info>
                {title && <Title h={H_TYPES.one}>{title}</Title>}
                {children}
            </Info>
        </Main>
    );
}