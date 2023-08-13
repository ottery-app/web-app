import {MultiFieldHeader} from "../../../ottery-ui/headers/MultiFieldHeader";
import OrderedList from "../../../ottery-ui/lists/OrderedList";
import { useMemo, useState } from "react";
import { MarginlessMain } from "../../../components/Main";
import Button from "../../../ottery-ui/buttons/Button";
import { colors } from "../../../ottery-ui/styles/colors";
import paths from "../../../router/paths";
import { useNavigator } from "../../../hooks/useNavigator";
import { FriendRequest } from "../../../components/FriendRequest";
import { BUTTON_TYPES } from "../../../ottery-ui/buttons/button.enum";
import { useChatClient } from "../../chat/useChatClient";
import {AwaitLoad} from "../../../guards/AwaitLoad";

const Tabs = {
    posts: "posts",
    shared: "shared kids",
}

const color = {
    main: colors.background.primary,
    light: colors.background.primary,
    dark: colors.background.secondary,
    contrastText: colors.text.primary,
}

export default function UserOther({userInfo, userId, selfId}) {
    const [tab, setTab] = useState(Object.values(Tabs)[0]);
    const [data, setData] = useState({});
    const user = useMemo(()=>userInfo, [userInfo]);
    const navigator = useNavigator();
    const {useGetDirectChat} = useChatClient();
    const {data:chatRes, status} = useGetDirectChat({inputs:[selfId, userId]});

    async function getChatId() { 
        return chatRes.data._id;
    }

    return(
        <AwaitLoad status={status}>
            <MarginlessMain>
                <MultiFieldHeader
                    src={user?.pfp?.src || "pfp"}
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
                        `${user?.firstName} ${user?.lastName}`,
                        <Button
                            type={BUTTON_TYPES.filled}
                            color={color}
                            onClick={async ()=>{
                                let chatId = await getChatId();
                                navigator(paths.social.chat, {chatId:chatId});
                            }}
                        >message</Button>,
                        <FriendRequest
                            color={color}
                            userId={userId} 
                        />
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
        </AwaitLoad>
    );
}