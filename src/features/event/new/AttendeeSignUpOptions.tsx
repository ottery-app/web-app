import HelpWrapper from "./components/UI/HelpWrapper";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import SignUpOptions, { makeHandleDone } from "./components/SignUpOptions";
import Main from "./components/UI/Main";

function AttendeeSignUpOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  return (
    <Main>
      <HelpWrapper title="Attendee Info">
        <SignUpOptions
          fields={form.attendeeSignUp}
          handleUpdate={makeHandleDone(setForm, "attendeeSignUp")}
          updateErrorHandler={updateErrorHandler}
        />
      </HelpWrapper>
    </Main>
  );
}

export default AttendeeSignUpOptionsForm;
