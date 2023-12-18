
/**
 * the radius options
 */
export const radius = {
    default: 10,
    round: 100000,
    square: 0,
}

/**
 * this is used to update the default radius dimentions
 * @param {string} name the name of the radius to update
 * @param {string} style the amount of radius to set it to.
 */
export function updateRadius(name, style) {
    radius[name] = style;
}