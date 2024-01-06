import { Text } from "react-native-paper";
import { useAuthClient } from "../../auth/useAuthClient";
import { useEventClient } from "../useEventClient";
import { useMemo } from "react";

export function EventHome({route}) {
    const userId = useAuthClient().useUserId();

    const eventClient = useEventClient();
    const eventId = route.params.eventId;
    
    const eventRes = eventClient.useGetEvent({inputs:[eventId]});
    const event = eventRes?.data?.data;

    const isLeadManager = useMemo(()=>event?.leadManager === userId || false, [eventRes]);
    const isManager = useMemo(()=>event?.managers?.includes(userId) || false, [eventRes]);
    const isVolenteer = useMemo(()=>event?.volenteers?.includes(userId) || false, [eventRes]);
    const isAtendee = useMemo(()=>event?.attendees?.includes(userId) || false, [eventRes]);

    if ([isLeadManager, isManager, isVolenteer, isAtendee].every((value)=>value===false)) {
        return <Text>onboard page</Text>
    } else {
        return <Text>menu page</Text>
    }
}