import {colors as colorLib} from "../styles/colors";

const successTail = "Success";
const errorTail = "Error";

export default function colorPipe(colors = {}, status="default") {
    for (const key of Object.keys(colors)) {
        if (status === "default") {
            return colors;
        } else if (status === "success" && colorLib[key.replace("Color", successTail)]) {
            colors[key] = colorLib[key.replace("Color", successTail)];
        } else if (status === "error" && colorLib[key.replace("Color", errorTail)]) {
            colors[key] = colorLib[key.replace("Color", errorTail)];
        }
    }
    return colors;
}