import { useQuery, useQueryClient } from "react-query";
import { getEvents, newEvent } from "./eventApi";
import {makeUseMutation} from "../../hooks/makeUseMutation";

export const QUERY_EVENT_TAG = "event";

export function useEventClient() {
    const useNewEvent = makeUseMutation({
        mutationFn: newEvent,
    });

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

    return {
        useGetEvent,
        useGetEvents,
        useNewEvent,
    }
}