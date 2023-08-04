import { Box } from "@mui/material";
import { margin } from "../../ottery-ui/styles/margin";
import { radius } from "../../ottery-ui/styles/radius";


export function Shadowbox({children}) {
    return <Box sx={{ 
        boxShadow: 3,
        padding: margin.medium,
        borderRadius: radius.default,
    }}>{children}</Box>
}