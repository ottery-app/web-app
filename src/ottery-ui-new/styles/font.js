/**
 * the font options
 */
export const  font = {
    small: "0.8em",
    regular: "1em",
    large: "1.2em",
}

/**
 * this is used to update the default font dimentions
 * @param {string} name the name of the font to update
 * @param {string} style the amount of font to set it to.
 */
export function updateFont(name, style) {
    font[name] = style;
}