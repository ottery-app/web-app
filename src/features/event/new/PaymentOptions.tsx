import { useEffect, useState } from "react";
import { View } from "react-native";

import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import { Main } from "../../../../ottery-ui/containers/Main";
import Head from "./components/UI/Head";
import NumericInput from "../../../../ottery-ui/input/NumericInput";
import Hint from "../../../../ottery-ui/containers/Hint";

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
    <>
      <Head>Payment</Head>
      <Hint peak="This is to get the attendee's consent to be billed" />
      <NumericInput
        label="cost of registration USD"
        onChange={handleCostChange}
        value={cost}
      />
    </>
  );
}

export default PaymentOptionsForm;
