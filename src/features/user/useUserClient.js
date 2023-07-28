import { useQuery, useQueryClient } from "react-query";
import { getChildren, getInfo } from "./userApi";
import { makeUseQuery } from "../../hooks/makeGetQuery";

export const CLIENT_USER_TAG = 'user';

export function useUserClient() {
    const queryClient = useQueryClient();

    const useGetUserInfo = (userIds, options)=>useQuery(
        CLIENT_USER_TAG,
        async ()=>getInfo(userIds),
        options,
    );

    const useGetUserChildren = makeUseQuery({
        queryKey: [CLIENT_USER_TAG, "children"],
        queryFn: getChildren,
    })

    return {
        useGetUserInfo,
        useGetUserChildren,
    }
}