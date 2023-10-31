import { friendStatus, getFriends, updateStatus } from "./socialApi";
import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";

const QUERY_SOCIAL_KEY = "social";

export function useSocialClient() {
    const useFriendStatus = makeUseQuery({
        queryKey: [QUERY_SOCIAL_KEY, "status"],
        queryFn: friendStatus,
    })

    const useUpdateStatus = makeUseMutation({
        mutationFn: updateStatus,
    })

    const useGetFriends = makeUseQuery({
        queryKey: [QUERY_SOCIAL_KEY, "friends"],
        queryFn: getFriends,
    });

    return {
        useFriendStatus,
        useUpdateStatus,
        useGetFriends,
    }
}