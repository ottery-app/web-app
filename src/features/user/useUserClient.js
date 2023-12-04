import {
  acceptGuardianship,
  getAvalableChildren,
  getChildren,
  getDroppedOffChildren,
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

  const useGetAvalableChildren = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, QUERY_CHILD_TAG, "avalable"],
    queryFn: getAvalableChildren,
  });

  const useGetDroppedOffChildren = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, QUERY_CHILD_TAG, "droppedOff"],
    queryFn: getDroppedOffChildren,
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

  return {
    useUpdateUserData,
    useMissingUserData,
    useUpdateProfilePhoto,
    useGetUserInfo,
    useGetUserChildren,
    useGetAvalableChildren,
    useGetDroppedOffChildren,
    useGetUserEvents,
  };
}
