import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { margin } from "../../../../../../ottery-ui/styles/margin";

function Row({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: margin.small,
  },
});

export default Row;
