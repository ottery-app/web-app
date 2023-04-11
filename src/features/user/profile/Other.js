import {MultiFieldHeader} from "../../../ottery-ui/headers/MultiFieldHeader";
import OrderedList from "../../../ottery-ui/lists/OrderedList";
import { useState } from "react";
import { MarginlessMain } from "../../../components/Main";
import { ProfileGuard } from "../../../guards/ProfileGuard";
import Button, { BUTTON_TYPES } from "../../../ottery-ui/buttons/Button";
import { colors } from "../../../ottery-ui/styles/colors";
import { updateStatus } from "../../social/socialApi";
import { useRerenderer } from "../../../hooks/useRerenderer";
import { socialLinkState } from "ottery-dto";
import paths from "../../../router/paths";
import { useNavigator } from "../../../hooks/useNavigator";

const Tabs = {
    posts: "posts",
    shared: "shared kids",
}

export default function UserOther({userInfo, userId, selfId}) {
    const [tab, setTab] = useState(Object.values(Tabs)[0]);
    const [data, setData] = useState({});
    const rerender = useRerenderer();
    const navigator = useNavigator();

    async function updateFriendStatus(to) {
        await updateStatus(userId, to);
        rerender();
    }

    return(
        <MarginlessMain>
            <MultiFieldHeader
                src={userInfo?.pfp?.src || "pfp"}
                alt={"profile photo"}
                tab={tab}
                onTab={(tab)=>{
                    setTab(tab);
                    setData({
                        ...data
                    });
                }}
                tabs={Object.values(Tabs)}
                title={[
                    `${userInfo?.firstName} ${userInfo?.lastName}`,
                    <ProfileGuard
                        isFollowing={userId}
                        hide
                    >
                        <Button
                            type={BUTTON_TYPES.filled}
                            primaryColor={colors.primaryLight}
                            secondaryColor={colors.textDark}
                            onClick={()=>navigator(paths.social.chat, {userId:userId})}
                        >message</Button>
                    </ProfileGuard>,
                    <ProfileGuard
                        isFollowing={userId}
                        hide
                    >
                        <Button
                            type={BUTTON_TYPES.filled}
                            primaryColor={colors.primaryLight}
                            secondaryColor={colors.textDark}
                            onClick={()=>updateFriendStatus(socialLinkState.NONE)}
                        >UnFriend</Button>
                    </ProfileGuard>,
                    <ProfileGuard
                        isNotFollowing={userId}
                        hide
                    >
                        <Button
                            type={BUTTON_TYPES.filled}
                            primaryColor={colors.primaryLight}
                            secondaryColor={colors.textDark}
                            onClick={()=>updateFriendStatus(socialLinkState.REQUESTED)}
                        >Friend</Button>
                    </ProfileGuard>,
                    <ProfileGuard
                        isFollowReqeusted={userId}
                        isActivator={selfId}
                        hide
                    >
                        <Button
                            type={BUTTON_TYPES.filled}
                            primaryColor={colors.primaryLight}
                            secondaryColor={colors.textDark}
                            onClick={()=>updateFriendStatus(socialLinkState.NONE)}
                        >Requested</Button>
                    </ProfileGuard>,
                    <ProfileGuard
                        isFollowReqeusted={userId}
                        isNotActivator={selfId}
                        hide
                    >
                        <Button
                            type={BUTTON_TYPES.filled}
                            primaryColor={colors.primaryLight}
                            secondaryColor={colors.textDark}
                            onClick={()=>updateFriendStatus(socialLinkState.ACCEPTED)}
                        >Accept</Button>
                    </ProfileGuard>,
                    <ProfileGuard
                        isFollowReqeusted={userId}
                        isNotActivator={selfId}
                        hide
                    >
                        <Button
                            type={BUTTON_TYPES.filled}
                            primaryColor={colors.primaryLight}
                            secondaryColor={colors.textDark}
                            onClick={()=>updateFriendStatus(socialLinkState.NONE)}
                        >Decline</Button>
                    </ProfileGuard>,
                ]}
            />
            <OrderedList 
                title={tab}
                //onClick={addAction}
                sort={(a,b)=>a.key > b.key}
            >
                {data[tab]}
            </OrderedList>
        </MarginlessMain>
    );
}