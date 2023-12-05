import { makeUseQuery } from "../../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../../queryStatus/makeUseMutation";
import { acceptChildRequest, checkRequestsStatus, declineChildRequest, dropOffChildren, getWatingChildrenFor, pickUpChildren } from "./tempzoneApi";

const QUERY_TEMPZONE_TAG = "tempzone";

export function useTempzoneClient() {
    /**
     * @deprecated
     */
    const useDropOffChildren = makeUseMutation({
        mutationFn: dropOffChildren,
    })

    /**
     * @deprecated
     */
    const usePickupChildren = makeUseMutation({
        mutationFn: pickUpChildren,
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
        useDropOffChildren,
        usePickupChildren,
        useCheckRequestsStatus,
        useGetWaitingChildrenFor,
        useAcceptChildRequest,
        useDeclineChildRequest,
    }
}