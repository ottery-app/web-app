import { CreateEventDto } from "ottery-dto";
import { clideInst } from "../../app/clideInst";

export const newEvent = clideInst
    .makePost("event", {
        data_validator: CreateEventDto,
        in_pipeline: (form)=>{
            return {
                data: form,
            }
        }
    });

export const getInfo = clideInst
    .makeGet("event/:id", {
        in_pipeline: (id)=>{
            return {
                params: {
                    id,
                }
            }
        }
    });

export const getEvents = clideInst.makeGet("event", {
    in_pipeline: (ids)=>{
        return {
            params: {
                ids,
            }
        }
    }
});

export const getAttendeeSignup = clideInst
    .makeGet("event/:id/signup/attendee", {
        in_pipeline: (id)=>{
            return {
                params: {
                    id,
                }
            }
        }
    });

export const getVolenteerSignup = clideInst
    .makeGet("event/:id/signup/volenteer", {
        in_pipeline: (id)=>{
            return {
                params: {
                    id,
                }
            }
        }
    });

export const signUpVolenteersByIds = clideInst
    .makePatch("event/:eventId/signup/volenteer", {
        in_pipeline: (eventId, ids)=>{
            return {
                data: ids,
                params: {
                    eventId,
                }
            }
        }
    });

export const signUpAttendeesByIds = clideInst
    .makePatch("event/:eventId/signup/attendee", {
        in_pipeline: (eventId, ids)=>{
            return {
                data: ids,
                params: {
                    eventId,
                }
            }
        }
    });

export const getOwner = clideInst
    .makeGet("event/eventId/owner", {
        in_pipeline: (eventId)=>{
            return {
                params: {
                    eventId,
                }
            }
        }
    });