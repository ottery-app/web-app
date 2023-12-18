import React from "react";
import { image } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { margin } from "../styles/margin";
import { Text } from "react-native-paper";
import Image from "../image/Image";
import { View, StyleSheet } from "react-native";
import { ImageDto } from "@ottery/ottery-dto";
import { pfp } from "../../assets/icons";

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
}

export function IconHeader({
  //top row
  title = "title", //can be an array

  //image
  src = pfp,
  alt = "profile photo",
  subTitle,
}: IconHeaderProps) {
  return (
    <View style={styles.main}>
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
                <Text variant="titleSmall">{subTitle}</Text>
            </View>
        </View>
    </View>
  );
}