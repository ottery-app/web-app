//These are all the paths
export const paths = {
  auth: {
    name: "Auth",
    register: "/auth/register",
    login: "/auth/login",
    validate: "/auth/validate",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  main: {
    name: "Main",
    home: "/",
    social: {
      notifications: "/social/notifications",
      messages: "/social/messages",
      chat: "/social/messages/:chatId",
    },
    child: {
      new: "/child/new",
      profile: "/child/:childId",
    },
    event: {
      new: "/event/new",
      info: "/event/info/:eventId",
      dash: "/event/dash/:eventId",
      signup: "/event/signup/:eventId",
    },
    user: {
      profile: "/user/:userId",
    },
  },
  dropoff: {
    name: "Dropoff",
    caretaker: "dropoff/caretaker",
    guardian: "dropoff/guardian",
  },
  pickup: {
    name: "pickup",
    caretaker: "pickup/caretaker",
    guardian: "pickup/guardian",
  },
};

export default paths;
