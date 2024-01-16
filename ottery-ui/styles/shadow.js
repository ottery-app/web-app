import { radius } from "./radius";

/**
 * the style options for shadows
 */
export const shadows = {
    default: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: radius.default,
        elevation: 1,
    },
}

/**
 * this is used to update default shadow styles
 * @param {string} name the name of the style to update
 * @param {string} style the css properties that you want to replace them with.
 */
export function updateShadows(name, style) {
    shadows[name] = style;
}