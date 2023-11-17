import { CreateChildDto, IdArrayDto, id, EmailDto } from "@ottery/ottery-dto";
import { formatForApi } from "../../functions/images";
import { clideInst } from "../../provider/clideInst";

export const newChild = clideInst.makePost("child", {
  data_validator: CreateChildDto,
  in_pipeline: async (form) => {
    form.pfp = await formatForApi(form.pfp);
    form.dateOfBirth = new Date(form.dateOfBirth).getTime();
    return {
      data: form,
    };
  },
});

export interface propsAddGuardians {
  childId: id;
  userIds: id[];
}

export const addGuardians = clideInst.makePost("child/:childId/addGuardians", {
  data_validator: IdArrayDto,
  in_pipeline: async ({ childId, userIds }) => {
    return {
      data: { ids: userIds },
      params: { childId },
    };
  },
});

export const inviteGuardian = clideInst.makePost(
  "child/:childId/invite-guardian",
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

export const getChildren = clideInst.makeGet("child", {
  in_pipeline: (children) => {
    return {
      params: { children },
    };
  },
});
