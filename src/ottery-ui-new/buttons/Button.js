import { clickable } from "../styles/clickable";
import { Button as Butt, useTheme } from "@mui/material";
import { radius as rad } from "../styles/radius";

console.warn("state not implemented");

export function Button({
    radius=rad.default,
    children,
    width,
    height=clickable.minHeight,
    onClick,
    state="default",
    color,
}) {
    const theme = useTheme()
    console.warn("state not implemented");

    return (
        <Butt 
            //color={color}
            variant="contained" 
            sx={{
                borderRadius: radius,
                width: width,
                height: height,
                color: theme.palette.text.primary
            }}
            onClick={onClick}
        >
            {children}
        </Butt>
    );
}