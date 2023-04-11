import { axiosInst } from "../../app/axiosInst";
import { classifyWithDto, isRequestType } from "ottery-dto";
import { ERR_USER } from "../../app/axiosInst";
import { ChildRequestDto, requestStatus } from "ottery-dto";
import {getChildren} from "../child/childApi";

export async function dropOffChildren(dropOffRequestForms) {
    try {
        for (let i = 0; i < dropOffRequestForms.length; i++) {
            classifyWithDto(
                ChildRequestDto,
                dropOffRequestForms[i],
                {throw: true}
            );
        }
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.post("api/tempzone/request/dropoff", dropOffRequestForms);
    } catch (e) {
        throw e;
    }
}

export async function pickUpChildren(pickUpRequestForms) {
    try {
        for (let i = 0; i < pickUpRequestForms.length; i++) {
            classifyWithDto(
                ChildRequestDto,
                pickUpRequestForms[i],
                {throw: true}
            );
        }
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.post("api/tempzone/request/pickup", pickUpRequestForms);
    } catch (e) {
        throw e;
    }
}

export async function checkRequestsStatus(childids) {
    try {
        return await axiosInst.get(`api/tempzone/request/status`, {
            params: {
                children: childids,
            }
        });
    } catch (e) {
        throw e;
    }
}

export async function getWatingChildrenFor(eventId, requestType) {
    try {
        isRequestType(requestType, {throw:true});
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        const requests = await axiosInst.get(`api/tempzone/request/status`, {
            params: {
                event: eventId,
                status: requestStatus.INPROGRESS,
                type: requestType,
            },
        });
        
        if (requests.data.length) {
            const children = await getChildren(requests.data.map(r=>r.child));
            requests.data = requests.data.map((req, i)=>{
                req.child = children.data[i];
                return req;
            });
        }

        return requests;
    } catch (e) {
        throw e;
    }
}

export async function acceptChildRequest(request) {
    try {
        classifyWithDto(
            ChildRequestDto,
            request,
            {throw: true}
        );
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.patch("api/tempzone/request/accept", [request]);
    } catch (e) {
        throw e;
    }
}

export async function declineChildRequest(request) {
    try {
        classifyWithDto(
            ChildRequestDto,
            request,
            {throw: true}
        );
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.patch("api/tempzone/request/decline", [request]);
    } catch (e) {
        throw e;
    }
}