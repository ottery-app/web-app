import useColors from "../../styles/useColors";
import { colors } from "../../styles/colors";
import { TAB_BUTTON_TYPES, TabButton } from "./TabButton";
import { View, StyleSheet } from "react-native";

function generateAutos(length) {
  let auto = "";
  for (let i = 0; i < length; i++) {
    auto = auto.concat(" auto");
  }
  return auto;
}

const styles = StyleSheet.create({
  main: {
    position: "relative",
    width: "100%",
    display: "grid",
    gridTemplateRows: "auto",
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
      style={[styles.main, { gridTemplateColumns: generateAutos(tabs.length) }]}
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
