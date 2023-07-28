import { useQuery, useQueryClient } from "react-query";
import { 
    getEvents, 
    newEvent,
    signUpAttendeesByIds,
    signUpVolenteersByIds,
    getInfo,
} from "./eventApi";
import {makeUseMutation} from "../../hooks/makeUseMutation";
import {makeUseQuery} from "../../hooks/makeGetQuery";

export const QUERY_EVENT_TAG = "event";

export function useEventClient() {

    const useGetEvent = (event, options)=>useQuery({
        queryKey: [QUERY_EVENT_TAG, event],
        queryFn: async ()=>{
            let res = await getEvents([event]);
            res.data = res.data[0];
            return res;
        },
        ...options,
    })

    const useGetEvents = (events, options)=>useQuery({
        queryKey: QUERY_EVENT_TAG,
        queryFn: async()=>{
            return getEvents(events)
        },
        ...options,
    });

    const useGetEventInfo = makeUseQuery({
        queryFn: [QUERY_EVENT_TAG, "eventInfo"],
        queryKey: getInfo,
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
    }
}