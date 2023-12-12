import React from 'react';
import { StyleSheet } from 'react-native';
import { radius } from '../styles/radius';
import { margin } from "../styles/margin"
import { colors } from '../styles/colors';
import { Surface } from 'react-native-paper';

const styles = StyleSheet.create({
    innner: {
      backgroundColor: colors.background.primary,
      borderRadius: radius.default,
      padding: margin.medium,
      margin: margin.medium,
    },
  });

const Shadowbox = ({
  children,
}) => {
  return (
    <Surface style={styles.innner}>
      {children}
    </Surface>
  );
};

export default Shadowbox;
