import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { margin } from "../../ottery-ui/styles/margin";
import { ReactNode } from "react";

interface BaseProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function Base({ children, style }: BaseProps) {
  return <View style={[styles.base, style]}>{children}</View>;
}

export function Main({ children, style }: BaseProps) {
  return <View style={[styles.base, styles.main, style]}>{children}</View>;
}

export const MarginlessMain = Base;

const styles = StyleSheet.create({
  base: {
    flex:1,
  },
  main: {
    padding: margin.medium,
  },
});