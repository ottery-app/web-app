import { classifyWithDto, CreateEventDto } from "ottery-dto";
import { axiosInst, ERR_USER } from "../../app/axiosInst";

export async function newEvent(form) {
    try {
        classifyWithDto(
            CreateEventDto,
            form,
            {throw:true},
        )
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.post("api/event", form);
    } catch (e) {
        throw e.response.data;
    }
}

export async function getInfo(id) {
    try {
        return await axiosInst.get(`api/event/${id}`);
    } catch (e) {
        throw e.response.data;
    }
}

export async function getEvents(ids) {
    try {
        return await axiosInst.get(`api/event`, {
            params: {
                ids: ids
            }
        });
    } catch (e) {
        throw e.response.data;
    }
}

export async function getAttendeeSignup(id) {
    try {
        return await axiosInst.get(`api/event/${id}/signup/attendee`);
    } catch (e) {
        throw e.response.data;
    }
}

export async function getVolenteerSignup(id) {
    try {
        return await axiosInst.get(`api/event/${id}/signup/volenteer`);
    } catch (e) {
        throw e.response.data;
    }
}

export async function signUpVolenteersByIds(eventId, ids) {
    try {
        return await axiosInst.patch(`api/event/${eventId}/signup/volenteer`, ids);
    } catch (e) {
        throw e.response.data;
    }
}

export async function signUpAttendeesByIds(eventId, ids) {
    try {
        return await axiosInst.patch(`api/event/${eventId}/signup/attendee`, ids);
    } catch (e) {
        throw e.response.data;
    }
}

export async function getOwner(eventId) {
    try {
        return await axiosInst.get(`api/event/${eventId}/owner`);
    } catch (e) {
        throw e.response.data;
    }
}