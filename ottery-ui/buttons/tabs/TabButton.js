import styled from "styled-components";
import { clickable } from "../../styles/clickable";
import { colors } from "../../styles/colors";
import { radius } from "../../styles/radius";
import useColors from "../../styles/useColors";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TAB_BUTTON_TYPES } from "../button.enum";

const lineThickness = "3px";
const styles = StyleSheet.create({
  Tab: {
    flex: 1,
    borderRadius: `${radius.default}`,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: clickable.minHeight,
    minWidth: 2 * clickable.minWidth,
    color: colors.contrastText,
  },
});

export function TabButton({
  color = colors.secondary,
  active = false,
  onTab = () => {},
  type = "default",
  children,
}) {
  const col = useColors({ color: color });
  const commonStyle = [
    styles.Tab,
    { color: col.contrastText, background: active ? col.dark : col.main },
  ];
  if (type === TAB_BUTTON_TYPES.hanging) {
    return (
      <TouchableOpacity
        style={[
          ...commonStyle,
          {
            borderRadius: `0 0 ${radius.default} ${radius.default}`,
            border: `0 solid ${color.dark}`,
            borderTop: `${lineThickness} solid ${color.dark}`,
          },
        ]}
        onPress={onTab}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  } else if (type === TAB_BUTTON_TYPES.upright) {
    return (
      <TouchableOpacity
        style={[
          ...commonStyle,
          {
            borderWidth: 1,
            borderColor: color.contrastText,
            borderTopLeftRadius: radius.default,
            borderTopRightRadius: radius.default,
          },
        ]}
        onPress={onTab}
      >
        <Text style={{ fontSize: "17px", lineHeight: "19px", fontWeight: 400 }}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  } else if (type === TAB_BUTTON_TYPES.line) {
    return (
      <TouchableOpacity
        style={[
          ...commonStyle,
          { borderWidth: 1, borderColor: color.contrastText },
        ]}
        onPress={onTab}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={[...commonStyle]} onPress={onTab}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
}
