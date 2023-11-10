import React from "react";
import styled from "styled-components";
import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import useColors from "../styles/useColors";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { margin } from "../styles/margin";
import { BUTTON_STATES } from "./button.enum";

const style = StyleSheet.create({
  Selection: {
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  Button: {
    flex: 1,
    borderWidth: 0,
    textAlign: "center",
    minHeight: clickable.minHeight,
    minWidth: clickable.minWidth,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: margin.medium,
  },
  Field: {
    flex: 1,
    alignItems: "center",
  },
});

function SelectionButton({
  itemCount = 0,
  itemTitle = ["item", "items"],
  buttonTitle = "Done",
  color = colors.background.primary,
  buttonColor = colors.primary.main,
  radius = rad.default,
  state = undefined,
  onPress = undefined,
}) {
  color = useColors({ color });

  if (state === BUTTON_STATES.success) {
    color = colors.success.main;
  } else if (state === BUTTON_STATES.error) {
    color = colors.error.main;
  } else if (state === BUTTON_STATES.disabled) {
    color = colors.disabled.main;
  }

  return (
    <View
      style={[
        style.Selection,
        { borderRadius: radius, backgroundColor: color },
      ]}
    >
      <View style={[style.Field]}>
        <Text style={{ color: colors.primary }}>
          {itemCount} {itemCount === 1 ? itemTitle[0] : itemTitle[1]} Selected
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            style.Button,
            {
              backgroundColor: buttonColor,
              borderTopRightRadius: radius,
              borderBottomRightRadius: radius,
            },
          ]}
          onPress={onPress}
        >
          <Text style={{ color: color.contrastText }}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectionButton;
