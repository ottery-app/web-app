import { radius } from "../../styles/radius";
import IconButton, { ICON_NAMES } from "../IconButton";
import { colors } from "../../styles/colors";

export default function AddButton({
    onClick
}) {
    return (
        <IconButton 
            icon={ICON_NAMES.pluss}
            color={colors.success}
            onClick={onClick}
            radius={radius.default}
        />
    );
}