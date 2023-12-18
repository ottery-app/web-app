import {
  getEvents,
  newEvent,
  getInfo,
  getAttendeeSignup,
  getVolenteerSignup,
  getOwner,
  signupUser,
  signupAttendee,
} from "./eventApi";

import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";
import { query_paths } from "../../provider/queryClient";

export function useEventClient() {
  const useGetEventInfo = makeUseQuery({
      queryKey: [query_paths.event.root, "eventInfo"],
      queryFn: getInfo,
  });

  const useGetEvent = makeUseQuery({
      queryKey: [query_paths.event.root, "event"],
      queryFn: async (event)=>{
          let res = await getEvents([event]);
          res.data = res.data[0];
          return res;
      }
  });

  const useGetEvents = makeUseQuery({
      queryKey: [query_paths.event.root],
      queryFn: getEvents,
  });

  const useGetEventOwner = makeUseQuery({
      queryKey: [query_paths.event.root, "owner"],
      queryFn: getOwner,
  })

  const useGetAttendeeSignup = makeUseQuery({
      queryKey: [query_paths.event.root, "attendee", "signup"],
      queryFn: getAttendeeSignup,
  })

  const useGetVolenteerSignup = makeUseQuery({
      queryKey: [query_paths.event.root, "volenteer", "signup"],
      queryFn: getVolenteerSignup,
  })

  const useNewEvent = makeUseMutation({
    mutationFn: newEvent,
    onSuccessAlways: (data) => {
      queryClient.invalidateQueries([query_paths.event.root, "events"]);
      return data;
    },
  });

  const useSignupUser = makeUseMutation({
    mutationFn: signupUser,
  });

  const useSignupAttendee = makeUseMutation({
    mutationFn: signupAttendee,
  });

  return {
    useGetEvent,
    useGetEvents,
    useNewEvent,
    useGetEventInfo,
    useSignupAttendee,
    useSignupUser,
    useGetAttendeeSignup,
    useGetVolenteerSignup,
    useGetEventOwner,
  };
}
