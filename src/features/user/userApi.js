import { axiosInst } from "../../app/axiosInst";
import {noId} from "ottery-dto";
import { clideInst } from "../../app/clideInst";

export async function getChildren(userId) {
    try {
        return await axiosInst.get("api/user/" + userId + "/children");
    } catch (e) {
        throw e.response.data;
    }
}

export async function getEvents(userId) {
    try {
        return await axiosInst.get(`api/user/${userId}/events`, {params:{
            self: true,
            children: true,
        }});
    } catch (e) {
        throw e.response.data;
    }
}

const clide_getInfo = clideInst.makeGet("user/info");
export async function getInfo(userIds) {
    if (!Array.isArray(userIds)) {
        userIds = [userIds];
    }

    return await clide_getInfo({
        params: {
            users: userIds,
        }
    });
}

export async function getAvalableChildren(userId) {
    try {
        return await axiosInst.get(`api/user/${userId}/children`, {
            params: {
                at: noId,
            }
        });
    } catch (e) {
        throw e.response.data;
    }
}

export async function getDroppedOffChildren(userId) {
    try {
        return await axiosInst.get(`api/user/${userId}/children`, {
            params: {
                notat: noId,
            }
        });
    } catch (e) {
        throw e.response.data;
    }
}