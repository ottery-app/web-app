import { View } from "react-native";
import styled from "styled-components";

export const H_TYPES = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
};

const H_SIZES = {
  1: "2em",
  2: "1.5em",
  3: "1.17em",
  4: "1em",
  5: "0.83em",
  6: "0.67em",
};

const H_MARGINS = {
  1: "2em",
  2: "1.5em",
  3: "1.17em",
  4: "1em",
  5: "0.83em",
  6: "0.67em",
};

const T = styled(View)`
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  font-weight: bold;
`;

/**
 * @deprecated use Text varient instead
 */
export function Title({ h = H_TYPES.three, fontSize, margin, children }) {
  const size = fontSize || H_SIZES[h] || h;
  const marginSize = margin || H_MARGINS[h] || h;

  return (
    <T size={size} margin={marginSize}>
      {children}
    </T>
  );
}
