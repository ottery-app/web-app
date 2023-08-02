import { useQuery, useQueryClient } from "react-query";
import { getChildren, newChild } from "./childApi";
import { makeUseMutation } from "../../hooks/makeUseMutation";
import { makeUseQuery } from "../../hooks/makeGetQuery";

const QUERY_CHILD_TAG = "child";

export function useChildClient() {
    const queryClient = useQueryClient();

    const useGetChildren = makeUseQuery({
        queryKey: [QUERY_CHILD_TAG],
        queryFn: async(children)=>{
            return getChildren(children)
        },
    });

    const useNewChild = makeUseMutation({
        mutationFn: newChild,
        onSuccessAlways: (data)=>{
            //invalidateGetChildren();
            return data;
        }
    })

    return {
        useNewChild,
        useGetChildren,
    }
}