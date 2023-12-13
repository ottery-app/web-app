import React from "react";
import { colors } from "../styles/colors";
import useColors from "../styles/useColors";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Button from "./Button";
import { border } from "../styles/border";
import { radius } from "../styles/radius";
import { clickable } from "../styles/clickable";

const style = StyleSheet.create({
  main: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  backdrop: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    borderWidth: border.thin,
    borderTopLeftRadius: radius.default,
    borderBottomLeftRadius: radius.default,
    height: clickable.minHeight,
  }
});

function SelectionButton({
  itemCount = 0,
  itemTitle = ["item", "items"],
  buttonTitle = "Done",
  buttonColor = colors.primary,
  backgroundColor = colors.tertiary,
  state = undefined,
  onPress = undefined,
}) {
  buttonColor = useColors({ color:buttonColor, status:state });
  backgroundColor = useColors({ color:backgroundColor });

  return (
    <View style={style.main}>
      <View style={[style.backdrop, {
        borderColor: backgroundColor.dark,
        backgroundColor: backgroundColor.main,
      }]}>
        <Text>{itemCount} {(itemCount===1)?itemTitle[0]:itemTitle[1]} selected</Text>
      </View>
      <Button color={buttonColor} styles={{
        borderTopLeftRadius: radius.square,
        borderBottomLeftRadius: radius.square,
      }} onPress={onPress}>{buttonTitle}</Button>
    </View>
  );
}

export default SelectionButton;
