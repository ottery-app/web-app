import { makeUseQuery } from "../../hooks/makeGetQuery";
import { makeUseMutation } from "../../hooks/makeUseMutation";
import { acceptChildRequest, checkRequestsStatus, declineChildRequest, dropOffChildren, getWatingChildrenFor, pickUpChildren } from "./tempzoneApi";

const QUERY_TEMPZONE_TAG = "tempzone";

export function useTempzoneClient() {
    const useDropOffChildren = makeUseMutation({
        mutationFn: dropOffChildren,
    })

    const usePickupChildren = makeUseMutation({
        mutationFn: pickUpChildren,
    })

    const useCheckRequestsStatus = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status"],
        queryFn: checkRequestsStatus,
    })

    const useGetWaitingChildrenFor = makeUseQuery({
        queryKey: [QUERY_TEMPZONE_TAG, "status", "waiting"],
        queryFn: getWatingChildrenFor,
    })

    const useAcceptChildRequest = makeUseMutation({
        queryKey: [QUERY_TEMPZONE_TAG, "request", "accept"],
        queryFn: acceptChildRequest,
    });

    const useDeclineChildRequest = makeUseMutation({
        queryKey: [QUERY_TEMPZONE_TAG, "request", "decline"],
        queryFn: declineChildRequest,
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