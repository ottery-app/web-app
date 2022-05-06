export default function addPx(original, px) {
    return (+original.replace("px", "") + px) + "px";
}