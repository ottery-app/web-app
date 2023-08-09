/**
 * the style options for shadows
 */
 export const zindex = {
    front: 100,
    mid: 0,
    back: -100,
    absolute: 1000000000,
}

/**
 * this is used to update default shadow styles
 * @param {string} name the name of the heihgt to update
 * @param {string} num the int to change the zindex to.
 */
export function updateZindex(name, num) {
    zindex[name] = num;
}