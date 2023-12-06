import { ChildRequestDto, requestStatus } from "@ottery/ottery-dto";

/**
 * This function is used to go through and determine the status of all the requests as a unit.
 * This means there is one status returned and this is relative to the priority of the request.status.
 * 
 * The status order is:
 * 1. requestStatus.NONE | requestStatus.INPROGRESS
 * 2. requestStatus.REJECTED
 * 3. requestStatus.ACCEPTED
 * 
 * Note: if the final request status is NONE then INPROGRESS is returned.
 * 
 * @param {ChildRequestDto[]} requests the list of reqeusts to get the inate status of
 */
export function requestsStatus(requests:ChildRequestDto[]) {
    const status = requests.reduce((status, request)=>{
        if (priorityMap[status] < priorityMap[request.status]) {
            return request.status;
        } else {
            return status;
        }
    }, requestStatus.NONE);

    return (status === requestStatus.NONE) ? requestStatus.INPROGRESS : status;
}

const priorityMap = {
    [requestStatus.NONE]:2,
    [requestStatus.INPROGRESS]:2,
    [requestStatus.REJECTED]:1,
    [requestStatus.ACCEPTED]:0,
}