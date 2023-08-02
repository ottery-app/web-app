import { useQuery, useQueryClient } from "react-query";
import { getAvalableChildren, getChildren, getInfo } from "./userApi";
import { makeUseQuery } from "../../hooks/makeGetQuery";

export const CLIENT_USER_TAG = 'user';

export function useUserClient() {

    const useGetUserInfo = makeUseQuery({
        queryKey: [CLIENT_USER_TAG],
        queryFn: async (userIds)=>getInfo(userIds),
    });

    const useGetUserChildren = makeUseQuery({
        queryKey: [CLIENT_USER_TAG, "children"],
        queryFn: getChildren,
    })

    const useGetAvalableChildren = makeUseQuery({
        queryKey:[CLIENT_USER_TAG, "children", "avalable"],
        queryFn: getAvalableChildren,
    })

    return {
        useGetUserInfo,
        useGetUserChildren,
        useGetAvalableChildren,
    }
}