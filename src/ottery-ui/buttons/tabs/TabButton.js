import styled from "styled-components";
import { clickable } from "../../styles/clickable";
import { colors } from "../../styles/colors";
import { radius } from "../../styles/radius";

const lineThickness = "3px";

const Tab = styled.div`
    background: ${props=>{
        if (props.active) {
            return props.secondaryColor;
        } else {
            return props.primaryColor;
        }
    }};

    border-radius: ${radius.default};
    display:flex;
    justify-content: center;
    align-items: center;
    min-width: ${clickable.minWidth};
    height: ${clickable.minHeight};
    color: ${props=>props.textColor};
    &:hover {
        ${clickable.onHover}
    }
`;

const Default = Tab;

const Hanging = styled(Tab)`
    border-radius: 0 0 ${radius.default} ${radius.default};
    border: 0px solid ${props=>props.secondaryColor};
    border-top: ${lineThickness} solid ${props=>props.secondaryColor};
`;

const Upright = styled(Tab)`
    border-radius: ${radius.default} ${radius.default} 0 0;
    border: 0px solid ${props=>props.secondaryColor};
    border-bottom: ${lineThickness} solid ${props=>props.secondaryColor};
`;

const Line = styled(Tab)`
    background: inherit;
    border-radius: 0 0 0 0;
    border-bottom: ${lineThickness} solid ${props=>
        (props.active)
            ?props.secondaryColor
            :props.primaryColor
    };
`;

export default function TabButton({
    primaryColor = "inherit",
    secondaryColor = colors.tertiary,
    textColor = "black",
    onClick=()=>{},
    active=false,
    type="default",
    children
}) {
    if (type === "hanging") {
        return (
            <Hanging
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                onClick={onClick}
                active={active}
            >
                {children}
            </Hanging>
        );
    } else if (type === "upright") {
        return (
            <Upright
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                onClick={onClick}
                active={active}
            >
                {children}
            </Upright>
        );
    } else if (type === "line") {
        return (
            <Line
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                onClick={onClick}
                active={active}
            >
                {children}
            </Line>
        );
    } else {
        return(
            <Default
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                onClick={onClick}
                active={active}
            >
                {children}
            </Default>
        )
    }
}