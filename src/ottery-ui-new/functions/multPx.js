export default function multPx(original, px) {
    return (+original.replace("px", "") * px) + "px";
}