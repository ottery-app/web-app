import {
  getChildren,
  getEvents,
  getInfo,
  getUserData,
  missingUserData,
  udpateFirstName,
  udpateLastName,
  updateProfilePhoto,
  updateUserData,
} from "./userApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { query_paths } from "../../provider/queryClient";

export function useUserClient() {
  const useGetUserInfo = makeUseQuery({
    queryKey: [query_paths.user.root],
    queryFn: getInfo,
  });

  const useGetUserChildren = makeUseQuery({
    queryKey: [query_paths.user.root, query_paths.child.root],
    queryFn: getChildren,
  });

  const useGetUserEvents = makeUseQuery({
    queryKey: [query_paths.user.root, "events"],
    queryFn: getEvents,
  });

  const useUpdateProfilePhoto = makeUseMutation({
    mutationFn: updateProfilePhoto,
  })

  const useUpdateUserData = makeUseMutation({
    mutationFn: updateUserData,
  })

  const useMissingUserData = makeUseQuery({
    queryKey: [query_paths.user.root, "data"],
    queryFn: missingUserData,
  })

  const useChildrenAt = makeUseQuery({
    queryKey: [query_paths.user.root, query_paths.child.root, "at"],
    queryFn: async (userId, at)=>{
      const childrenRes = await getChildren(userId);

      if (childrenRes?.data) {
        childrenRes.data = childrenRes.data.filter((child)=>child.lastStampedLocation.at === at)
      }

      return childrenRes;
    },
  });

  const useChildrenNotAt = makeUseQuery({
    queryKey: [query_paths.user.root, query_paths.child.root, "notAt"],
    queryFn: async (userId, at)=>{
      const childrenRes = await getChildren(userId);

      if (childrenRes?.data) {
        childrenRes.data = childrenRes.data.filter((child)=>child.lastStampedLocation.at !== at)
      }

      return childrenRes;
    },
  });

  const useGetUserData = makeUseQuery({
    queryKey: [query_paths.user.root, "data"],
    queryFn: getUserData,
  })

  const useUpdateFirstName = makeUseMutation({
    mutationFn: udpateFirstName,
  })

  const useUpdateLastName = makeUseMutation({
    mutationFn: udpateLastName,
  })

  return {
    useUpdateUserData,
    useMissingUserData,
    useUpdateProfilePhoto,
    useGetUserInfo,
    useGetUserChildren,
    useChildrenAt,
    useChildrenNotAt,
    useGetUserEvents,
    useGetUserData,
    //I dont like this but im rushing to get this finsished for a customer
    useUpdateFirstName,
    useUpdateLastName,
  };
}
