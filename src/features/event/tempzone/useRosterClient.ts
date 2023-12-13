import { useQueryClient } from "react-query";
import { dropOffChildren, getAttendees, pickupChildren } from "./rosterApi";
import { makeUseQuery } from "../../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../../queryStatus/makeUseMutation";

export const QUERY_ROSTER_TAG = "roster";

export function useRosterClient() {
    const queryClient = useQueryClient();

    const useDropOff = makeUseMutation({
        mutationFn: dropOffChildren,
        onSuccessAlways: ()=>{
            queryClient.invalidateQueries(QUERY_ROSTER_TAG);
        }
    });

    const usePickUp = makeUseMutation({
        mutationFn: pickupChildren,
        onSuccessAlways: ()=>{
            queryClient.invalidateQueries(QUERY_ROSTER_TAG);
        }
    })

    const useGetAttendees = makeUseQuery({
        queryKey: [QUERY_ROSTER_TAG],
        queryFn: getAttendees,
    })

    return {
        usePickUp,
        useDropOff,
        useGetAttendees,
    }
}