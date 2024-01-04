import { useEffect, useState } from "react";

import { usePing } from "../../../../ottery-ping";
import { useEventClient } from "../useEventClient";
import { Main } from "../../../../ottery-ui/containers/Main";
import MultiStepForm from "../../../../ottery-ui/forms/MultiStepForm";
import BasicInfoForm from "./BasicInfo";
import TimesForm from "./TimesInfo";
import VolunteerSignUpOptionsForm from "./VolunteerSignUpOptions";
import AttendeeSignUpOptionsForm from "./AttendeeSignUpOptions";
import PaymentOptionsForm from "./PaymentOptions";

import { FormFieldDto, FormFlag, noId, time } from "@ottery/ottery-dto";
import { useNavigator } from "../../../router/useNavigator";
import { AppendListItem } from "../../../../ottery-ui/lists/AppendList";
import { Frequency, RRule } from "rrule";
import { margin } from "../../../../ottery-ui/styles/margin";
import { Dimensions } from 'react-native';
import { useFormClient } from "../../form/useFormClient";
import GuardianSignUpOptionsForm from "./GuardianSignUpOptions";

const windowWidth = Dimensions.get('window').width;

window['RRule'] = RRule;

export interface EventFormData {
  summary: string;
  org: string;
  description: string;
  location: string;
  rrule: RRule;
  start: time,
  durration: time,
  volenteerSignUp: AppendListItem<FormFieldDto>[];
  attendeeSignUp: AppendListItem<FormFieldDto>[];
  guardianSignUp: AppendListItem<FormFieldDto>[];
  cost: number;
  public: boolean;
}

function NewEventScreen() {
  const navigator = useNavigator();
  const Ping = usePing();
  const { useNewEvent } = useEventClient();
  const newEvent = useNewEvent();

  const start = new Date();
  start.setSeconds(0);
  start.setMilliseconds(0);

  const [eventForm, setEventForm] = useState<EventFormData>({
    summary: "",
    org: noId,
    description: "",
    location: "",
    rrule: new RRule({freq: Frequency.DAILY, count: 1}),
    start: start.getTime(),
    durration: 3600000,
    volenteerSignUp: [],
    attendeeSignUp: [],
    guardianSignUp: [],
    cost: 0,
    public: false,
  });

  useFormClient().useGetBaseFormFields({
    inputs:[FormFlag.caretaker],
    onSuccess:(res)=>{
      setEventForm((p)=>{
        const fields = res?.data.map((form)=>({id:form._id, value:form})) || [];
        p.volenteerSignUp.push(...fields);
        return {...p};
      })
    }
  });
  useFormClient().useGetBaseFormFields({
    inputs:[FormFlag.guardian],
    onSuccess:(res)=>{
      setEventForm((p)=>{
        const fields = res?.data.map((form)=>({id:form._id, value:form})) || [];
        p.guardianSignUp.push(...fields);
        return {...p};
      })
    }
  });
  useFormClient().useGetBaseFormFields({
    inputs:[FormFlag.attendee],
    onSuccess:(res)=>{
      setEventForm((p)=>{
        const fields = res?.data.map((form)=>({id:form._id, value:form})) || [];
        p.attendeeSignUp.push(...fields);
        return {...p};
      })
    }
  });

  function handleError(err: any) {
    Ping.error(err);
  }

  function handleSubmit(form: EventFormData) {
    newEvent.mutate({
      ...form,
      volenteerSignUp: form.volenteerSignUp.map(({value})=>value),
      attendeeSignUp: form.attendeeSignUp.map(({value})=>value),
      rrule: form.rrule.toString(),
    }, {
      onSuccess: () => navigator(-1),
      onError: (err: any) => Ping.error(err.message),
    });
  }

  return (
    <Main style={{width:windowWidth - margin.large}} scrollable>
      <MultiStepForm<EventFormData>
        form={eventForm}
        handleError={handleError}
        setForm={setEventForm}
        steps={[
          BasicInfoForm,
          TimesForm,
          VolunteerSignUpOptionsForm,
          GuardianSignUpOptionsForm,
          AttendeeSignUpOptionsForm,
          PaymentOptionsForm,
        ]}
        submit={handleSubmit}
      />
    </Main>
  );
}

export default NewEventScreen;
