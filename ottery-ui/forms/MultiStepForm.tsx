import { createElement, useState } from "react";
import { StyleSheet, View } from "react-native";

import { margin } from "../styles/margin";
import StepBar from "../progress-bar/StepBar";
import Error from "../text/Error";
import ButtonField from "../buttons/ButtonField";
import Button from "../buttons/Button";

export interface StepProps<T> {
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  updateErrorHandler: React.Dispatch<React.SetStateAction<() => void>>;
}

export interface MultiStepFormProps<T> {
  submit: (form: T) => void;
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  steps: React.JSXElementConstructor<StepProps<T>>[];
  error?: any;
  handleError: (err: any) => void;
}

function MultiStepForm<T>({
  submit,
  form,
  setForm,
  steps,
  error,
  handleError,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState(error);
  const [errorHandler, setErrorHandler] = useState(() => () => undefined);
  const stepCount = steps.length;

  function validate() {
    const err = errorHandler();
    handleError && err ? handleError(err) : setFormError(err);
    return !err;
  }

  function updatePageBy(increment: number) {
    setCurrentStep((prevStep) => {
      const goto = prevStep + increment;
      if (goto > stepCount) {
        return stepCount;
      } else if (goto < 1) {
        return 1;
      } else {
        return goto;
      }
    });
  }

  function goNext() {
    if (validate()) {
      updatePageBy(1);
    }
  }

  function goBack() {
    updatePageBy(-1);
  }

  function goSubmit() {
    if (validate()) {
      submit(form);
    }
  }

  function updateErrorHandler(handler: () => any) {
    return setErrorHandler(() => handler);
  }

  function renderButtons({
    current,
    count,
    next,
    back,
    submit,
  }: {
    current: number;
    count: number;
    next: () => void;
    back: () => void;
    submit: () => void;
  }) {
    if (current === count) {
      return (
        <ButtonField>
          <Button onPress={back}>Back</Button>
          <Button state="success" onPress={submit}>
            Submit
          </Button>
        </ButtonField>
      );
    } else if (current === 1) {
      return (
        <ButtonField>
          <Button onPress={next}>Next</Button>
        </ButtonField>
      );
    } else {
      return (
        <ButtonField>
          <Button onPress={back}>Back</Button>
          <Button onPress={next}>Next</Button>
        </ButtonField>
      );
    }
  }

  return (
    <View style={styles.container}>
      <StepBar
        stepCount={stepCount}
        currentStep={currentStep}
        onPress={setCurrentStep}
      />
      {createElement(steps[currentStep - 1], {
        form,
        setForm,
        updateErrorHandler,
      })}
      <Error>{formError}</Error>
      {renderButtons({
        current: currentStep,
        count: stepCount,
        next: goNext,
        back: goBack,
        submit: goSubmit,
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: margin.medium,
    gap: margin.medium,
  },
});

export default MultiStepForm;
