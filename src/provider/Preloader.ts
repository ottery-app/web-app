import axios from "axios";
import { useAuthClient } from "../features/auth/useAuthClient";
import { useChatClient } from "../features/chat/useChatClient";
import { useEventClient } from "../features/event/useEventClient";
import { useUserClient } from "../features/user/useUserClient";
import { clideInst } from "./clideInst";

export function Preloader({children}) {
    const eventId = useAuthClient().useEventId();
    const userId = useAuthClient().useUserId();

    const userclient = useUserClient();
    const eventclient = useEventClient();
    const messageclient = useChatClient();

    userclient.useGetUserInfo({
        inputs:[userId],
        enabled: !!userId,
    });

    userclient.useGetUserChildren({
        inputs:[userId],
        enabled: !!userId,
        onSuccess: (res)=>{
            res.data.map(({pfp})=>{
                new Image().src = pfp.src;
            })
        }
    })

    userclient.useGetUserEvents({
        inputs:[userId],
        enabled: !!userId,
    })

    eventclient.useGetEvent({
        inputs:[eventId],
        enabled: !!eventId,
    })

    eventclient.useGetEvent({
        inputs:[eventId],
        enabled: !!eventId,
    })

    messageclient.useGetChatsFor({
        inputs:[userId],
        enabled: !!userId,
    })

    return children;
}