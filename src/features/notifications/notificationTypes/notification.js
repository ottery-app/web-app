import { dtoAssign, notification, NotificationDto, classifyWithDto } from "ottery-dto";
import ImageButton from "../../../ottery-ui/buttons/ImageButton";
import { FriendReqeust } from "./FriendRequest";
import styled from "styled-components";
import { colors } from "../../../ottery-ui/styles/colors";
import { radius } from "../../../ottery-ui/styles/radius";
import { useEffect, useMemo, useState } from "react";
import {getInfo} from "../../user/userApi";
import { margin } from "../../../ottery-ui/styles/margin";
import {Time} from "../../../ottery-ui/text/Time";

const MainNotif = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: ${margin.small};
`;

const Head = styled.div`
    display:flex;
    flex-direction: column;
    align-items:start;
    width: 100%;
`;

const From = styled.div`
    font-weight:bold;
`;

export function Notification({raw}) {
    const [user, setUser] = useState();
    const [err, setError] = useState(false);
    const notif = useMemo(() => dtoAssign(NotificationDto, raw), [raw]);

    useEffect(()=>{
        if (notif?.sender?.id) {
            getInfo(notif?.sender?.id)
                .then((res)=>{
                    setUser(res.data[0]);
                })
                .catch((err)=>{
                    setError(err);
                })
        }
    }, [notif]);

    let body = undefined;
    if (notif.type === notification.friendrequest) {
        body =  <FriendReqeust notif={notif} />;
    } else {
        console.error("notification type is not yet supported");
        return;
    }

    if(err) {
        console.error(err);
        return;
    } else {
        return (
            <ImageButton
                left={user?.pfp?.src}
                radius={radius.square}
                primaryColor={colors.primary}
                secondaryColor={colors.primary}
                content={
                    <MainNotif>
                        <Head>
                            <From>{user?.firstName} {user?.lastName}</From>
                            <Time time={notif.time} type={"date"} />
                        </Head>
                        <div> {/*this is just here in case an internal body is just a string protects the structure a bit*/}
                            {body}
                        </div>
                    </MainNotif>
                }
            />
        );
    }
}