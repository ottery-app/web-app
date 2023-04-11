export function hexBrightness(hex, percent) {
    // Convert hex to RGB
    var r = parseInt(hex.substring(1,3), 16);
    var g = parseInt(hex.substring(3,5), 16);
    var b = parseInt(hex.substring(5,7), 16);

    // Adjust the brightness
    r = Math.round(r * percent);
    g = Math.round(g * percent);
    b = Math.round(b * percent);

    // Convert RGB to hex
    var newHex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return newHex;
}