import { FormFieldDto } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const getAll = clideInst.makeGet("form/fields", {
  out_pipeline: (res) => {
    res.data = (res.data as (FormFieldDto & { _id: string })[]).map((field) => {
      return {
        id: field._id,
        label: field.label,
        type: field.type,
        note: field.note,
      };
    });

    return res;
  },
});
