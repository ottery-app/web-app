import {isString} from "ducktyper"

export default function addPx(original, px) {
    if (isString(px)) {
        px = +px.replace("px", "");
    }

    if (isString(original)) {
        original = +original.replace("px", "")
    }

    return (original + px) + "px";
}