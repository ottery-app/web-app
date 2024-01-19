import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { RRule } from "rrule";
import { EventDto, FormFieldDto } from "@ottery/ottery-dto";

import { useNavigator } from "../../../router/useNavigator";
import { usePing } from "../../../../ottery-ping";
import { useEventClient } from "../useEventClient";
import { EventFormData } from "../new";
import { useFormClient } from "../../form/useFormClient";
import { AppendListItem } from "../../../../ottery-ui/lists/AppendList";
import { Main } from "../../../../ottery-ui/containers/Main";
import { margin } from "../../../../ottery-ui/styles/margin";
import MultiStepForm from "../../../../ottery-ui/forms/MultiStepForm";
import TimesForm from "../new/TimesInfo";
import VolunteerSignUpOptionsForm from "../new/VolunteerSignUpOptions";
import GuardianSignUpOptionsForm from "../new/GuardianSignUpOptions";
import AttendeeSignUpOptionsForm from "../new/AttendeeSignUpOptions";
import PaymentOptionsForm from "../new/PaymentOptions";

const windowWidth = Dimensions.get("window").width;
window["RRule"] = RRule;

function EditEventScreen({ route }) {
  const eventId = route.params.eventId;
  const navigator = useNavigator();
  const Ping = usePing();
  const { useGetEvent, useUpdateEvent } = useEventClient();
  const updateEvent = useUpdateEvent();

  const eventRes = useGetEvent({ inputs: [eventId] });
  const event = eventRes?.data?.data as EventDto;

  const { useGetFieldsByIds } = useFormClient();
  useGetFieldsByIds({
    inputs: [event?.volenteerSignUp],
    onSuccess: (res) => {
      setEventForm((prev) => {
        const fields = (res?.data.map((form) => ({
          id: form._id,
          value: form,
        })) || []) as AppendListItem<FormFieldDto>[];
        prev.volenteerSignUp = fields;
        return { ...prev };
      });
    },
  });

  useGetFieldsByIds({
    inputs: [event?.attendeeSignUp],
    onSuccess: (res) => {
      setEventForm((prev) => {
        const fields = (res?.data.map((form) => ({
          id: form._id,
          value: form,
        })) || []) as AppendListItem<FormFieldDto>[];
        prev.attendeeSignUp = fields;
        return { ...prev };
      });
    },
  });

  useGetFieldsByIds({
    inputs: [event?.guardianSignUp],
    onSuccess: (res) => {
      setEventForm((prev) => {
        const fields = (res?.data.map((form) => ({
          id: form._id,
          value: form,
        })) || []) as AppendListItem<FormFieldDto>[];
        prev.guardianSignUp = fields;
        return { ...prev };
      });
    },
  });

  const [eventForm, setEventForm] = useState<EventFormData>();

  useEffect(() => {
    const formData: EventFormData = {
      summary: event.summary,
      org: event.org,
      description: event.description,
      location: event.location,
      rrule: RRule.fromString(event.rrule),
      start: event.start,
      durration: event.durration,
      volenteerSignUp: [],
      attendeeSignUp: [],
      guardianSignUp: [],
      cost: event.cost as any as number,
      public: event.public,
    };
    setEventForm(formData);
  }, [event]);

  function handleError(err: any) {
    Ping.error(err);
  }

  function handleSubmit(form: EventFormData) {
    updateEvent.mutate(
      {
        eventId,
        form: {
          ...form,
          volenteerSignUp: form.volenteerSignUp.map(({ value }) => value),
          attendeeSignUp: form.attendeeSignUp.map(({ value }) => value),
          guardianSignUp: form.guardianSignUp.map(({ value }) => value),
          rrule: form.rrule.toString(),
        },
      },
      {
        onSuccess: () => {
          navigator(-1);
        },
        onError: (err: any) => Ping.error(err.message),
      }
    );
  }

  return (
    <Main style={{ width: windowWidth - margin.large }} scrollable>
      {eventForm && (
        <MultiStepForm<EventFormData>
          form={eventForm}
          handleError={handleError}
          setForm={setEventForm}
          steps={[
            TimesForm,
            VolunteerSignUpOptionsForm,
            GuardianSignUpOptionsForm,
            AttendeeSignUpOptionsForm,
            PaymentOptionsForm,
          ]}
          submit={handleSubmit}
        />
      )}
    </Main>
  );
}

export default EditEventScreen;
