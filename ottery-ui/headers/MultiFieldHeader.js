import React from "react";
import { image } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { margin } from "../styles/margin";
import TabField from "../buttons/tabs/TabField";
import { TAB_BUTTON_TYPES } from "../buttons/tabs/TabButton";
import { IconButton, Text } from "react-native-paper";
import Image from "../image/Image";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { clickable } from "../styles/clickable";

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.background.primary,
  },
  top: {
    height: image.mediumProfile,
    margin: margin.medium,
    marginLeft: margin.large,
    flexDirection: "row", 
  },
  info: {
    flex:1,
    justifyContent: "center",
    alignItems:"center",
  },
  bottom: {
    height:clickable.minHeight,
  }
})

export function MultiFieldHeader({
  //top row
  title = "title", //can be an array

  //image
  src = "pfp",
  alt = "profile photo",

  //tabs
  tabs = [],
  tab = tabs[0],
  onTab = undefined,
  onSettings = null,
}) {
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Image
          src={src}
          alt={alt}
          width={image.mediumProfile}
          height={image.mediumProfile}
          radius={rad.round}
        />
        <View style={styles.info}>
          <Text variant="titleMedium">{title}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <TabField
          type={TAB_BUTTON_TYPES.upright}
          tabs={tabs}
          active={tab}
          onTab={onTab || function () {}}
        />
      </View>
    </View>
  );
}