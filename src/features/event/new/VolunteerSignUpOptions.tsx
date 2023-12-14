import HelpWrapper from "./components/UI/HelpWrapper";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import SignUpOptions, { makeHandleDone } from "./components/SignUpOptions";
import Main from "./components/UI/Main";

function VolunteerSignUpOptionsForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  return (
    <Main>
      <HelpWrapper title="Volunteer Info">
        <SignUpOptions
          fields={form.volenteerSignUp}
          handleUpdate={makeHandleDone(setForm, "volenteerSignUp")}
          updateErrorHandler={updateErrorHandler}
        />
      </HelpWrapper>
    </Main>
  );
}

export default VolunteerSignUpOptionsForm;
