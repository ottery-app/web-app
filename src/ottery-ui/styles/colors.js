/**
 * these are used to follow the 70-20-10 rule
 * Where:
 * 70% of the components will be the primary color
 * 20% will be the secondary color
 * 30% will be the tertiary color
 */
export const colors = {
    //white
    primaryLight: "white",
    primary: "white",
    primaryDark: "#eeeeee",

    //blue
    secondaryLight: undefined,
    secondary: "#89CFF0",
    secondaryDark: "#71abc7",

    //brown
    tertiaryLight: "#e3c69a",
    tertiary: "#DFB87E",
    tertiaryDark: "#b89767",

    //red
    primaryError: "#ff5269",
    secondaryError: "#cf0000",
    
    //green
    primarySuccess:  "#4BB543",
    secondarySuccess: "#008200",

    textDark: "black",
    textPale: "#d4d4d4",
    textLight: "white",
    textLink: "#0078ff",
}

/**
 * This is used to update the color reference for a specific name to a given hex
 * @param {*} name the name of the color to update
 * @param {*} hex the hex color
 */
export function updateColors(name, hex) {
    colors[name] = hex;
}