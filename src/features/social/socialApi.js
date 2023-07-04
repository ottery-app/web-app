import { socialLinkState, UpdateLinkDto } from "ottery-dto";
import { axiosInst } from "../../app/axiosInst";
import { classifyWithDto } from "ottery-dto";
import { ERR_USER } from "../../app/axiosInst";
import { clideInst } from "../../app/clideInst";

export const friendStatus = clideInst
    .makeGet("social/status", {
        in_pipeline: (id)=>{
            return {
                params: {
                    userIds: [id],
                }
            }
        },
        out_pipeline: (res)=>{
            res.data = res.data[0];
            return res;
        }
    });

export const updateStatus = clideInst
    .makePatch("social/update", {
        data_validator: UpdateLinkDto,
        in_pipeline: (id, to) => {
            return {
                data: {
                    target: id,
                    state: to,
                }
            }
        },
    });

export const getFriends = clideInst
    .makeGet("social/status", {
        params: {
            types: [socialLinkState.ACCEPTED],
        },
        out_pipeline: (res)=>{
            res.data = res.data.map(socialStatus=>socialStatus.user);
            return res;
        }
    });