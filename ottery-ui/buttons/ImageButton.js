import Image from "../image/Image";
import { radius as rad } from "../styles/radius";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { colors } from "../styles/colors";
import { check, x } from "../../assets/icons";
import { clickable } from "../styles/clickable";
import { BUTTON_STATES } from "./button.enum";
import { margin } from "../styles/margin";

const style = StyleSheet.create({
  container: {
    marginBottom: 0,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  ButtonImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
      return <Image height={clickable.minHeight} src={left} />;
    }

    if (state === BUTTON_STATES.error) {
      return <Image height={clickable.minHeight} src={x} alt={"x mark"} />;
    } else if (state === BUTTON_STATES.success) {
      return (
        <Image height={clickable.minHeight} src={check} alt={"checkmark"} />
      );
    }
  }, [left, state]);

  const rightImage = useMemo(
    () => right && <Image height={clickable.minHeight} src={right} />,
    [right]
  );

  return (
    <Button
      onPress={onPress}
      radius={rad.round}
      color={color}
      width={"100%"}
      state={state}
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
