import { useEffect, useState } from "react";
import { friendStatus } from "../features/social/socialApi";
import { socialLinkState } from "@ottery/ottery-dto";
import { BUTTON_TYPES } from "../ottery-ui/buttons/button.enum";
import Button from "../ottery-ui/buttons/Button";
import { updateStatus } from "../features/social/socialApi";
import { useAuthClient } from "../features/auth/useAuthClient";

export function FriendRequest({userId, color}) {
    const {useUserId} = useAuthClient();
    const selfId = useUserId();
    const [status, setStatus] = useState();

    async function updateFriendStatus(to) {
        let {data} = await updateStatus(userId, to);
        setStatus({...status, state:data});
    }

    async function getStatus() {
        friendStatus(userId)
            .then((res)=>{
                setStatus(res.data);
            })
            .catch((e)=>{throw e});
    }

    useEffect(()=>{
        if (userId) {
            getStatus();
        }
    }, [userId]);

    // they are following
    if (status?.state.state === socialLinkState.ACCEPTED) {
        return (
            <Button
                type={BUTTON_TYPES.filled}
                color={color}
                onClick={()=>updateFriendStatus(socialLinkState.NONE)}
            >UnFriend</Button>
        );
    } else if (status?.state.state === socialLinkState.REQUESTED) {
        if (status.state.activator === selfId) {
            return (
                <Button
                    type={BUTTON_TYPES.filled}
                    color={color}
                    onClick={()=>updateFriendStatus(socialLinkState.NONE)}
                >Requested</Button>
            );
        } else {
            return (
                <>
                    <Button
                        type={BUTTON_TYPES.filled}
                        color={color}
                        onClick={()=>updateFriendStatus(socialLinkState.NONE)}
                    >Decline</Button>
                    <Button
                        type={BUTTON_TYPES.filled}
                        color={color}
                        onClick={()=>updateFriendStatus(socialLinkState.ACCEPTED)}
                    >Accept</Button>
                </>
            );
        }
    } else if (status?.state.state === socialLinkState.NONE) {
        return (
            <Button
                type={BUTTON_TYPES.filled}
                color={color}
                onClick={()=>updateFriendStatus(socialLinkState.REQUESTED)}
            >Friend</Button>
        );
    }
}