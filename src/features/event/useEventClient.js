import { 
    getEvents, 
    newEvent,
    signUpAttendeesByIds,
    signUpVolenteersByIds,
    getInfo,
    getAttendeeSignup,
    getVolenteerSignup,
    getOwner,
} from "./eventApi";
import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";

export const QUERY_EVENT_TAG = "event";

export function useEventClient() {

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

    const useGetEventInfo = makeUseQuery({
        queryKey: [QUERY_EVENT_TAG, "eventInfo"],
        queryFn: getInfo,
    });

    const useNewEvent = makeUseMutation({
        mutationFn: newEvent,
    });

    const useSignUpAttendeesByIds = makeUseMutation({
        mutationFn: signUpAttendeesByIds,
    })

    const useSignUpVolenteersByIds = makeUseMutation({
        mutationFn: signUpVolenteersByIds,
    })

    return {
        useGetEvent,
        useGetEvents,
        useNewEvent,
        useGetEventInfo,
        useSignUpAttendeesByIds,
        useSignUpVolenteersByIds,
        useGetAttendeeSignup,
        useGetVolenteerSignup,
        useGetEventOwner,
    }
}