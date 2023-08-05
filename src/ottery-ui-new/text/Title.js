import { Typography } from "@mui/material";

export function Title({
    h="h3",
    children
}) {
    return <Typography varient={h}>{children}</Typography> 
}