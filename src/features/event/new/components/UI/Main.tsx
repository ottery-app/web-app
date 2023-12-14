import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { margin } from "../../../../../../ottery-ui/styles/margin";

function Main({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: margin.large,
  },
});

export default Main;
