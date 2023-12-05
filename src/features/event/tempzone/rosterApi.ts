import { IdArrayDto, id, isId } from "@ottery/ottery-dto";
import { clideInst } from "../../../provider/clideInst";

export const dropOffChildren = clideInst.makePatch('roster/:eventId/dropOff', {
    data_validator: IdArrayDto,
    param_validators: {
        eventId: isId,
    },
    in_pipeline: ({eventId, childrenIds})=>{
        return {
            params: {eventId},
            data: {ids:childrenIds}
        }
    }
});

export const pickupChildren = clideInst.makePatch("roster/:eventId/pickup", {
    data_validator: IdArrayDto,
    param_validators: {
        eventId: isId,
    },
    in_pipeline: ({eventId, childrenIds})=>{
        return {
            params: {eventId},
            data: {ids:childrenIds}
        }
    }
})

export interface getAttendeesParams {
    present?: boolean | undefined,
}

export const getAttendees = clideInst.makeGet("roster/:eventId/attendees", {
    param_validators: {
        eventId: isId,
    },
    in_pipeline: (eventId:id, params?:getAttendeesParams)=>{

        return {
            params: {
                eventId: eventId,
                ...params,
            }
        }
    }
})