import { border } from "../../styles/border";
import { clickable } from "../../styles/clickable";
import { colors } from "../../styles/colors";
import { radius } from "../../styles/radius";
import useColors from "../../styles/useColors";
import { StyleSheet, Text } from "react-native";
import {useMemo} from "react";
import { TouchableRipple } from "react-native-paper";

export const TAB_BUTTON_TYPES = {
  hanging: "hanging",
  upright: "upright",
  default: "default",
};

const styles = StyleSheet.create({
  common: {
    height: clickable.minHeight,
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    borderWidth: border.default,
  },
  [TAB_BUTTON_TYPES.default]: {
    borderRadius: radius.default,
  },
  [TAB_BUTTON_TYPES.upright]: {
    borderTopLeftRadius: radius.default,
    borderTopRightRadius: radius.default,
  },
  [TAB_BUTTON_TYPES.hanging]: {
    borderBottomLeftRadius: radius.default,
    borderBottomRightRadius: radius.default,
  },
});

export function TabButton({
  color = colors.secondary,
  active = false,
  onTab = () => {},
  type = TAB_BUTTON_TYPES.default,
  children,
}) {
  const col = useColors({ color: color });
  const backgroundColor = useMemo(()=>(active) ? col.dark : col.main, [active])

  return (
    <TouchableRipple
      style={[styles[type], styles.common, {
        backgroundColor: backgroundColor,
        borderColor: col.dark,
      }]}
      onPress={()=>onTab(children)}
    >
      <Text style={{
        color: col.contractText,
      }}>{children}</Text>
    </TouchableRipple>
  );
}
