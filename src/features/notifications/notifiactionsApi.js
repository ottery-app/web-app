import { clideInst } from "../../provider/clideInst";

export const getNotifications = clideInst.makeGet("notifications/:userId", {
  in_pipeline: (id) => {
    return {
      params: {
        userId: id,
      },
    };
  },
});

export const readNotifications = clideInst.makePatch("notifications/:userId", {
  in_pipeline: (id) => {
    return {
      params: {
        userId: id,
      },
    };
  },
});
