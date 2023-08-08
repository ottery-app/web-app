import { Box } from "@mui/material";
import { margin } from "../../ottery-ui/styles/margin";
import { radius } from "../../ottery-ui/styles/radius";
import { useTheme } from "styled-components";


export function Shadowbox({
    palette,
    children,
}) {
    return (
        <Box 
            bgcolor={palette?.background?.default}
            sx={{ 
                boxShadow: 3,
                padding: margin.medium,
                borderRadius: radius.default,
            }}>{children}
        </Box>
    );
}