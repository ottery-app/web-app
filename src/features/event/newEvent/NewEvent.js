import { useState } from "react";
import TimeForm from "./TimeForm";
import BasicInfo from "./BasicInfo";
import {Main} from "./newEventStyles";
import { VolunteerSignUpOptions, AttendeeSignUpOptions } from "./SignUpOptions";
import PaymentOptions from "./PaymentOptions";
import MultiPageForm from "../../../ottery-ui/forms/MultiPageForm";
import { usePing } from "../../../ottery-ping";
import { useNavigator } from "../../../hooks/useNavigator";
import { useEventClient } from "../useEventClient";

export default function NewEvent() {
    const Ping = usePing();
    const {useNewEvent} = useEventClient();
    const newEvent = useNewEvent();
    const [eventForm, setEventForm] = useState({
        summary:"",
        org:"",
        description:"",
        end: new Date().getTime(),
        start: new Date().getTime(),
        location: "",
        recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
        volenteerSignUp: [],
        attendeeSignUp: [],
        cost: 0,
        public: true,
    });
    const navigator = useNavigator();

    return (
        <Main>
            <MultiPageForm
                submit={(form)=>{
                    newEvent.mutate(form, {
                        onSuccess: ()=>navigator(-1),
                        onError: (e)=>Ping.error(e.message)
                    })
                }}
                form={eventForm}
                setForm={setEventForm}
                pages={[
                    BasicInfo,
                    TimeForm,
                    VolunteerSignUpOptions,
                    AttendeeSignUpOptions,
                    PaymentOptions,
                ]}
                handleError={(err)=>{Ping.error(err)}}
            />
        </Main>
    );
}