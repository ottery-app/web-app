import { axiosInst } from "../../app/axiosInst";

export async function getChatsFor(userId) {
    return await axiosInst.get(`api/message/user/${userId}`)
}