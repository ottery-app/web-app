import { useQueryClient } from "react-query";
import { getChildren, newChild, addGuardians, updateChildData, missingChildData } from "./childApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { CLIENT_USER_TAG } from "../user/useUserClient";

export const QUERY_CHILD_TAG = "child";

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
            const res = await getChildren([child]);
            res.data = res.data[0];
            return res;
        },
    });

    const useNewChild = makeUseMutation({
        mutationFn: newChild,
        onSuccessAlways: (data)=>{
            queryClient.invalidateQueries([CLIENT_USER_TAG, QUERY_CHILD_TAG]);
            return data;
        }
    })

    const useAddGuardians = makeUseMutation({
        mutationFn: addGuardians,
    })

    const useUpdateChildData = makeUseMutation({
        mutationFn: updateChildData,
      })
    
    const useMissingChildData = makeUseQuery({
        queryKey: [QUERY_CHILD_TAG, "data"],
        queryFn: missingChildData,
    })

    return {
        useUpdateChildData,
        useMissingChildData,
        useNewChild,
        useGetChild,
        useGetChildren,
        useAddGuardians,
    }
}