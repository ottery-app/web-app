import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { shadows } from '../styles/shadow';
import { radius } from '../styles/radius';
import { margin } from "../styles/margin"
import { colors } from '../styles/colors';
import { Card } from 'react-native-paper';

const styles = (props) => StyleSheet.create({
    innner: {
      width: "100%",
      height: "100%",
      backgroundColor: colors.background.primary,
      borderRadius: radius.default,
      padding: margin.medium,
      flex: 1, // Take up all available space
      justifyContent: 'center', // Center content vertically
      alignItems: 'center',
      ...shadows.default
    },
    outer: {
      padding: margin.medium,
    },
  });

const Shadowbox = ({
  children,
}) => {
  const style = styles()

  return (
    <View style={style.outer}>
      <View style={style.innner}>
          {children}
      </View>
    </View>
  );
};

export default Shadowbox;
