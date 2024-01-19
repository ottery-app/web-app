import { id } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const getAll = clideInst.makeGet("form/fields/default");

export const getBaseFields = clideInst.makeGet("form/fields/base/required", {
    in_pipeline: (flag)=>{
        return {
            params: {
                flag,
            }
        }
    }
})

export const getFieldsByIds = clideInst.makeGet("form/fields", {
    in_pipeline: (ids: id[]) => {
        return {
            params: {
                ids
            }
        }
    }
})