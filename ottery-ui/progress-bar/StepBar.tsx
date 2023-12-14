import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";
import { zindex } from "../styles/zindex";
import Button from "../buttons/Button";

import { radius } from "../styles/radius";
import { border } from "../styles/border";

interface CircleProps {
  active?: boolean;
  onPress: (step: number) => void;
}

function Main({ children }: React.PropsWithChildren) {
  return <View style={styles.main}>{children}</View>;
}

function ProgressBar({ children }: React.PropsWithChildren) {
  return <View style={styles.progressBar}>{children}</View>;
}

function Bar() {
  return (
    <View style={styles.barContainer}>
      <View style={styles.barPadding}></View>
      <View style={styles.bar}></View>
      <View style={styles.barPadding}></View>
    </View>
  );
}

function Circle({
  active,
  children,
  onPress,
}: CircleProps & PropsWithChildren) {
  const contentStyle = StyleSheet.flatten([
    styles.circle,
    active ? styles.borderColorActive : styles.borderColorDefault,
  ]);

  const labelStyle = active ? styles.textColorActive : styles.textColorDefault;

  return (
    <Button
      contentStyle={contentStyle}
      height={clickable.minHeight}
      labelStyle={labelStyle}
      onPress={onPress}
      radius={radius.round}
      type="text"
      width={clickable.minWidth}
    >
      {children}
    </Button>
  );
}

interface StepBarProps {
  stepCount: number;
  currentStep: number;
  onPress: (step: number) => void;
}

function StepBar({ stepCount, currentStep, onPress }: StepBarProps) {
  function handleStepPress(step: number) {
    return () => onPress(step);
  }

  return (
    <Main>
      <ProgressBar>
        {[...Array(stepCount).keys()].map((step) => (
          <Circle
            active={currentStep === step + 1}
            key={step}
            onPress={handleStepPress(step + 1)}
          >
            {step + 1}
          </Circle>
        ))}
      </ProgressBar>
      <Bar />
    </Main>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barContainer: {
    position: "absolute",
    width: "100%",
    zIndex: zindex.back,
  },
  barPadding: {
    padding: 8,
  },
  bar: {
    height: border.thick,
    backgroundColor: colors.background.secondary,
  },
  circle: {
    borderWidth: border.thick,
    zIndex: zindex.front,
    backgroundColor: colors.background.primary,
  },
  borderColorDefault: {
    borderColor: colors.background.secondary,
  },
  borderColorActive: {
    borderColor: colors.primary.main,
  },
  textColorDefault: {
    color: colors.text.tertiary,
  },
  textColorActive: {
    color: colors.primary.main,
  },
});

export default StepBar;
