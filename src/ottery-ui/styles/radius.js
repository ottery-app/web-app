console.warn("oui: radius is depreciated -> moved to border");

/**
 * the radius options
 */
export const radius = {
    default: "10px",
    round: "100000px",
    square: "0px",
}

/**
 * this is used to update the default radius dimentions
 * @param {string} name the name of the radius to update
 * @param {string} style the amount of radius to set it to.
 */
export function updateRadius(name, style) {
    radius[name] = style;
}