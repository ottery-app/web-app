import React from "react";
import { image } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad, radius } from "../styles/radius";
import { margin } from "../styles/margin";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { gear } from "../../assets/icons";
import { clickable } from "../styles/clickable";

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.background.primary,
  },
  inner: {
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
})

export interface HeaderProps {
    title:string,
    subTitle?: string,
    onEdit?: ()=>void,
}

export function Header({
  //top row
  title = "title", //can be an array
  subTitle,
  onEdit,
}: HeaderProps) {
  return (
    <View style={styles.main}>
        <View style={styles.inner}>
            <View style={styles.info}>
                <Text variant="titleMedium">{title}</Text>
                {subTitle 
                  ? <Text variant="titleSmall">{subTitle}</Text> 
                  : undefined
                }
            </View>
            {onEdit
              ? <View style={{justifyContent:"center"}}><TouchableRipple
                  onPress={onEdit}
                  style={{borderRadius:radius.round}}
                ><Icon
                  source={{uri:gear.src}}
                  size={clickable.minWidth}
                /></TouchableRipple></View>
              : undefined
            }
        </View>
    </View>
  );
}

