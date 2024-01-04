import HelpWrapper from "./components/UI/HelpWrapper";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import SignUpOptions, { makeHandleDone } from "./components/SignUpOptions";

function AttendeeSignUpOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<any>) {
  return (
    <HelpWrapper 
      title="Signup form for the attendee"
      hint="Emergency data is collected by default"
    >
      <SignUpOptions
        fields={form.attendeeSignUp}
        handleUpdate={makeHandleDone(setForm, "attendeeSignUp")}
        updateErrorHandler={updateErrorHandler}
      />
    </HelpWrapper>
  );
}

export default AttendeeSignUpOptionsForm;
