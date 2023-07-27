import { useQuery, useQueryClient } from "react-query";
import { getChildren, newChild } from "./childApi";
import { makeUseMutation } from "../../hooks/makeUseMutation";

const QUERY_CHILD_TAG = "child";

export function useChildClient() {
    const queryClient = useQueryClient();

    const invalidateGetChildren = ()=>queryClient.invalidateQueries(QUERY_CHILD_TAG);

    const useGetChildren = (children, options)=>useQuery({
        queryKey: QUERY_CHILD_TAG,
        queryFn: async()=>getChildren(children),
        ...options,
    });

    const useNewChild = makeUseMutation({
        mutationFn: newChild,
        onSuccessAlways: (data)=>{
            invalidateGetChildren();
            return data;
        }
    })

    return {
        useNewChild,
        useGetChildren,
        invalidateGetChildren,
    }
}