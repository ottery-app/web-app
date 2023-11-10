import { socialLinkState, UpdateLinkDto } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const friendStatus = clideInst
    .makeGet("social/status/:userId", {
        in_pipeline: (id)=>{
            return {
                params: {
                    userId: id,
                }
            }
        },
        out_pipeline: (res)=>{
            res.data = res.data[0];
            return res;
        },
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

export const getFriendLinks = clideInst
    .makeGet("social/status/type/:type", {
        params: {
            type: socialLinkState.ACCEPTED,
        },
        out_pipeline: (res)=>{
            return res;
        }
    });