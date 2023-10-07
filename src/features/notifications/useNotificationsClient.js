import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";
import { getNotifications, readNotifications } from "./notifiactionsApi";

export const QUERY_NOTIFICATION_TAG = "event";

export function useNotificationClient() {

    const useReadNotifications = makeUseMutation({
        mutationFn: readNotifications,
    })

    const readNotificationsCli = useReadNotifications();

    const useGetNotifications = makeUseQuery({
        queryKey: [QUERY_NOTIFICATION_TAG],
        queryFn: async (id)=>{
            readNotificationsCli.mutate(id);
            return await getNotifications(id);
        },
    });

    return {
        useGetNotifications,
        useReadNotifications,
    }
}