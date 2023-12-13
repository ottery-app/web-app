import { useEffect, useState } from "react";
import { View } from "react-native";

import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import Main from "./components/UI/Main";
import Head from "./components/UI/Head";
import NumericInput from "../../../../ottery-ui/input/NumericInput";

function PaymentOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  const [cost, setCost] = useState(form.cost);

  useEffect(() => {
    updateErrorHandler(() => {
      if (cost === undefined) {
        return "Missing cost";
      }
    });

    setForm((form) => {
      return {
        ...form,
        cost,
      };
    });
  }, [cost]);

  function handleCostChange(cost?: number) {
    setCost(cost);
  }

  return (
    <Main>
      <Head>Payment</Head>
      <NumericInput
        label="cost of registration USD"
        onChange={handleCostChange}
        value={cost}
      />
    </Main>
  );
}

export default PaymentOptionsForm;
