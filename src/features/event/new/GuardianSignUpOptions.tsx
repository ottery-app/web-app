import HelpWrapper from "./components/UI/HelpWrapper";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import SignUpOptions, { makeHandleDone } from "./components/SignUpOptions";
import { useFormClient } from "../../form/useFormClient";
import { FormFlag } from "@ottery/ottery-dto";

function GuardianSignUpOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
//   const baseFormsRes = useFormClient().useGetBaseFormFields({inputs:[FormFlag.guardian]});
//   const baseForms = baseFormsRes?.data?.data || [];

  return (
    <>
        <HelpWrapper
            title="Signup form for the guardian"
            hint="Emergency data is collected by default"
        >
            <SignUpOptions
                //defaultFields={baseForms}
                fields={form.guardianSignUp}
                handleUpdate={makeHandleDone(setForm, "guardianSignUp")}
                updateErrorHandler={updateErrorHandler}
            />
        </HelpWrapper>
    </>
  );
}

export default GuardianSignUpOptionsForm;
