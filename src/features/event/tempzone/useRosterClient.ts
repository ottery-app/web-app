import { useQueryClient } from "react-query";
import { dropOffChildren } from "./rosterApi";
import { makeUseQuery } from "../../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../../queryStatus/makeUseMutation";

export const QUERY_ROSTER_TAG = "roster";

export function useRosterClient() {
    const queryClient = useQueryClient();

    const useDropOff = makeUseMutation({
        mutationFn: dropOffChildren,
    });

    return {
        useDropOff,
    }
}