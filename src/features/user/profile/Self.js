import {MultiFieldHeader} from "../../../ottery-ui/headers/MultiFieldHeader";
import OrderedList from "../../../ottery-ui/lists/OrderedList";
import ImageButton from "../../../ottery-ui/buttons/ImageButton";
import paths from "../../../router/paths";
import { useEffect, useState } from "react";
import {getEvents, getChildren} from "../userApi";
import { useNavigator } from "../../../hooks/useNavigator";
import {Ping} from "../../../ottery-ping/Ping";
import { MarginlessMain } from "../../../components/Main";
import { getFriends } from "../../social/socialApi";

const Tabs = {
    events:"events",
    kids:"kids",
    friends:"friends",
    //cars:"cars",
}

export default function UserSelf({userInfo, userId}) {
    const navigator = useNavigator();
    const [tab, setTab] = useState(Tabs.events);
    const [data, setData] = useState({});

    async function loadAllButtons() {
        async function loadChildrenButtons() {
            const res = await getChildren(userId)
    
            return res.data.map((kiddo)=>
                <ImageButton 
                    key={kiddo?._id}
                    content={kiddo?.firstName}
                    right={"pfp" && kiddo?.pfp.src}
                    onClick={()=>{
                        navigator(paths.child.profile, {childId:kiddo?._id});
                    }}
                />
            )
        }
    
        async function loadEventButtons() {
            const res = await getEvents(userId);
    
            return res.data.map((event)=>
                <ImageButton 
                    key={event._id}
                    content={event.summary}
                    onClick={()=>{
                        navigator(paths.event.dash, {eventId:event._id});
                    }}
                />
            );
        }

        async function loadFriendButtons() {
            const res = await getFriends(userId);

            return res.data.map((user)=>{
                return <ImageButton 
                    key={user?._id}
                    content={`${user?.firstName} ${user?.lastName}`}
                    right={"pfp" && user?.pfp.src}
                    onClick={()=>{
                        navigator(paths.user.profile, {userId:user._id});
                    }}
                />
            })
        }

        const data = {};
        data[Tabs.kids] = await loadChildrenButtons();
        data[Tabs.events] = await loadEventButtons();
        data[Tabs.friends] = await loadFriendButtons();
        return data;
    }

    useEffect(()=>{
        loadAllButtons()
            .then(res=>{
                setData(res);
            })
            .catch(err=>{
                Ping.error(err.message);
            })
    }, []);


    if (tab===Tabs.kids) {
        var addAction = ()=>navigator(paths.child.new);
    } else if (tab===Tabs.events) {
        var addAction = ()=>navigator(paths.event.new);
    } else {
        //var addAction = ()=>Ping.alert("not set up yet...");
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
                    // <Button
                    //     type={BUTTON_TYPES.filled}
                    //     primaryColor={colors.primaryLight}
                    //     secondaryColor={colors.textDark}
                    //     onClick={()=>{Ping.error("not yet done")}}
                    // >Edit Profile</Button>,
                    // <IconButton
                    //     icon={ICON_NAMES.settings}
                    //     onClick={()=>Ping.warn("not done yet")}
                    // />
                ]}
            />
            <OrderedList 
                title={tab}
                onClick={addAction}
                sort={(a,b)=>a.key > b.key}
            >
                {data[tab]}
            </OrderedList>
        </MarginlessMain>
    );
}