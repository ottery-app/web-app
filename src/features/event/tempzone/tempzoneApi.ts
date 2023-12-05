import { isId, isRequestType } from "@ottery/ottery-dto";
import { ChildRequestDto, requestStatus } from "@ottery/ottery-dto";
import { validateAsArr } from "@ottery/ottery-dto";
import { clideInst } from "../../../provider/clideInst";
import { getChildren } from "../../user/userApi";

/**
 * @deprecated
 */
export const dropOffChildren = clideInst
    .makePost("tempzone/request/dropoff", {
        data_validator: validateAsArr(ChildRequestDto),
        in_pipeline: (dropOffRequestForms) => {
            return {
                data:dropOffRequestForms
            }
        }
    });

/**
 * @deprecated
 */
export const pickUpChildren = clideInst
    .makePost("tempzone/request/pickup", {
        data_validator: validateAsArr(ChildRequestDto),
        in_pipeline: (pickUpRequestForms) => {
            return {
                data:pickUpRequestForms
            }
        },
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

/**
 * @deprecated
 */
export const getWatingChildrenFor = clideInst
    .makeGet("tempzone/request/status", {
        param_validators: {
            event: isId,
            type: isRequestType,
        },
        in_pipeline: (eventId, requestType)=>{
            return {
                params: {
                    event: eventId,
                    status: requestStatus.INPROGRESS,
                    type: requestType,
                }
            }
        },
        out_pipeline: async (res) => {

            if (res.data.length) {
                const children = await getChildren(res.data.map(r=>r.child));
                res.data = res.data.map((req, i)=>{
                    req.child = children.data[i];
                    return req;
                });
            }

            return res
        }
    });

/**
 * @deprecated
 */
export const acceptChildRequest = clideInst
    .makePatch("tempzone/request/accept", {
        data_validator: validateAsArr(ChildRequestDto),
        in_pipeline: (request)=>{
            return {
                data: [request]
            }
        }
    });

/**
 * @deprecated
 */
export const declineChildRequest = clideInst
    .makePatch("tempzone/request/decline", {
        data_validator: validateAsArr(ChildRequestDto),
        in_pipeline: (request)=>{
            return {
                data: [request]
            }
        }
    });
