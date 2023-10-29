import React from "react";
import { imageStyles } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { margin } from "../styles/margin";
import TabField from "../buttons/tabs/TabField";
import { TabButtonTypes } from "../buttons/tabs/TabButton";
import { IconButton } from "react-native-paper";
import Image from "../image/Image";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const IMAGE_RAD = imageStyles.clickable.minHeight;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    gap: margin.medium,
    width: "100%",
    backgroundColor: colors.background.primary,
  },
  container: {
    flexDirection: "row",
    width: "100%",
  },
  column: {
    flex: 1,
  },
  userDetails: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: "25px",
    gap: margin.large,
    margin: margin.medium,
  },
  title: { flex: 1 },
  settings: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    paddingRight: "25px",
    marginTop: margin.medium,
  },
});

export function MultiFieldHeader({
  //top row
  title = "title", //can be an array

  //image
  src = "pfp",
  alt = "profile photo",

  //tabs
  tabs = [],
  tab = tabs[0],
  onTab = () => {},
  onSettings = null,

  //style
  radius = rad.square,
}) {
  console.log(tabs);
  const head = Array.isArray(title) ? title : [title];
  const name = head[0].split(" ");
  return (
    <>
      <View
        style={[
          styles.header,
          {
            borderTopLeftRadius: rad.square,
            borderTopRightRadius: rad.square,
          },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.column}>
            <View style={styles.userDetails}>
              <Image
                src={src}
                alt={alt}
                width={IMAGE_RAD}
                height={IMAGE_RAD}
                radius={rad.round}
              />
              <View style={styles.title}>
                <Text>
                  {name[0].charAt(0).toUpperCase() + name[0].slice(1)}
                  <br />
                  {name.splice(1)}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.column}>
            {onSettings && (
              <IconButton
                style={styles.settings}
                icon="cog"
                size={30}
                onPress={onSettings}
              />
            )}
          </TouchableOpacity>
        </View>
        <TabField
          type={TabButtonTypes.upright}
          tabs={tabs}
          active={tab}
          onTab={onTab}
        />
      </View>
    </>
  );
}
