import { ScrollView, StyleSheet, View } from "react-native";
import { margin } from "../../ottery-ui/styles/margin";
import React, { ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
  style?: any;
  scrollable?: boolean,
  margins?: boolean,
}

export function Main({ 
  children, 
  style, 
  scrollable=false, 
  margins=true
}: MainProps) {

  const stylesheets: any[] = [styles.base];
  if (margins) stylesheets.push(styles.margin);
  if (scrollable) stylesheets.push(styles.scroll);

  if (scrollable) {
    return <ScrollView
      keyboardShouldPersistTaps="always"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={true}
      style={stylesheets}
      contentContainerStyle={style}
    >{children}</ScrollView>
  } else {
    return <View style={stylesheets}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  margin: {
    padding: margin.medium,
  },

  base: {
    flex:1,
  },

  scroll: {
    flex: 1,
  }
});