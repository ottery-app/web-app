import { friendStatus, getFriendLinks, getFriends, updateStatus } from "./socialApi";
import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";
import { query_paths } from "../../provider/queryClient";

export function useSocialClient() {
    const useFriendStatus = makeUseQuery({
        queryKey: [query_paths.social.root, "status"],
        queryFn: friendStatus,
    })

    const useUpdateStatus = makeUseMutation({
        mutationFn: updateStatus,
    })

    const useGetFriends = makeUseQuery({
        queryKey: [query_paths.social.root, "friends"],
        queryFn: async (userId)=>{
            const res = await getFriendLinks(userId);
            res.data = res.data.map((link)=>link.users.filter(id=>id!==userId)[0]);
            return res;
        },
    });

    return {
        useFriendStatus,
        useUpdateStatus,
        useGetFriends,
    }
}