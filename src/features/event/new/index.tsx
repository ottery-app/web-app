import { useState } from "react";

import { usePing } from "../../../../ottery-ping";
import { useEventClient } from "../useEventClient";
import { Main } from "../../../../ottery-ui/containers/Main";
import MultiStepForm from "../../../../ottery-ui/forms/MultiStepForm";
import BasicInfoForm from "./BasicInfo";
import TimesForm from "./TimesInfo";
import VolunteerSignUpOptionsForm from "./VolunteerSignUpOptions";
import AttendeeSignUpOptionsForm from "./AttendeeSignUpOptions";
import PaymentOptionsForm from "./PaymentOptions";

import { noId } from "@ottery/ottery-dto";
import { FieldData } from "./components/FieldSelect";
import { useNavigator } from "../../../router/useNavigator";

export interface EventFormData {
  summary: string;
  org: string;
  description: string;
  start: number;
  end: number;
  location: string;
  recurrence: string[];
  volenteerSignUp: FieldData[];
  attendeeSignUp: FieldData[];
  cost: number;
  public: boolean;
}

function NewEventScreen() {
  const navigator = useNavigator();
  const Ping = usePing();
  const { useNewEvent } = useEventClient();
  const newEvent = useNewEvent();

  const [eventForm, setEventForm] = useState<EventFormData>({
    summary: "",
    org: noId,
    description: "",
    end: new Date().getTime(),
    start: new Date().getTime(),
    location: "",
    recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    volenteerSignUp: [],
    attendeeSignUp: [],
    cost: 0,
    public: false,
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
    <Main scrollable>
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
