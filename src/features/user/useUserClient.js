import {
  acceptGuardianship,
  getAvalableChildren,
  getChildren,
  getDroppedOffChildren,
  getEvents,
  getInfo,
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

  const useAcceptGuardianship = makeUseMutation({
    mutationFn: acceptGuardianship,
  })

  const useUpdateProfilePhoto = makeUseMutation({
    mutationFn: updateProfilePhoto,
  })

  return {
    useUpdateProfilePhoto,
    useAcceptGuardianship,
    useGetUserInfo,
    useGetUserChildren,
    useGetAvalableChildren,
    useGetDroppedOffChildren,
    useGetUserEvents,
  };
}
