import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../styles/colors";
import { Text } from "react-native-paper";

function Error({ children }: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: colors.error.main,
  },
});

export default Error;
