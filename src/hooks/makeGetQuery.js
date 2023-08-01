import { useQuery, useQueryClient } from "react-query";

console.error("imported here");
//TODO rename this to makeUseQuery and use that to find where this is used wrong.

export function makeUseQuery({
    queryKey, 
    queryFn,
}) {
    if (!Array.isArray(queryKey)) {
        //makes the code simpler here
        throw new Error("Must be an array")
    }

    return function useUseQuery(options={}) {
        const queryClient = useQueryClient();

        const queryKeyInternal = queryKey;
        // const queryKeyInternal = (options.inputs) 
        //     ? [...queryKey, ...options.inputs] 
        //     : queryKey;

        const queryFnInternal = async ()=>queryFn(...(options?.inputs) ? options.inputs: []);

        const queryInvalidator = ()=>queryClient.invalidateQueries(queryKeyInternal);
        
        const queryRes = useQuery({
            queryKey: queryKeyInternal,
            queryFn: queryFnInternal,
            ...options,
        });

        return {
            data: queryRes?.data?.data,
            invalidator: queryInvalidator,
            ...queryRes
        }
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