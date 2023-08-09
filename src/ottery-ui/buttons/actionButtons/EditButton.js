import { colors } from "../../styles/colors";
import { radius } from "../../styles/radius";
import IconButton, { ICON_NAMES } from "../IconButton";

export default function EditButton({
    onClick
}) {
    return (
        <IconButton 
            icon={ICON_NAMES.edit}
            color={colors.info}
            onClick={onClick}
            radius={radius.default}
        />
    );
}