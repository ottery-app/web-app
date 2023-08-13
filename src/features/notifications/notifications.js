import { Main } from "../../components/Main";
import {Notification} from './notificationTypes/Notification';
import { useAuthClient } from "../auth/useAuthClient";
import { useNotificationClient } from "./useNotificationsClient";
import { AwaitLoad } from "../../guards/AwaitLoad";

export function Notifications() {
    const {useUserId} = useAuthClient()
    const userId = useUserId();
    const {useGetNotifications} = useNotificationClient();
    const {data:notifications, status: status} = useGetNotifications({inputs:[userId]});

    return (
        <Main>
            <AwaitLoad status={status}>
                {notifications?.data.map(((notif, i)=>{
                    return <Notification key={i} raw={notif} />
                }))}
            </AwaitLoad>
        </Main>
    );  
}