import {
  getEvents,
  newEvent,
  signUpAttendeesByIds,
  signUpVolenteersByIds,
  getInfo,
  getAttendeeSignup,
  getVolenteerSignup,
  getOwner,
} from "./eventApi";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";

export enum EventUserRole {
  LEAD_MANAGER = "LEAD_MANAGER",
  MANAGER = "MANAGER",
  VOLUNTEER = "VOLUNTEER",
}

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

  const useSignUpVolenteersByIds = makeUseMutation({
    mutationFn: signUpVolenteersByIds,
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

  function getEventUserRole(eventId: string, userId: string): EventUserRole {
    const eventInfo = getEventResult(eventId);

    if (eventInfo) {
      if (eventInfo.leadManager === userId) {
        return EventUserRole.LEAD_MANAGER;
      } else if ((eventInfo.managers as string[]).includes(userId)) {
        return EventUserRole.MANAGER;
      } else if ((eventInfo.volunteers as string[]).includes(userId)) {
        return EventUserRole.VOLUNTEER;
      }
    }

    return null;
  }

  return {
    useGetEvent,
    useGetEvents,
    useNewEvent,
    useGetEventInfo,
    useSignUpAttendeesByIds,
    useSignUpVolenteersByIds,
    useGetAttendeeSignup,
    useGetVolenteerSignup,
    useGetEventOwner,
    getLeadManager,
    getEventUserRole,
  };
}
