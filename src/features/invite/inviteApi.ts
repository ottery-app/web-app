import { AcceptGuardianshipDto, EmailDto, isId } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const inviteGuardianForChild = clideInst.makePost("invite/guardian/for/:childId", {
    data_validator: EmailDto,
    in_pipeline: async ({ email, childId }) => {
      return {
        data: { email },
        params: { childId },
      };
    },
  }
);

export const acceptGuardianship = clideInst.makePost("invite/guardian/accept/:userId", {
    param_validators: {
      userId: isId,
    },
    data_validator: AcceptGuardianshipDto,
    in_pipeline: ({userId, childId, token, key}) => {
      return {
        params: {
          userId,
        },
        data: {
          token,
          childId: childId,
          key: key,
        }
      }
    }
})