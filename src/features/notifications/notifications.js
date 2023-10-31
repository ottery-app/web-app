import { Main } from "../../../ottery-ui/containers/Main.tsx";
import {Notification} from './notificationTypes/notification';
import { useAuthClient } from "../auth/useAuthClient";
import { useNotificationClient } from "./useNotificationsClient";

export function Notifications() {
    const {useUserId} = useAuthClient()
    const userId = useUserId();
    const {useGetNotifications} = useNotificationClient();
    const {data:notifications, status: status} = useGetNotifications({inputs:[userId]});

    return (
        <Main>
            {notifications?.data.map(((notif, i)=>{
                return <Notification key={i} raw={notif} />
            }))}
        </Main>
    );  
}