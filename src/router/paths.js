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
      addGuardian: "/child/:childId/addguardian",
      acceptGuardian: "/child/:childId/acceptguardianinvite",
    },
    event: {
      dash: "/event/dash/:eventId",
      signup: "/event/signup/:eventId",
      roster: "/event/roster/:eventId",
      invite: {
        caretaker: "/event/:eventId/invite/caretaker",
      },
      accept: {
        caretaker: "/event/:eventId/accept/caretaker",
      },
      getHelp: "/event/:eventId/get-help",
    },
    user: {
      profile: "/user/profile",
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
