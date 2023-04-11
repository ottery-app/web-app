/**
 * the margin options
 */
 export const  margin = {
    medium: "10px",
    small: "5px",
    large: "20px",
}

/**
 * this is used to update the default margin dimentions
 * @param {string} name the name of the margin to update
 * @param {string} style the amount of margin to set it to.
 */
export function updateMargin(name, style) {
    margin[name] = style;
}