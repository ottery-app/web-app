import React from "react";
import { image } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad, radius } from "../styles/radius";
import { margin } from "../styles/margin";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import Image from "../image/Image";
import { View, StyleSheet } from "react-native";
import { ImageDto } from "@ottery/ottery-dto";
import { gear, pfp } from "../../assets/icons";
import { IconButton } from "../buttons/IconButton";
import { clickable } from "../styles/clickable";
import { border } from "../styles/border";
import { shadows } from "../styles/shadow";

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

export interface IconHeaderProps {
    title:string,
    src:ImageDto,
    alt:string,
    subTitle?: string,
    onEdit?: ()=>void,
    shadow?: boolean
}

export function IconHeader({
  //top row
  title = "title", //can be an array

  //image
  src = pfp,
  alt = "profile photo",
  subTitle,
  onEdit,
  shadow = true,
}: IconHeaderProps) {
  return (
    <View style={[styles.main, shadow && shadows.default]}>
        <View style={styles.inner}>
            <Image
                src={src}
                alt={alt}
                width={image.mediumProfile}
                height={image.mediumProfile}
                radius={rad.round}
            />
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

