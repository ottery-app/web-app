import { IdArrayDto, isId } from "@ottery/ottery-dto";
import { clideInst } from "../../../provider/clideInst";

export const dropOffChildren = clideInst.makePatch('roster/:eventId/dropOff', {
    data_validator: IdArrayDto,
    param_validator: isId,
    in_pipeline: ({eventId, childrenIds})=>{
        console.log(eventId, childrenIds);
        return {
            params: {eventId},
            data: {ids:childrenIds}
        }
    }
});