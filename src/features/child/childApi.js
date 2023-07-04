import { CreateChildDto } from "ottery-dto";
import { formatForApi } from "../../functions/images";
import { clideInst } from "../../app/clideInst";

export const newChild = clideInst
    .makePost("child", {
        data_validator: CreateChildDto,
        in_pipeline: async (form)=>{
            form.pfp = await formatForApi(form.pfp);
            form.dateOfBirth = new Date(form.dateOfBirth).getTime();
            return {
                data: form,
            }
        },
    });

export const getChildren = clideInst
    .makeGet("child", {
        in_pipeline: (children) => {
            return {
                params: {children},
            }
        },
    });