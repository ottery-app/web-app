import { useState } from "react";
import { getTimeZone } from "../../../functions/time";
import TimeForm from "./TimeForm";
import BasicInfo from "./BasicInfo";
import {Main} from "./newEventStyles";
import { VolunteerSignUpOptions, AttendeeSignUpOptions } from "./SignUpOptions";
import PaymentOptions from "./PaymentOptions";
import MultiPageForm from "../../../ottery-ui/forms/MultiPageForm";
import * as Event from "../eventApi";
import { Ping } from "../../../ottery-ping/Ping";
import { useNavigator } from "../../../hooks/useNavigator";

export default function NewEvent() {
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
                    Event.newEvent(form).then(()=>{
                        navigator(-1);
                    }).catch((e)=>{
                        Ping.error(e.message);
                    });
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