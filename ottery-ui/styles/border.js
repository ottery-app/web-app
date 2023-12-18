import { radius } from "./radius";
export {updateRadius} from "./radius";

/**
 * the border options
 */
export const border = {
    default: 1,
    thin: 0.5,
    thick: 1,
    radius: radius,
}

/**
 * this is used to update the default border dimentions
 * @param {string} name the name of the border to update
 * @param {string} style the amount of border to set it to.
 */
export function updateBorder(name, style) {
    border[name] = style;
}