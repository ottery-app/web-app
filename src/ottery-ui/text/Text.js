import { colors } from "../styles/colors";

const Main = styled.div`
    color: ${props=>props.color.text};
    display: inline;
`;

export function Text({
    color=colors.primary,
    children,
}) {
    return (
        <Main
            color={color}
        >
            {children}
        </Main>
    )
}