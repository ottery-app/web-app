import {makeUseMutation} from "../../queryStatus/makeUseMutation";
import {makeUseQuery} from "../../queryStatus/makeGetQuery";
import { getNotifications, readNotifications } from "./notifiactionsApi";
import { query_paths } from "../../provider/queryClient";

export function useNotificationClient() {

    const useReadNotifications = makeUseMutation({
        mutationFn: readNotifications,
    })

    const readNotificationsCli = useReadNotifications();

    const useGetNotifications = makeUseQuery({
        queryKey: [query_paths.notification.root],
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