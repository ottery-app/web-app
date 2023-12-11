import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { margin } from "../styles/margin";
import Shadowbox from "./Shadowbox";
import { info } from "../../assets/icons";

function Hint({ peak }: { peak: string }) {
  return (
    <Shadowbox>
      <View style={styles.container}>
        <IconButton icon={{ uri: info.src }} size={32} />
        <Text>{peak}</Text>
      </View>
    </Shadowbox>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: margin.small,
    textAlign: "left",
  },
});

export default Hint;
