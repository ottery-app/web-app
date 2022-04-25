import Manager from "../managers/Manager";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USER,
  UNLOAD_USER,
} from "./types";
export default (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      console.log("loading user");
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.state,
        manager: Manager({
          token: action.payload.token,
          state: action.payload.state,
        })
      }


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
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        manager: Manager({
          token: action.payload.token,
          state: action.payload.state,
        })
      };


    case REGISTER_FAIL:
      console.log("regester fail");
    case LOGIN_FAIL:
      console.log("login fail");
    case LOGOUT:
      console.log("remove user");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        manager: null,
      };


    case CLEAR_ERRORS:
      console.log("clear errors");
      return {
        ...state,
        error: null,
      };

      
    default:
      console.log("default");
      return state;
  }
};