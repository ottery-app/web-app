import { axiosInst } from "../../app/axiosInst";

export async function getAll() {
    try {
        return await axiosInst.get("api/form/fields");
    } catch (e) {
        throw e.response.data;
    }
}