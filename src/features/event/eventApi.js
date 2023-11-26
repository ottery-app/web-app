import { CreateEventDto } from "@ottery/ottery-dto";
import { getChildren } from "../user/userApi";
import { clideInst } from "../../provider/clideInst";

export const newEvent = clideInst
    .makePost("event", {
        data_validator: CreateEventDto,
        in_pipeline: (form)=>{
            return {
                data: form,
            }
        }
    });

export const getVolenteerStatus = async (eventId, userId)=>{
    let {data:event} = await getInfo(eventId);
    return {data:event.volenteers.includes(userId)};
}

export const getAttendeeStatus = async (eventId, userId)=>{
    //let {data:event} = await getInfo(eventId);
    let {data:children} = await getChildren(userId);
    let events = children.reduce((arr,child)=>[...arr, ...child.events], []);
    return {data:events.includes(eventId)};
}

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

export const signupUser = clideInst
    .makePatch("signup/volenteer/:eventId", {
        in_pipeline: (eventId)=>{
            return {
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
    .makeGet("event/:eventId/owner", {
        in_pipeline: (eventId)=>{
            return {
                params: {
                    eventId,
                }
            }
        }
    });