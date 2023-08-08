import UnorderedList from "../../ottery-ui/lists/UnorderedList";
import {MultiFieldHeader} from "../../ottery-ui/headers/MultiFieldHeader";
import {MarginlessMain, Main} from "../../components/Main";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ImageButton from "../../ottery-ui/buttons/ImageButton";
import paths from "../../router/paths";
import { useNavigator } from "../../hooks/useNavigator";
import { useChildClient } from "./useChildClient";
import { useEventClient } from "../event/useEventClient";
import { useUserClient } from "../user/useUserClient";
import { AwaitLoad } from "../../guards/AwaitLoad";

const Tabs = {
    events:"events",
    guardians: "guardians",
}

export function Child() {
    const navigator = useNavigator();
    const {useGetChildren} = useChildClient();
    const {useGetEvents} = useEventClient();
    const {useGetUserInfo} = useUserClient();
    const {childId} = useParams();
    const children = useGetChildren({inputs:[childId]});
    console.log(children);
    const child = children?.data?.data[0];
    const eventsQuery = useGetEvents({
        inputs: [child?.events],
        enabled: !!child,
    });
    const events = eventsQuery?.data?.data;
    let guardians = child?.perms.map(item=>item.owner.id);
    const userQuery = useGetUserInfo({
        inputs: [guardians],
        enabled: !!guardians,
    });
    guardians = userQuery?.data?.data;
    const [tab, setTab] = useState(Tabs.events);

    let display;
    let status;
    if (tab === Tabs.guardians) {
        status = userQuery.status;
        display = guardians?.map((guardian)=>{
            return (
                <ImageButton 
                    key={guardian._id}
                    content={guardian.firstName + " " + guardian.lastName}
                    right={"pfp" && guardian.pfp.src}
                    onClick={()=>{
                        navigator(paths.user.profile, {userId:guardian._id});
                    }}
                />
            );
        })
    } else if (tab === Tabs.events) {
        status = eventsQuery.status;
        display = events?.map((event)=>{
            return (
                <ImageButton 
                    key={event._id}
                    content={event.summary}
                    onClick={()=>{
                        navigator(paths.event.event, {eventId:event._id});
                    }}
                />
            );
        })
    }
    
    return(
        <MarginlessMain>
            <MultiFieldHeader
                title={`${child?.firstName} ${child?.lastName}`}
                src={child?.pfp.src || "pfp"}
                tab={tab}
                onTab={(tab)=>{
                    setTab(tab);
                }}
                tabs={Object.values(Tabs)}
            />

            <Main>
                <UnorderedList 
                    title={tab}
                    onClick={undefined}
                >
                    {display?.map((disp)=>{
                        return (
                            <AwaitLoad status={status}>
                                {disp}
                            </AwaitLoad>
                        );
                    })}
                </UnorderedList>
            </Main>
        </MarginlessMain>
    );
}