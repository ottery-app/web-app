import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";

function Head({ children }: PropsWithChildren) {
  return <Title style={styles.container}>{children}</Title>;
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Head;
