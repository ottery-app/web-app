import { makeUseQuery } from "../../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../../queryStatus/makeUseMutation";
import { acceptChildRequest, checkRequestsStatus, declineChildRequest, makeChildRequests, getWatingChildrenFor, getRequestsForGuardian } from "./tempzoneApi";

const QUERY_TEMPZONE_TAG = "tempzone";

export function useTempzoneClient() {

    const useMakeChildRequest = makeUseMutation({
        mutationFn: makeChildRequests,
    })

    const useGetRequestsForGuardian = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status"],
        queryFn: getRequestsForGuardian
    })

    /**
     * @deprecated
     */
    const useCheckRequestsStatus = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status"],
        queryFn: checkRequestsStatus,
    })

    /**
     * @deprecated
     */
    const useGetWaitingChildrenFor = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status", "waiting"],
        queryFn: getWatingChildrenFor,
    })

    /**
     * @deprecated
     */
    const useAcceptChildRequest = makeUseMutation({
        //queryKey: [QUERY_TEMPZONE_TAG, "request", "accept"],
        mutationFn: acceptChildRequest,
    });

    /**
     * @deprecated
     */
    const useDeclineChildRequest = makeUseMutation({
        //queryKey: [QUERY_TEMPZONE_TAG, "request", "decline"],
        mutationFn: declineChildRequest,
    })

    return {
        useMakeChildRequest,
        useGetRequestsForGuardian,
        useCheckRequestsStatus,
        useGetWaitingChildrenFor,
        useAcceptChildRequest,
        useDeclineChildRequest,
    }
}