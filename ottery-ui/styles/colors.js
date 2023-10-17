/**
 * these are used to follow the 70-20-10 rule
 * Where:
 * 70% of the components will be the primary color
 * 20% will be the secondary color
 * 30% will be the tertiary color
 */
export const colors = {
  //blue
  primary: {
    light: undefined,
    main: "#89CFF0",
    dark: "#71abc7",
    contrastText: "white",
  },

  //brown
  secondary: {
    light: "#e3c69a",
    main: "#DFB87E",
    dark: "#b89767",
    contrastText: "black",
  },

  //NavyBlue
  tertiary: {
    light: "#1974D2",
    main: "#1357BE",
    dark: "#000080",
    contrastText: "white",
  },

  //red
  error: {
    light: undefined,
    main: "#ff5269",
    dark: "#cf0000",
    contrastText: "white",
  },

  //green
  success: {
    light: undefined,
    main: "#4BB543",
    dark: "#008200",
    contrastText: "white",
  },

  disabled: {
    light: "#c2c2c2",
    main: "#9c9c9c",
    dark: "black",
    contrastText: "black",
  },

  text: {
    primary: "black",
    secondary: "white",
    tertiary: "#ddd",
    hyperlink: "#0078ff",
  },

  background: {
    primary: "white",
    secondary: "#eee",
  },
};
