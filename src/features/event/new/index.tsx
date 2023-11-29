import { useState } from "react";

import { usePing } from "../../../../ottery-ping";
import { useEventClient } from "../useEventClient";
import { useNavigator } from "../../../router/useNavigator";

import { Main } from "../../../../ottery-ui/containers/Main";
import MultiStepForm from "../../../../ottery-ui/forms/MultiStepForm";
import BasicInfoForm from "./BasicInfo";
import TimesForm from "./TimesInfo";
import VolunteerSignUpOptionsForm from "./VolunteerSignUpOptions";
import AttendeeSignUpOptionsForm from "./AttendeeSignUpOptions";
import PaymentOptionsForm from "./PaymentOptions";

export interface EventFormData {
  summary: string;
  org: string;
  description: string;
  start: number;
  end: number;
  location: string;
  recurrence: string[];
  volunteerSignUp: string[];
  attendeeSignUp: string[];
  cost: number;
  public: boolean;
}

function NewEventScreen({ route }) {
  const Ping = usePing();
  const { useNewEvent } = useEventClient();
  const newEvent = useNewEvent();
  const navigator = useNavigator();

  const [eventForm, setEventForm] = useState({
    summary: "",
    org: "",
    description: "",
    end: new Date().getTime(),
    start: new Date().getTime(),
    location: "",
    recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    volunteerSignUp: [],
    attendeeSignUp: [],
    cost: 0,
    public: true,
  });

  function handleError(err: any) {
    Ping.error(err);
  }

  function handleSubmit(form: EventFormData) {
    newEvent.mutate(form, {
      onSuccess: () => navigator(-1),
      onError: (err: any) => Ping.error(err.message),
    });
  }

  return (
    <Main>
      <MultiStepForm<EventFormData>
        form={eventForm}
        handleError={handleError}
        setForm={setEventForm}
        steps={[
          BasicInfoForm,
          TimesForm,
          VolunteerSignUpOptionsForm,
          AttendeeSignUpOptionsForm,
          PaymentOptionsForm,
        ]}
        submit={handleSubmit}
      />
    </Main>
  );
}

export default NewEventScreen;
