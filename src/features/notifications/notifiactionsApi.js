import { clideInst } from "../../app/clideInst";

export const getNotifications = clideInst
    .makeGet("notifications/:id", {
        in_pipeline: (id)=>{
            return {
                params: {
                    id,
                }
            }
        }
    });