import User from "../../managers/User";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USER,
  UNLOAD_USER,
  ADD_STATE,
  ADD_STATE_FAIL,
} from "./types";
//no body ever hears cries for help
export default (state, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case LOAD_USER:
      console.log("loading user");
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: localStorage.getItem("user"),
        token: localStorage.getItem("token"),
        manager: User({
          username: JSON.parse(localStorage.getItem("user")).username,
          password: localStorage.getItem("token"),
          state: JSON.parse(localStorage.getItem("user")).state,
        })
      };
    case UNLOAD_USER:
      console.log("unloading user");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case REGISTER_SUCCESS:
      console.log("regestering user");
    case LOGIN_SUCCESS:
      console.log("loggin in user");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        ...action.payload,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        manager: User({
          username: JSON.parse(localStorage.getItem("user")).username,
          password: localStorage.getItem("token"),
          state: JSON.parse(localStorage.getItem("user")).state,
        })
      };
    case REGISTER_FAIL:
      console.log("regester fail");
    case LOGIN_FAIL:
      console.log("login fail");
    case LOGOUT:
      console.log("remove user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        manager: null,
      };
    case ADD_STATE:
      localStorage.setItem("user", action.payload.user);
      alert("UPDATE THE STATE")
      return {
        ...state,
        user: action.payload.user
      };
    case ADD_STATE_FAIL:
      console.log("adding state fail");
      return {...state};
    case CLEAR_ERRORS:
      console.log("clear errors");
      return {
        ...state,
        error: null,
      };
    //CHANGE STATE HERE
    default:
      return state;
  }
};