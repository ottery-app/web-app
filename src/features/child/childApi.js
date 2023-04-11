import { classifyWithDto, CreateChildDto, DropOffRequestDto } from "ottery-dto";
import { axiosInst, ERR_USER } from "../../app/axiosInst";
import { formatForApi } from "../../functions/images";

export async function newChild(form) {
    try {
        form.pfp = await formatForApi(form.pfp);
        form.dateOfBirth = new Date(form.dateOfBirth).getTime();
        classifyWithDto(
            CreateChildDto,
            form,
            {throw: true}
        )
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.post("api/child", form);
    } catch (e) {
        throw e.response.data;
    }
}

export async function getChildren(children) {
    try {
        return await axiosInst.get(`api/child`, {
            params: {
                children: children,
            }
        })
    } catch (e) {
        throw e.response.data;
    }
}