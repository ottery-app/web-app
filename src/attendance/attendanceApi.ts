import { isId } from "@ottery/ottery-dto";
import { clideInst } from "../provider/clideInst";

export const getChildAtEvent = clideInst.makeGet("attendance/:childId/at/:eventId", {
    param_validators: {
        childId: isId,
        eventId: isId,
      },
    in_pipeline: async (childId, eventId) => {
        return {
            params: {
                childId,
                eventId,
            }
        }
    },
  });

