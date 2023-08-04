/**
 * these are used to follow the 70-20-10 rule
 * Where:
 * 70% of the components will be the primary color
 * 20% will be the secondary color
 * 30% will be the tertiary color
 */
export const colors = {
    primary: {
        light: "#89CFF0",
        main: "#89CFF0",
        dark: "#71abc7",
    },

    secondary: {
        light: "#e3c69a",
        main: "#DFB87E",
        dark: "#b89767",
    },

    error: {
        light: "#ef5350",
        main: "#d32f2f",
        dark: "#c62828",
    },

    warning: {
        light: "#ff9800",
        main: "#ed6c02",
        dark: "#e65100",
    },

    info: {
        light: "#03a9f4",
        main: "#0288d1",
        dark: "#01579b",
    }, 

    success: {
        light: "#4caf50",
        main: "#2e7d32",
        dark: "#1b5e20",
    },

    text: {
        primary: '#ffffff',
        secondary: '#000000',
        //tertiary: '#6B7A90',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hyperlink: "#0000ff",
    }
}

/**
 * This is used to update the color reference for a specific name to a given hex
 * @param {*} name the name of the color to update
 * @param {*} hex the hex color
 */
export function updateColors(name, hex) {
    colors[name] = hex;
}