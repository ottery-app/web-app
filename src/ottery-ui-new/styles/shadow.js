/**
 * the style options for shadows
 */
export const shadows = {
    default: "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;",
}

/**
 * this is used to update default shadow styles
 * @param {string} name the name of the style to update
 * @param {string} style the css properties that you want to replace them with.
 */
export function updateShadows(name, style) {
    shadows[name] = style;
}