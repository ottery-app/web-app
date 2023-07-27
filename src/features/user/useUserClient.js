import { useQuery, useQueryClient } from "react-query";
import { getInfo } from "./userApi";

export const CLIENT_USER_TAG = 'user';

export function useUserClient() {
    const queryClient = useQueryClient();

    const useGetUserInfo = (userIds, options)=>useQuery(
        CLIENT_USER_TAG,
        async ()=>getInfo(userIds),
        options,
    );

    return {
        useGetUserInfo,
    }
}