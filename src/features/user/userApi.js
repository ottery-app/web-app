import { IdDto, ImageDto, isId, noId } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const updateProfilePhoto = clideInst.makePost("user/:userId/pfp", {
  data_validator: ImageDto,
  in_pipeline: (imageAsset)=>{
    return {
      data: imageAsset,
    }
  }
})

export const acceptGuardianship = clideInst.makePost("user/:userId/accept/child", {
  param_validators: {
    userId: isId,
  },
  data_validator: IdDto,
  in_pipeline: ({userId, childId, token}) => {
    return {
      params: {
        userId,
      },
      data: {
        token,
        id: childId,
      }
    }
  }
})

export const getChildren = clideInst.makeGet("user/:userId/children", {
  param_validators: {
    userId: isId,
  },
  in_pipeline: (userId) => {
    return {
      params: {
        userId: userId,
      },
    };
  },
});

export const getEvents = clideInst.makeGet("user/:userId/events", {
  in_pipeline: (userId) => {
    return {
      params: {
        userId: userId,
        self: true,
        children: true,
      },
    };
  },
});

export const getInfo = clideInst.makeGet("user/info", {
  in_pipeline: (userIds) => {
    if (userIds && !Array.isArray(userIds)) {
      userIds = [userIds];
    }

    return {
      params: {
        users: userIds,
      },
    };
  },
});

export const getAvalableChildren = clideInst.makeGet("user/:userId/children", {
  in_pipeline: (userId) => {
    return {
      params: {
        userId: userId,
        at: noId,
        hasEvent: true,
      },
    };
  },
});

export const getDroppedOffChildren = clideInst.makeGet(
  "user/:userId/children",
  {
    in_pipeline: (userId) => {
      return {
        params: {
          userId: userId,
          notat: noId,
          hasEvent: true,
        },
      };
    },
  }
);
