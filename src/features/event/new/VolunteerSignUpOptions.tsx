import HelpWrapper from "./components/UI/HelpWrapper";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import SignUpOptions, { makeHandleDone } from "./components/SignUpOptions";
import { Main } from "../../../../ottery-ui/containers/Main";
import { useFormClient } from "../../form/useFormClient";
import { FormFlag } from "@ottery/ottery-dto";

function VolunteerSignUpOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  // const baseFormsRes = useFormClient().useGetBaseFormFields({inputs:[FormFlag.caretaker]});
  // const baseForms = baseFormsRes?.data?.data || [];

  return (
    <>
      <HelpWrapper
          title="Signup form for the volenteer"
          hint="Emergency data is collected by default"
      >
        <SignUpOptions
          //defaultFields={baseForms}
          fields={form.volenteerSignUp}
          handleUpdate={makeHandleDone(setForm, "volenteerSignUp")}
          updateErrorHandler={updateErrorHandler}
        />
      </HelpWrapper>
    </>
  );
}

export default VolunteerSignUpOptionsForm;
