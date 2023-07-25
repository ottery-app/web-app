import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { BUTTON_STATES } from "../buttons/button.enum";
import {colors as colorLib} from "../styles/colors";

const defaultTail = "Color";
const successTail = capitalizeFirstLetter(BUTTON_STATES.success);
const errorTail = capitalizeFirstLetter(BUTTON_STATES.error);
const disabledTail = capitalizeFirstLetter(BUTTON_STATES.disabled);

export default function colorPipe(colors = {}, status="default") {
    for (const key of Object.keys(colors)) {
        if (status === "default") {
            return colors;
        } else if (status === BUTTON_STATES.success && colorLib[key.replace(defaultTail, successTail)]) {
            colors[key] = colorLib[key.replace(defaultTail, successTail)];
        } else if (status === BUTTON_STATES.error && colorLib[key.replace(defaultTail, errorTail)]) {
            colors[key] = colorLib[key.replace(defaultTail, errorTail)];
        } else if (status === BUTTON_STATES.disabled) {
            colors[key] = colorLib[key.replace(defaultTail, disabledTail)]
        }
    }
    return colors;
}