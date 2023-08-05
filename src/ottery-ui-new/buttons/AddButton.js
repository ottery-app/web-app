import { radius } from "../styles/radius";
import { ICON_NAMES, IconButton } from "./IconButton";
import { useTheme } from "@mui/material";

console.warn("AddButton needs work");

export function AddButton({
    onClick
}) {
    const {palette} = useTheme();

    return (
        <IconButton
            icon={ICON_NAMES.pluss}
            palette={{
                primary: {
                    main: palette.success.main 
                },
                text: {
                    primary: palette.success.contrastText
                }
            }}
            onClick={onClick}
            radius={radius.default}
        />
    );
}