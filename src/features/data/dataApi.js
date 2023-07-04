import { DataFieldDto } from "ottery-dto";
import { clideInst } from "../../app/clideInst";

//TODO this sucks why do i have an api called DATA??? like whata that even do? everything is data

export const getMissingData = clideInst
    .makeGet("data/id/:dataId/missing", {
        in_pipline: (dataId, desired) => {
            return {
                params: {
                    dataId: dataId,
                    desired: desired,
                }
            }
        }
    });

export const getMissingDataByOwner = clideInst
    .makeGet("data/owner/:ownerId/missing", {
        in_pipline: (ownerId, desired)=>{
            return {
                params: {
                    ownerId: ownerId,
                    desired: desired,
                }
            }
        }
    });

/**
 * this is used to set the data to a data id by many id fields
 * @param {id} ownerId 
 * @param {DataFieldDto[]} dataFields 
 * @returns 
 */
export const addDataByOwner = clideInst
    .makePatch("data/owner/:ownerId", {
        data_validator: DataFieldDto,
        in_pipline: (ownerId, dataFields)=>{
            return {
                params : {
                    ownerId: ownerId,
                },
                data: dataFields,
            }
        }
    });