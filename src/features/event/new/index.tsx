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

import { FormFieldDto, noId } from "@ottery/ottery-dto";
import { useNavigator } from "../../../router/useNavigator";
import { AppendListItem } from "../../../../ottery-ui/lists/AppendList";
import { Frequency, RRule } from "rrule";

window["rule"] = RRule;

export interface EventFormData {
  summary: string;
  org: string;
  description: string;
  location: string;
  rrule: RRule;
  volenteerSignUp: AppendListItem<FormFieldDto>[];
  attendeeSignUp: AppendListItem<FormFieldDto>[];
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
    location: "",
    rrule: new RRule({freq:Frequency.DAILY,count:1, dtstart: new Date()}),
    volenteerSignUp: [],
    attendeeSignUp: [],
    cost: 0,
    public: false,
  });

  function handleError(err: any) {
    Ping.error(err);
  }

  function handleSubmit(form: EventFormData) {
    newEvent.mutate({
      ...form,
      volenteerSignUp: form.volenteerSignUp.map(({value})=>value),
      attendeeSignUp: form.attendeeSignUp.map(({value})=>value),
    }, {
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
