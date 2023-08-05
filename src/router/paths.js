//These are all the paths
export const paths = {
    website: {
        home: "/",
    },
    auth: {
        register: "/auth/register",
        login: "/auth/login",
        validate: "/auth/validate",
    },
    social: {
        notifications: "/social/notifications",
        messages: "/social/messages",
        chat: "/social/messages/:chatId",
    },
    guardian: {
        home: "/guardian",
        dropoff: "/guardian/dropoff",
        pickup: "/guardian/pickup"
    },
    caretaker: {
        home : "/caretaker",
        //orgs: "/caretaker/events&orgs/:userId",
        dropoff: "/caretaker/dropoff",
        pickup: "/caretaker/pickup",
    },
    child: {
        new: "/child/new",
        profile: "/child/:childId",
    },
    event: {
        new: "/event/new",
        info: "/event/info/:eventId",
        dash: "/event/dash/:eventId",
        signup: "/event/signup/:eventId"
    },
    user: {
        profile: "/user/:userId",
    }
}

export default paths;