import useColors from "../../styles/useColors";
import { colors } from "../../styles/colors";
import { TabButton } from "./TabButton";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TAB_BUTTON_TYPES } from "../button.enum";

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
  onTab = () => {},
}) {
  const [current, setCurrent] = useState(active);
  color = useColors({ color });

  return (
    <View
      style={[styles.main, { gridTemplateColumns: generateAutos(tabs.length) }]}
    >
      {tabs.map((tab) => (
        <TabButton
          color={color}
          key={tab}
          onTab={() => {
            setCurrent(tab);
            onTab(tab);
          }}
          active={tab === current}
          type={type}
        >
          {tab}
        </TabButton>
      ))}
    </View>
  );
}
