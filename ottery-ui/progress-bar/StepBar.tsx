import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";
import { zindex } from "../styles/zindex";
import Button from "../buttons/Button";

import { radius } from "../styles/radius";

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
  return <View style={styles.bar} />;
}

function Circle({
  active,
  children,
  onPress,
}: CircleProps & PropsWithChildren) {
  const circleStyles = StyleSheet.flatten([
    styles.circle,
    active ? styles.borderColorActive : styles.borderColorDefault,
  ]);

  const labelStyle = active ? styles.textColorActive : styles.textColorDefault;

  return (
    <Button
      height={clickable.minHeight}
      labelStyle={labelStyle}
      onPress={onPress}
      radius={radius.round}
      styles={circleStyles}
      type="outlined"
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
      <Bar />
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
  bar: {
    backgroundColor: colors.background.secondary,
    height: 3.5,
    transform: [{ translateY: clickable.minHeight - 17 }],
    zIndex: zindex.back,
  },
  circle: {
    backgroundColor: colors.background.primary,
    zIndex: zindex.front,
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
