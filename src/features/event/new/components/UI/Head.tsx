import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Title } from "react-native-paper";

interface HeadProps {
  style?: StyleProp<TextStyle>;
}

function Head({ children, style }: PropsWithChildren<HeadProps>) {
  return <Title style={[styles.container, style]}>{children}</Title>;
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Head;
