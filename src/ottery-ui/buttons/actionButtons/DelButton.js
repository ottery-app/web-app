import { radius } from "../../styles/radius";
import IconButton, { ICON_NAMES } from "../IconButton";
import { colors } from "../../styles/colors";

export default function DelButton({
    onClick
}) {
    return (
        <IconButton 
            icon={ICON_NAMES.x}
            color={colors.error}
            onClick={onClick}
            radius={radius.default}
        />
    );
}