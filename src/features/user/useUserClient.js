import {
  acceptGuardianship,
  getAvalableChildren,
  getChildren,
  getDroppedOffChildren,
  getEvents,
  getInfo,
  missingUserData,
  updateProfilePhoto,
} from "./userApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";

export const CLIENT_USER_TAG = "user";

export function useUserClient() {
  const useGetUserInfo = makeUseQuery({
    queryKey: [CLIENT_USER_TAG],
    queryFn: getInfo,
  });

  const useGetUserChildren = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "children"],
    queryFn: getChildren,
  });

  const useGetAvalableChildren = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "children", "avalable"],
    queryFn: getAvalableChildren,
  });

  const useGetDroppedOffChildren = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "children", "droppedOff"],
    queryFn: getDroppedOffChildren,
  });

  const useGetUserEvents = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "events"],
    queryFn: getEvents,
  });

  const useUpdateProfilePhoto = makeUseMutation({
    mutationFn: updateProfilePhoto,
  })

  const useMissingUserData = makeUseQuery({
    queryKey: [CLIENT_USER_TAG, "data"],
    queryFn: missingUserData,
  })

  return {
    useMissingUserData,
    useUpdateProfilePhoto,
    useGetUserInfo,
    useGetUserChildren,
    useGetAvalableChildren,
    useGetDroppedOffChildren,
    useGetUserEvents,
  };
}
