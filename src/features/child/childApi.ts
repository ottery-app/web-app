import { CreateChildDto, IdArrayDto, id, validateAsArr, DataFieldDto, isId } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const newChild = clideInst.makePost("child", {
  data_validator: CreateChildDto,
  in_pipeline: async (form) => {
    console.log(form);
    //form.pfp = await formatForApi(form.pfp);
    //form.dateOfBirth = new Date(form.dateOfBirth).getTime();
    return {
      data: form,
    };
  },
});

export interface propsAddGuardians {
  childId: id;
  userIds: id[];
}

export const getChildren = clideInst.makeGet("child", {
  in_pipeline: (children) => {
    return {
      params: { children },
    };
  },
});

export const missingChildData = clideInst.makeGet(
  "child/:childId/data/missing",
  {
    param_validators: {
      childId: isId,
    },
    in_pipeline:(id, desiredFieldIds)=>{
      return {
        params: {
          childId: id,
          desired: desiredFieldIds,
        }
      }
    }
  }
)

export const updateChildData = clideInst.makePatch(
  "child/:childId/data",
  {
    param_validators: {
      childId: isId,
    },
    data_validator: validateAsArr(DataFieldDto),
    in_pipeline: ({childId, dataFields})=>{
      return {
        data: dataFields,
        params: {
          childId: childId,
        }
      }
    }
  }
)
