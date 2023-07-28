import { useQuery, useQueryClient } from "react-query";

export function makeUseQuery({
    queryKey, 
    queryFn,
}) {
    if (!Array.isArray(queryKey)) {
        //makes the code simpler here
        throw new Error("Must be an array")
    }

    return function useUseQuery(options) {
        const queryClient = useQueryClient();

        const queryKeyInternal = queryKey;
        // const queryKeyInternal = (options.inputs) 
        //     ? [...queryKey, ...options.inputs] 
        //     : queryKey;

        const queryFnInternal = async ()=>queryFn(...options.inputs);

        const queryInvalidator = ()=>queryClient.invalidateQueries(queryKeyInternal);
        
        return [
            useQuery({
                queryKey: queryKeyInternal,
                queryFn: queryFnInternal,
                ...options,
            }),
            queryInvalidator,
        ]
    }
}