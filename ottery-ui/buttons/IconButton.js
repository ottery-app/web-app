import { colors } from "../styles/colors";
import { StyleSheet, View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import { radius } from "../styles/radius";
import { border } from "../styles/border";

export function IconButton({icon, width, onPress, children}) {
  const MAX_SIZE = 200;
  const ICON_SCALE = 0.5;

  console.log(icon)

  return (
      <TouchableRipple
        style={{
            height:width,
            width,
            maxHeight: MAX_SIZE,
            maxWidth: MAX_SIZE,
            borderRadius: radius.default,
            backgroundColor: colors.secondary.main,
            borderColor: colors.secondary.dark,
            borderWidth: border.default,
        }}
        onPress={onPress}
      >
          <View style={styles.innerButton}>
              <Icon
                  source={icon}
                  size={(width <= MAX_SIZE) ? width * ICON_SCALE : MAX_SIZE * ICON_SCALE}
              />
              <Text variant={"titleMedium"} style={{fontWeight:"bold"}}>{children}</Text>
          </View>
      </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  innerButton: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
  }
});