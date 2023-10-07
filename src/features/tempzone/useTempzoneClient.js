import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";
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
        //queryKey: [QUERY_TEMPZONE_TAG, "request", "accept"],
        mutationFn: acceptChildRequest,
    });

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