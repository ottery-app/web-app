import Image from "../image/Image";
import { radius as rad, radius } from "../styles/radius";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { colors } from "../styles/colors";
import { checkmarkBlack, x } from "../../assets/icons";
import { clickable } from "../styles/clickable";
import { BUTTON_STATES } from "./button.enum";
import { margin } from "../styles/margin";
import { border } from "../styles/border";

const style = StyleSheet.create({
  container: {
    marginBottom: margin.small,
    marginTop: margin.small,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  ButtonImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: margin.small,
    radius: radius.round,
  },
  Name: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export function ImageButton({
  left = undefined,
  right = undefined,
  children,
  color = colors.secondary,
  state = undefined,
  onPress = undefined,
}) {
  const leftImage = useMemo(() => {
    if (left) {
      return (
        <Image height={clickable.minHeight} src={left} radius={radius.round} />
      );
    }

    if (state === BUTTON_STATES.error) {
      return (
        <Image
          height={clickable.minHeight}
          src={x}
          alt={"x mark"}
          radius={radius.round}
        />
      );
    } else if (state === BUTTON_STATES.success) {
      return (
        <Image
          height={0.75 * clickable.minHeight}
          src={checkmarkBlack}
          alt={"checkmark"}
          radius={radius.round}
        />
      );
    }
  }, [left, state]);

  const rightImage = useMemo(
    () =>
      right && (
        <Image height={clickable.minHeight} src={right} radius={radius.round} />
      ),
    [right]
  );

  return (
    <Button
      onPress={onPress}
      radius={rad.round}
      color={color}
      width={"100%"}
      state={state}
      styles={{ borderWidth: border.thin, borderColor: colors.text.primary }}
    >
      {leftImage || rightImage ? (
        <View style={style.container}>
          <View style={{ flex: 1 }}>{leftImage || <View />}</View>
          <View style={[style.Name]}>{children}</View>
          <View style={style.ButtonImage}>{rightImage || <View />}</View>
        </View>
      ) : (
        children
      )}
    </Button>
  );
}
