interface colorObj {
  main: string,
  dark: string,
  contrastText: string,
}

export type color = colorObj;

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
  } as color,

  //brown
  secondary: {
    main: "#DFB87E",
    dark: "#b89767",
    contrastText: "black",
  } as color,

  //white
  tertiary: {
    main: "#ffffff",
    dark: "#cccccc",
    contrastText: "black",
  } as color,

  //red
  error: {
    main: "#ff5269",
    dark: "#cf0000",
    contrastText: "white",
  } as color,

  //green
  success: {
    main: "#4BB543",
    dark: "#008200",
    contrastText: "white",
  } as color,

  //grey
  disabled: {
    main: "#cdcdcd",
    dark: "black",
    contrastText: "black",
  } as color,

  text: {
    primary: "black",
    secondary: "white",
    tertiary: "#848484",
    hyperlink: "#0078ff",
  },

  //mainly white
  background: {
    primary: "white",
    secondary: "#eee",
    contrast: "#848484",
  },
};
