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
    camera: {
      name: "Camera",
      home: "/camera",
    },
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
      attendancePickEvent: "/child/:childId/attendance/pick",
      attendance: "/child/:childId/attendance/:eventId",
    },
    event: {
      home: "/event/home/:eventId",
      dash: "/event/dash/:eventId",
      signup: "/event/signup/:eventId",
      roster: "/event/roster/:eventId",
      invite: {
        attendee: "./event/:eventId/invite/attendee",
        caretaker: "/event/:eventId/invite/caretaker",
      },
      accept: {
        caretaker: "/event/:eventId/accept/caretaker",
      },
      getHelp: "/event/:eventId/get-help",
      new: "/event/new",
    },
    user: {
      profile: "/user/profile",
    },
  },
  dropoff: {
    name: "Dropoff",
    caretaker: {
      root: "dropoff/caretaker",
      confirm: "dropoff/caretaker/:eventId/:childId/:guardianId",
      decline: "dropoff/caretaker/decline/:eventId/:childId/:guardianId",
    },
    guardian: {
      pickKids: "dropoff/guardian/kids",
      pickEvent: "dropoff/guardian/event",
      status: "dropoff/guardian/status",
    },
  },
  pickup: {
    name: "Pickup",
    caretaker: {
      root: "pickup/caretaker",
      confirm: "pickup/caretaker/:eventId/:childId/:guardianId",
      decline: "pickup/caretaker/decline/:eventId/:childId/:guardianId",
      dismissList: "pickup/caretaker/dismisslist/:eventId",
      dismissContacts: "pickup/caretaker/dismisslist/contacts/:childId",
      noRequest: "pickup/caretaker/noreqeust/:eventId/:childId/:guardianId",
      manualDismissal: "pickup/caretaker/noguardian/:childId",
    },
    guardian: {
      pickKids: "pickup/guardian/kids",
      status: "pickup/guardian/status",
    },
  },
};

export default paths;
