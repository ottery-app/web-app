import React from "react";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { Button as ButtonPaper } from "react-native-paper";
import { BUTTON_STATES, BUTTON_TYPES } from "./button.enum";
import { useThemeMaker } from "../styles/Color";
import { shadows } from "../styles/shadow";
import { clickable } from "../styles/clickable";

export const Button = ({
  color = colors.primary,
  type = BUTTON_TYPES.filled,
  onPress = undefined,
  state = BUTTON_STATES.default,
  children,
  radius = rad.default,
  width = clickable.maxWidth,
  maxWidth = undefined,
  minWidth = undefined,
  height = undefined,
  maxHeight = undefined,
  minHeight = undefined,
  shadow = undefined,
  styles = {},
}) => {
  const theme = useThemeMaker({ primary: color, status: state });

  const BUTTON_STYLE = {
    width: width,
    maxWidth: maxWidth,
    minWidth: minWidth,
    height: height,
    maxHeight: maxHeight,
    minHeight: minHeight,
    borderRadius: radius,
  };

  return (
    <ButtonPaper
      theme={theme}
      styles={[shadows.default]}
      borderRadius={rad.default}
      onPress={onPress}
      contentStyle={BUTTON_STYLE}
      labelStyle={BUTTON_STATES}
      style={[shadow && shadows.default, BUTTON_STYLE, { ...styles }]}
      mode={type}
      compact={true}
    >
      {children}
    </ButtonPaper>
  );
};

export default Button;
