import { radius } from "./radius";

/**
 * the style options for shadows
 * @deprecated
 */
export const shadows = {
    default: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: radius.default,
        elevation: 3,
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