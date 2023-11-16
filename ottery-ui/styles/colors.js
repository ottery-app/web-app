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
    main: "#89CFF0",
    dark: "#71abc7",
    contrastText: "white",
  },

  //brown
  secondary: {
    main: "#DFB87E",
    dark: "#b89767",
    contrastText: "black",
  },

  //white
  tertiary: {
    main: "#ffffff",
    dark: "#cccccc",
    contrastText: "black",
  },

  //red
  error: {
    main: "#ff5269",
    dark: "#cf0000",
    contrastText: "white",
  },

  //green
  success: {
    main: "#4BB543",
    dark: "#008200",
    contrastText: "white",
  },

  disabled: {
    main: "#cdcdcd",
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
    contrast: "#848484",
  },
};
