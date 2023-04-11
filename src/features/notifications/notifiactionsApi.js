import { axiosInst } from "../../app/axiosInst";

export async function getNotifications(id) {
    try {
        return await axiosInst.get(`api/notifications/${id}`);
    } catch (e) {
        throw e.response.data;
    }
}