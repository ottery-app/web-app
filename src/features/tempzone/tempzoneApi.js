import { axiosInst } from "../../app/axiosInst";
import { classifyWithDto, isId, isRequestType } from "ottery-dto";
import { ERR_USER } from "../../app/axiosInst";
import { ChildRequestDto, requestStatus } from "ottery-dto";
import {getChildren} from "../child/childApi";
import { clideInst } from "../../app/clideInst";
import { useValidatorAsArr } from "ottery-dto";

export const dropOffChildren = clideInst
    .makePost("tempzone/request/dropoff", {
        data_validator: useValidatorAsArr(ChildRequestDto),
        in_pipeline: (dropOffRequestForms) => {
            return {
                data:dropOffRequestForms
            }
        }
    });

export const pickUpChildren = clideInst
    .makePost("tempzone/request/pickup", {
        data_validator: useValidatorAsArr(ChildRequestDto),
        in_pipeline: (pickUpRequestForms) => {
            return {
                data:pickUpRequestForms
            }
        }
    });

export const checkRequestsStatus = clideInst
    .makeGet("tempzone/request/status", {
        param_validators: {
            children: useValidatorAsArr(isId),
        },
        in_pipeline: (childIds)=>{
            return {
                params: {
                    children: childIds,
                }
            }
        }
    });

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

export const acceptChildRequest = clideInst
    .makePatch("tempzone/request/accept", {
        data_validator: useValidatorAsArr(ChildRequestDto),
        in_pipeline: (request)=>{
            return {
                data: [request]
            }
        }
    });

export const acceptChildDecline = clideInst
    .makePatch("tempzone/request/decline", {
        data_validator: useValidatorAsArr(ChildRequestDto),
        in_pipeline: (request)=>{
            return {
                data: [request]
            }
        }
    });

