import { useEffect, useState } from "react";
import { Main } from "../../components/Main";
import { useUserId } from "../../hooks/useUserId";
import { Ping } from "../../ottery-ping/Ping";
import { getNotifications, readNotifications } from "./notifiactionsApi";
import {Notification} from './notificationTypes/notification';

export function Notifications() {
    const userId = useUserId();
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        if (userId) {
            getNotifications(userId)
                .then((res)=>{
                    setNotifications(res.data);
                    readNotifications(userId)
                        .then(()=>{
                            console.log("notifications marked as read");
                        }).catch((e)=>{
                            throw e
                        });
                })
                .catch(err=>{
                    Ping.error(err.message);
                })
        }
    }, [userId]);

    return <Main>
        {notifications.map(((notif, i)=>{
            return <Notification key={i} raw={notif} />
        }))}
    </Main>;
}