import { DataFieldDto, classifyWithDto } from "ottery-dto";
import { axiosInst } from "../../app/axiosInst";

export async function getMissingData(dataId, desired) {
    try {
        return await axiosInst.get(`api/data/id/${dataId}/missing`, {
            params: {
                desired: desired,
            },
        });
    } catch (e) {
        throw e.response.data;
    }
}

export async function getMissingDataByOwner(ownerId, desired) {
    try {
        return await axiosInst.get(`api/data/owner/${ownerId}/missing`, {
            params: {
                desired: desired,
            },
        });
    } catch (e) {
        throw e.response.data;
    }
}

/**
 * this is used to set the data to a data id by many id fields
 * @param {id} ownerId 
 * @param {DataFieldDto[]} dataFields 
 * @returns 
 */
export async function addDataByOwner(ownerId, dataFields) {
    try {
        for (let i = 0 ; i < dataFields.length; i++ ) {
            classifyWithDto(
                DataFieldDto,
                dataFields[i],
                {throw: true}
            );
        }
    } catch (e) {
        throw e
    }

    try {
        return await axiosInst.patch(`api/data/owner/${ownerId}`, dataFields);
    } catch (e) {
        throw e.response.data;
    }
}