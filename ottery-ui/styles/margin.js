/**
 * the margin options
 */
export const margin = {
  medium: 10,
  small: 5,
  large: 20,
};

/**
 * this is used to update the default margin dimentions
 * @param {string} name the name of the margin to update
 * @param {string} style the amount of margin to set it to.
 */
export function updateMargin(name, style) {
  margin[name] = style;
}
