import { noId, requestType } from "@ottery/ottery-dto";
import { useGetRequests, useRemoveRequest } from "../tempzoneSlice";
import {useEffect} from "react";

export function DropOffStatus() {
    const requests = useGetRequests(request=>request.type === requestType.DROPOFF);

    console.log(requests);

    return "status"
}