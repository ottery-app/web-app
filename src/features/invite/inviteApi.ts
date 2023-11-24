import { EmailDto } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const inviteGuardianForChild = clideInst.makePost(
  "invite/guardian/for/:childId",
  {
    data_validator: EmailDto,
    in_pipeline: async ({ email, childId }) => {
      return {
        data: { email },
        params: { childId },
      };
    },
  }
);
