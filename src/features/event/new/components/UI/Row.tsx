import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

function Row({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Row;
