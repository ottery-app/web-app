import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { margin } from "../ottery-ui/styles/margin";

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  main: {
    boxSizing: "border-box",
    padding: margin.small,
  },
  marginlessMain: {},
});

export const Main = (props) => {
  return <View style={[styles.base, styles.main]}>{props.children}</View>;
};

export const MarginlessMain = (props) => {
  return <View style={styles.base}>{props.children}</View>;
};
