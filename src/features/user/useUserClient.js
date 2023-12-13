import {
  getChildren,
  getEvents,
  getInfo,
  missingUserData,
  updateProfilePhoto,
  updateUserData,
} from "./userApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { QUERY_CHILD_TAG } from "../child/useChildClient";

export const CLIENT_USER_TAG = "user";

export function useUserClient() {
  const useGetUserInfo = makeUseQuery({
    queryKey: [CLIENT_USER_TAG],
    queryFn: getInfo,
  });

  const useGetUserChildren = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, QUERY_CHILD_TAG],
    queryFn: getChildren,
  });

  const useGetUserEvents = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "events"],
    queryFn: getEvents,
  });

  const useUpdateProfilePhoto = makeUseMutation({
    mutationFn: updateProfilePhoto,
  })

  const useUpdateUserData = makeUseMutation({
    mutationFn: updateUserData,
  })

  const useMissingUserData = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "data"],
    queryFn: missingUserData,
  })

  const useChildrenAt = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, QUERY_CHILD_TAG, "at"],
    queryFn: async (userId, at)=>{
      const childrenRes = await getChildren(userId);

      if (childrenRes?.data) {
        childrenRes.data = childrenRes.data.filter((child)=>child.lastStampedLocation.at === at)
      }

      return childrenRes;
    },
  });

  const useChildrenNotAt = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, QUERY_CHILD_TAG, "notAt"],
    queryFn: async (userId, at)=>{
      const childrenRes = await getChildren(userId);

      if (childrenRes?.data) {
        childrenRes.data = childrenRes.data.filter((child)=>child.lastStampedLocation.at !== at)
      }

      return childrenRes;
    },
  });

  return {
    useUpdateUserData,
    useMissingUserData,
    useUpdateProfilePhoto,
    useGetUserInfo,
    useGetUserChildren,
    useChildrenAt,
    useChildrenNotAt,
    useGetUserEvents,
  };
}
