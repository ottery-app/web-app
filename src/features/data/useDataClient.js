import { useQuery, useQueryClient } from "react-query";
import { addDataByOwner, getMissingData, getMissingDataByOwner } from "./dataApi";
import { makeUseQuery } from "../../hooks/makeGetQuery";
import { makeUseMutation } from "../../hooks/makeUseMutation";

export const DATA_CLIENT_TAG = "data";

const GET_MISSING_DATA_KEY = [DATA_CLIENT_TAG, "missing", "dataId"];
const GET_MISSING_DATA_OWNER_KEY = [DATA_CLIENT_TAG, "missing", "ownerId"];

export function useDataClient() {
    const queryClient = useQueryClient();
    
    const useGetMissingData = makeUseQuery({
        queryKey: GET_MISSING_DATA_KEY,
        queryFn: getMissingData,
    });

    const useGetMissingDataByOwner = makeUseQuery({
        queryKey: GET_MISSING_DATA_OWNER_KEY,
        queryFn: getMissingDataByOwner,
    });

    const addDataByOwner = makeUseMutation({
        mutationFn: addDataByOwner,
        onSuccessAlways: (data)=>{
            queryClient.invalidateQueries(
                GET_MISSING_DATA_OWNER_KEY,
                GET_MISSING_DATA_KEY,
            );
            return data;
        }
    })

    return {
        useGetMissingData,
        useGetMissingDataByOwner,
    }
}