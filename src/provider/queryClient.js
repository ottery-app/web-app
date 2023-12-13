import { QueryClient } from "react-query";
export const queryClient = new QueryClient();

export const query_paths = {
    auth: {
        root: "auth",
    },
    chat: {
        root: "chat",
    },
    child: {
        root: "child",
    },
    user: {
        root: "user",
    },
    event: {
        root: "event",
    },
    notification: {
        root: "notif"
    },
    social: {
        root: "soc",
    }

}