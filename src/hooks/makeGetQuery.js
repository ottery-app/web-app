import { useQuery, useQueryClient } from "react-query";
import { useQueryStatus } from "../guards/QueryStatusProvider";

export function makeUseQuery({
    queryKey, 
    queryFn,
}) {
    if (!Array.isArray(queryKey)) {
        //makes the code simpler here
        throw new Error("Must be an array")
    }

    return function useUseQuery(options={}) {
        const {updateStatus} = useQueryStatus();
        const queryClient = useQueryClient();

        const queryKeyInternal = (options.inputs) 
            ? [...queryKey, ...options.inputs] 
            : queryKey;

        const queryFnInternal = async ()=>queryFn(...(options?.inputs) ? options.inputs: []);

        const queryInvalidator = ()=>queryClient.invalidateQueries(queryKeyInternal);
        
        const queryRes = useQuery({
            queryKey: queryKeyInternal,
            queryFn: queryFnInternal,
            ...options,
        });

        const res = {
            data: queryRes?.data?.data,
            invalidator: queryInvalidator,
            ...queryRes
        }

        updateStatus(queryKeyInternal, res.status);

        return res;
    }
}

export function takeArray(query) {
    return async (...inputArr) => {
        let data = [];

        for (let i = 0; i < inputArr.length; i++) {
            let input = inputArr[i];

            if (!Array.isArray(input)) {
                input = [input];
            }

            data.push(await query(...input));
        }

        return data;
    }
}