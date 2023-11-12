import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/colors";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export function IconButton({ icon, width, onPress, children }) {
  const MAX_SIZE = 200;
  const ICON_SCALE = 0.5;

  return (
    <Button
      color={colors.secondary}
      onPress={onPress}
      width={width}
      height={width}
      maxHeight={MAX_SIZE}
      maxWidth={MAX_SIZE}
      shadow
    >
      <View style={styles.innerButton}>
        <Ionicons
          source={icon}
          size={width <= MAX_SIZE ? width * ICON_SCALE : MAX_SIZE * ICON_SCALE}
        />
        <Text variant={"titleMedium"} style={{ fontWeight: "bold" }}>
          {children}
        </Text>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  innerButton: {
    alignItems: "center",
  },
});
