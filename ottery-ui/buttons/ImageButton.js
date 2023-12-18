import Image from "../image/Image";
import { radius } from "../styles/radius";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { check, x } from "../../assets/icons";
import { clickable } from "../styles/clickable";
import { BUTTON_STATES } from "./button.enum";
import { margin } from "../styles/margin";
import { border } from "../styles/border";
import useColors from "../styles/useColors";
import { TouchableRipple } from "react-native-paper";
import { image } from "../styles/image";

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: clickable.minHeight,
  },
  RightButtonImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: margin.small,
  },
  LeftButtonImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: margin.small,
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
  color = useColors({status:state, color})
  const leftImage = useMemo(() => {
    if (left) {
      return (
        <Image
          height={clickable.minHeight}
          width={clickable.minHeight}
          alt={"left image button"}
          src={left}
          radius={radius.round}
        />
      );
    }

    if (state === BUTTON_STATES.error) {
      return (
        <Image
          height={clickable.minHeight}
          width={clickable.minHeight}
          src={x}
          alt={"x mark"}
          radius={radius.round}
        />
      );
    } else if (state === BUTTON_STATES.success) {
      return (
        <Image
          height={clickable.minHeight}
          width={clickable.minHeight}
          src={check}
          alt={"checkmark"}
          radius={radius.round}
        />
      );
    }
  }, [left, state]);

  const rightImage = useMemo(
    () =>
      right && (
        <Image
          height={clickable.minHeight}
          width={clickable.minWidth}
          src={right}
          radius={radius.round}
        />
      ),
    [right]
  );

  return (
    <TouchableRipple
      style={{
          height: clickable.minHeight + margin.medium,
          width: "100%",
          justifyContent:"center",
          borderRadius: radius.round,
          backgroundColor: colors.secondary.main,
          borderColor: colors.secondary.dark,
          borderWidth: border.default,
          backgroundColor: color.main,
          borderWidth: border.thin,
          borderColor: color.dark
      }}
      onPress={onPress}
    >
      {leftImage || rightImage ? (
        <View style={style.container}>
          <View style={style.LeftButtonImage}>{leftImage || <View />}</View>
          <View style={style.Name}>{children}</View>
          <View style={style.RightButtonImage}>{rightImage || <View />}</View>
        </View>
      ) : (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>{children}</View>
      )}
    </TouchableRipple>
  );
}