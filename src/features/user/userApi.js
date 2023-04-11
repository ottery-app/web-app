import { axiosInst } from "../../app/axiosInst";
import {noId} from "ottery-dto";

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

export async function getInfo(userIds) {
    try {
        if (!Array.isArray(userIds)) {
            userIds = [userIds];
        }

        return await axiosInst.get("api/user/info", {
            params: {
                users: userIds,
            }
        });
    } catch (e) {
        throw e.response.data;
    }
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