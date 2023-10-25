import React from "react";
import { View } from "react-native";
import { Appbar, IconButton } from "react-native-paper";

const MultiFieldHeader = ({
  title = "title",
  src = "pfp",
  tabs = [],
  tab = tabs[0],
  onTab = () => {},
  onSettings = null,
  radius = 0,
  centerComponent = null,
}) => {
  const head = Array.isArray(title) ? title : [title];
  const name = head[0].split(" ");

  return (
    <View>
      <Appbar.Header
        style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius }}
      >
        <Appbar.Content title={name[0]}>
          {name.slice(1).join(" ")}
        </Appbar.Content>

        {src && <IconButton icon="account" size={24} />}

        {onSettings && <IconButton icon="cog" size={24} onPress={onSettings} />}
      </Appbar.Header>

      <View>{centerComponent}</View>

      <Appbar>
        {tabs.map((tabItem, index) => (
          <Appbar.Action
            key={index}
            icon={tab === tabItem ? "check" : "label"}
            onPress={() => onTab(tabItem)}
          />
        ))}
      </Appbar>
    </View>
  );
};

export default MultiFieldHeader;
