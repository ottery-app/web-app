import { IdDto, socialLinkState, UpdateLinkDto, UserSocialStatusDto } from "ottery-dto";
import { axiosInst } from "../../app/axiosInst";
import { classifyWithDto } from "ottery-dto";
import { ERR_USER } from "../../app/axiosInst";

export async function friendStatus(id) {
    try {
        const res = await axiosInst.get(`api/social/status`, {
            params: {
                userIds: [id],
            }
        })

        res.data = res.data[0];
        return res;
    } catch (e) {
        throw e.response.data;
    }
}

export async function updateStatus(id, to) {
    const target = {
        target: id,
        state: to,
    }

    try {
        classifyWithDto(
            UpdateLinkDto,
            target,
            {throw: true}
        )
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.patch(`api/social/update`, target);
    } catch (e) {
        throw e.response.data;
    }
}

export async function getFriends() {
    try {
        const res = await axiosInst.get(`api/social/status`, {
            params:{
                types: [socialLinkState.ACCEPTED],
            }
        });

        res.data = res.data.map((socialStatus)=>{
            return socialStatus.user;
        });

        return res;
    } catch (e) {
        throw e.response.data;
    }
}