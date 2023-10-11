export default function multPx(original, multiplier) {
    return (+original.replace("px", "") * multiplier) + "px";
}