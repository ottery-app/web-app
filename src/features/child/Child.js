import UnorderedList from "../../ottery-ui/lists/UnorderedList";
import {MultiFieldHeader} from "../../ottery-ui/headers/MultiFieldHeader";
import {MarginlessMain, Main} from "../../components/Main";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChildren } from "./childApi";
import { Ping } from "../../ottery-ping/Ping";
import { getEvents } from "../event/eventApi";
import ImageButton from "../../ottery-ui/buttons/ImageButton";
import { getInfo } from "../user/userApi";
import paths from "../../router/paths";
import { useNavigator } from "../../hooks/useNavigator";

const Tabs = {
    events:"events",
    guardians: "guardians",
}

export function Child() {
    const {childId} = useParams();
    const [child, setChild] = useState();
    const [tab, setTab] = useState(Tabs.events);
    const [data, setData] = useState();
    const [action, setAction] = useState(()=>{});
    const navigator = useNavigator();

    useEffect(()=>{
        getChildren([childId])
            .then((res)=>{
                setChild(res.data[0]);
            })
            .catch((err)=>{
                Ping.error(err.message);
            })
    }, []);

    useEffect(()=>{
        if (child) {
            switch(tab) {
                case Tabs.events:
                    getEvents(child.events)
                        .then((res)=>{
                            setData(res.data.map((event)=>{
                                return <ImageButton 
                                            key={event._id}
                                            content={event.summary}
                                            onClick={()=>{
                                                navigator(paths.event.event, {eventId:event._id});
                                            }}
                                        />
                            }))
                        })
                        .catch((err)=>{
                            Ping.error(err.message);
                        })
                  break;
                case Tabs.guardians:
                    const guardians = child.perms.reduce((res, perm)=>{
                        if (perm.owner.ref === "User") { //not sure i need this one
                            res.push(perm.owner.id);
                        }

                        return res;
                    }, []);

                    getInfo(guardians)
                        .then((res)=>{
                            setData(res.data.map((guardian)=>{
                                return <ImageButton 
                                            key={guardian._id}
                                            content={guardian.firstName + " " + guardian.lastName}
                                            right={"pfp" && guardian.pfp.src}
                                            onClick={()=>{
                                                navigator(paths.user.profile, {userId:guardian._id});
                                            }}
                                        />
                            }))
                        })
                        .catch((err)=>{
                            Ping.error(err.message);
                        })
                  break;
                default:
                    setData(undefined);
            }
        }
    }, [tab, child])

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
                    onClick={action}
                >
                    {data}
                </UnorderedList>
            </Main>
        </MarginlessMain>
    );
}