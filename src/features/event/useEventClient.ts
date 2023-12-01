import {
  getEvents,
  newEvent,
  signUpAttendeesByIds,
  getInfo,
  getAttendeeSignup,
  getVolenteerSignup,
  getOwner,
  signupUser,
} from "./eventApi";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";

export const QUERY_EVENT_TAG = "event";

export function useEventClient() {
  const useGetEventInfo = makeUseQuery({
    queryKey: [QUERY_EVENT_TAG, "eventInfo"],
    queryFn: getInfo,
  });

  const useGetEvent = makeUseQuery({
    queryKey: [QUERY_EVENT_TAG, "event"],
    queryFn: async (event) => {
      let res = await getEvents([event]);
      res.data = res.data[0];
      return res;
    },
  });

  const useGetEvents = makeUseQuery({
    queryKey: [QUERY_EVENT_TAG],
    queryFn: getEvents,
  });

  const useGetEventOwner = makeUseQuery({
    queryKey: [QUERY_EVENT_TAG, "owner"],
    queryFn: getOwner,
  });

  const useGetAttendeeSignup = makeUseQuery({
    queryKey: [QUERY_EVENT_TAG, "attendee", "signup"],
    queryFn: getAttendeeSignup,
  });

  const useGetVolenteerSignup = makeUseQuery({
    queryKey: [QUERY_EVENT_TAG, "volenteer", "signup"],
    queryFn: getVolenteerSignup,
  });

  const useNewEvent = makeUseMutation({
    mutationFn: newEvent,
  });

  const useSignUpAttendeesByIds = makeUseMutation({
    mutationFn: signUpAttendeesByIds,
  });

  const useSignupUser = makeUseMutation({
    mutationFn: signupUser,
  });

  function getEventResult(eventId: string) {
    const eventInfoQueryResult = useGetEventInfo({ inputs: [eventId] });
    if (eventInfoQueryResult.isSuccess) {
      return eventInfoQueryResult?.data?.data;
    }
    return null;
  }

  function getLeadManager(eventId: string) {
    const eventInfo = getEventResult(eventId);

    if (eventInfo) {
      return eventInfo.leadManager;
    }

    return null;
  }

  return {
    useGetEvent,
    useGetEvents,
    useNewEvent,
    useGetEventInfo,
    useSignUpAttendeesByIds,
    useSignupUser,
    useGetAttendeeSignup,
    useGetVolenteerSignup,
    useGetEventOwner,
    getLeadManager,
  };
}
