import { makeUseQuery } from "../../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../../queryStatus/makeUseMutation";
import { acceptChildRequest, checkRequestsStatus, declineChildRequest, makeChildRequests, getRequestsForGuardian, getWatingChildrenForEvent } from "./tempzoneApi";

const QUERY_TEMPZONE_TAG = "tempzone";

export function useTempzoneClient() {

    const useMakeChildRequest = makeUseMutation({
        mutationFn: makeChildRequests,
    })

    const useGetRequestsForGuardian = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status"],
        queryFn: getRequestsForGuardian
    })

    const useGetWaitingChildrenForEvent = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status"],
        queryFn: getWatingChildrenForEvent,
    })

    const useAcceptChildRequest = makeUseMutation({
        //queryKey: [QUERY_TEMPZONE_TAG, "request", "accept"],
        mutationFn: acceptChildRequest,
    });

    const useDeclineChildRequest = makeUseMutation({
        //queryKey: [QUERY_TEMPZONE_TAG, "request", "decline"],
        mutationFn: declineChildRequest,
    })

    return {
        useMakeChildRequest,
        useGetRequestsForGuardian,
        useGetWaitingChildrenForEvent,
        useAcceptChildRequest,
        useDeclineChildRequest,
    }
}