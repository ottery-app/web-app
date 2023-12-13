import useColors from "../../styles/useColors";
import { colors } from "../../styles/colors";
import { TAB_BUTTON_TYPES, TabButton } from "./TabButton";
import { View, StyleSheet } from "react-native";
import { clickable } from "../../styles/clickable";

const styles = StyleSheet.create({
  main: {
    flex:1,
    flexDirection: "row",
    height: clickable.minHeight,
  },
});

export default function TabField({
  color = colors.secondary,
  type = TAB_BUTTON_TYPES.default,
  tabs = [],
  active = tabs[0],
  onTab,
}) {
  color = useColors({ color });

  return (
    <View
      style={styles.main}
    >
      {tabs.map((tab) => (
        <TabButton
          color={color}
          key={tab}
          onTab={() => onTab(tab)}
          active={tab === active}
          type={type}
        >
          {tab}
        </TabButton>
      ))}
    </View>
  );
}
