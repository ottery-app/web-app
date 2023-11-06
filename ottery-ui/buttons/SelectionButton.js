import React from "react";
import styled from "styled-components";
import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import useColors from "../styles/useColors";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { margin } from "../styles/margin";

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
    textAlign: "center",
  },
});

function SelectionButton({
  itemCount = 0,
  itemTitle = ["item", "items"],
  buttonTitle = "Done",
  color = colors.background.secondary,
  buttonColor = colors.primary.main,
  radius = rad.default,
  state = undefined,
  onPress = undefined,
}) {
  color = useColors({ color });

  return (
    <View
      style={[
        style.Selection,
        { borderRadius: radius, backgroundColor: color, state: { state } },
      ]}
    >
      <View style={[style.Field, { color: colors.primary }]}>
        {itemCount} {itemCount === 1 ? itemTitle[0] : itemTitle[1]} selected
      </View>
      <View>
        <TouchableOpacity
          style={[
            style.Button,
            {
              backgroundColor: buttonColor,
              color: color.contrastText,
              borderTopRightRadius: radius,
              borderBottomRightRadius: radius,
            },
          ]}
          onPress={onPress}
        >
          {buttonTitle}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectionButton;
