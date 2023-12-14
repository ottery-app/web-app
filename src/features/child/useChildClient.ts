import { useQueryClient } from "react-query";
import { getChildren, newChild, addGuardians, updateChildData, missingChildData } from "./childApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { query_paths } from "../../provider/queryClient";

export function useChildClient() {
    const queryClient = useQueryClient();

    const useGetChildren = makeUseQuery({
        queryKey: [query_paths.child.root],
        queryFn: async(children)=>{
            return await getChildren(children)
        },
    });

    const useGetChild = makeUseQuery({
        queryKey: [query_paths.child.root],
        queryFn: async(child)=>{
            const res = await getChildren([child]);
            res.data = res.data[0];
            return res;
        },
    });

    const useNewChild = makeUseMutation({
        mutationFn: newChild,
        onSuccessAlways: (data)=>{
            queryClient.invalidateQueries([query_paths.user.root, query_paths.child.root]);
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
        queryKey: [query_paths.child.root, "data"],
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