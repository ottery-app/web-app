import { DataFieldDto, ImageDto, StringDto, isId, validateAsArr } from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

export const missingUserData = clideInst.makeGet(
  "user/:userId/data/missing",
  {
    param_validators: {
      userId: isId,
    },
    in_pipeline:(id, desiredFieldIds)=>{
      return {
        params: {
          userId: id,
          desired: desiredFieldIds,
        }
      }
    }
  }
)

export const updateUserData = clideInst.makePatch(
  "user/:userId/data",
  {
    param_validators: {
      userId: isId,
    },
    data_validator: validateAsArr(DataFieldDto),
    in_pipeline: ({userId, dataFields})=>{
      return {
        data: dataFields,
        params: {
          userId: userId,
        }
      }
    },
    out_pipeline: (i)=>{
      console.log(i);
      //debugger;
      return i;
    }
  }
)

export const getUserData = clideInst.makeGet(
  "user/:userId/data",
  {
    param_validators: {
      userId: isId,
    },
    in_pipeline: (userId)=>{
      return {
        params: {
          userId: userId,
        }
      }
    },
  }
)

export const udpateFirstName = clideInst.makePatch("user/:userId/firstName", {
  data_validator: StringDto,
  param_validators: {
    userId: isId,
  },
  in_pipeline: (userId, name)=>{
    return {
      data: {
        string: name,
      },
      params: {
        userId: userId,
      }
    }
  }
})

export const udpateLastName = clideInst.makePatch("user/:userId/lastName", {
  data_validator: StringDto,
  param_validators: {
    userId: isId,
  },
  in_pipeline: (userId, name)=>{
    return {
      data: {
        string: name,
      },
      params: {
        userId: userId,
      }
    }
  }
})

export const updateProfilePhoto = clideInst.makePost("user/:userId/pfp", {
  data_validator: ImageDto,
  param_validators: {
    userId: isId,
  },
  in_pipeline: ({pfp, userId})=>{
    return {
      data: pfp,
      params: {
        userId: userId
      }
    }
  }
});

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

//WHY IS THIS HERE?
export const updateChildData = clideInst.makePatch(
  "child/:childId/data",
  {
    param_validators: {
      childId: isId,
    },
    data_validator: validateAsArr(DataFieldDto),
    in_pipeline: ({childId, dataFields})=>{
      return {
        data: dataFields,
        params: {
          childId: childId,
        }
      }
    }
  }
)

export const getData = clideInst.makeGet("user/data", {})