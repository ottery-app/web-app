import { isId, isRequestType } from "@ottery/ottery-dto";
import { ChildRequestDto, requestStatus } from "@ottery/ottery-dto";
import { validateAsArr } from "@ottery/ottery-dto";
import { clideInst } from "../../../provider/clideInst";

export const makeChildRequests = clideInst.makePost("tempzone/request", {
    data_validator: validateAsArr(ChildRequestDto),
    in_pipeline: (childRequests) => {
        return {
            data:childRequests
        }
    }
})

export const getRequestsForGuardian = clideInst.makeGet("tempzone/request/status", {
    param_validators: {
        guardian: isId,
    },
    in_pipeline: (guardianId)=>{
        return {
            params: {
                guardian: guardianId,
            }
        }
    }
});

/**
 * @deprecated
 */
export const checkRequestsStatus = clideInst
    .makeGet("tempzone/request/status", {
        param_validators: {
            children: validateAsArr(isId),
        },
        in_pipeline: (childIds)=>{
            return {
                params: {
                    children: childIds,
                }
            }
        }
    });

export const getWatingChildrenForEvent = clideInst
    .makeGet("tempzone/request/status", {
        param_validators: {
            event: isId,
            type: isRequestType,
        },
        in_pipeline: (eventId, requestType)=>{
            const params = {
                event: eventId,
                status: requestStatus.INPROGRESS,
                type: requestType,
            };

            return {
                params: params,
            }
        }
    });

export const acceptChildRequest = clideInst
    .makePatch("tempzone/request/accept", {
        data_validator: validateAsArr(ChildRequestDto),
        in_pipeline: (request)=>{
            return {
                data: [request]
            }
        }
    });

export const declineChildRequest = clideInst
    .makePatch("tempzone/request/decline", {
        data_validator: validateAsArr(ChildRequestDto),
        in_pipeline: (request)=>{
            return {
                data: [request]
            }
        }
    });
