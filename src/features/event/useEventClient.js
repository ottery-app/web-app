import { 
    getEvents, 
    newEvent,
    getInfo,
    getAttendeeSignup,
    getVolenteerSignup,
    getOwner,
    signupUser,
    signupAttendee,
} from "./eventApi";
import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";

export const QUERY_EVENT_TAG = "event";

export function useEventClient() {

    const useGetEventInfo = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG, "eventInfo"],
        queryFn: getInfo,
    });

    const useGetEvent = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG, "event"],
        queryFn: async (event)=>{
            let res = await getEvents([event]);
            res.data = res.data[0];
            return res;
        }
    });

    const useGetEvents = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG],
        queryFn: getEvents,
    });

    const useGetEventOwner = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG, "owner"],
        queryFn: getOwner,
    })

    const useGetAttendeeSignup = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG, "attendee", "signup"],
        queryFn: getAttendeeSignup,
    })

    const useGetVolenteerSignup = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG, "volenteer", "signup"],
        queryFn: getVolenteerSignup,
    })

    const useNewEvent = makeUseMutation({
        mutationFn: newEvent,
    });

    const useSignupUser = makeUseMutation({
        mutationFn: signupUser,
    })

    const useSignupAttendee = makeUseMutation({
        mutationFn: signupAttendee,
    })

    

    return {
        useGetEvent,
        useGetEvents,
        useNewEvent,
        useGetEventInfo,
        useSignupAttendee,
        useSignupUser,
        useGetAttendeeSignup,
        useGetVolenteerSignup,
        useGetEventOwner,
    }
}