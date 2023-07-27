import { useQuery, useQueryClient } from "react-query";
import { getEvents } from "./eventApi";

export const QUERY_EVENT_TAG = "event";

export function useEventClient() {
    const queryClient = useQueryClient();

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
            console.log(events);
            return getEvents(events)
        },
        ...options,
    });

    return {
        useGetEvent,
        useGetEvents,
    }
}