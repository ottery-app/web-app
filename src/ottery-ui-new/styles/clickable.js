import {zindex} from "./zindex"

/**
 * these are generic styles for clickable components
 */
export const clickable = {
    minWidth: "44px",
    maxWidth: "150px",
    minHeight: "44px",
    maxHeight: "150px",
    onHover: `
        cursor: pointer;
        filter: brightness(90%);
        z-index: ${zindex.mid};
    `,
}
//removed from buttons since it caused the flow to change
// transform: scale(1.03);

/**
 * this is used to update the clicable references when desired by the user.
 * @param {string} name the name of the specific style being changed
 * @param {string} style the css style that should be altered
 */
export function updateClickable(name, style) {
    clickable[name] = style;
}