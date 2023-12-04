import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { margin } from "../styles/margin";

export interface ButtonFieldProps {
  children: ReactNode;
}

function ButtonField({ children }: ButtonFieldProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: margin.small,
    width: "100%",
  },
});

export default ButtonField;
