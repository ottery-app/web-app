import HelpWrapper from "./components/UI/HelpWrapper";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import SignUpOptions, { makeHandleDone } from "./components/SignUpOptions";
import { Main } from "../../../../ottery-ui/containers/Main";
import Button from "../../../../ottery-ui/buttons/Button";

function AttendeeSignUpOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<any>) {
  return (
    <HelpWrapper title="Attendee Info">
      <SignUpOptions
        fields={form.attendeeSignUp}
        handleUpdate={makeHandleDone(setForm, "attendeeSignUp")}
        updateErrorHandler={updateErrorHandler}
      />
    </HelpWrapper>
  );
}

export default AttendeeSignUpOptionsForm;
