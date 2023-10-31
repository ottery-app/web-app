import { useQueryClient } from "react-query";
import { getChildren, newChild, getGuardians } from "./childApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";

const QUERY_CHILD_TAG = "child";

export function useChildClient() {
    const queryClient = useQueryClient();

    const useGetChildren = makeUseQuery({
        queryKey: [QUERY_CHILD_TAG],
        queryFn: async(children)=>{
            return await getChildren(children)
        },
    });

    const useGetChild = makeUseQuery({
        queryKey: [QUERY_CHILD_TAG],
        queryFn: async(child)=>{
            console.log(child);
            const res = await getChildren([child]);
            res.data = res.data[0];
            return res;
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
        useGetChild,
        useGetChildren,
    }
}