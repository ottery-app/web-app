import client from "../clients/client";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USER,
  UNLOAD_USER,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        client: client(localStorage.getItem("token"))
      }


    case UNLOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };

    case ACTIVATE_SUCCESS:  
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        client: client(action.payload.token)
      };


    case REGISTER_FAIL:
    case ACTIVATE_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        client: null,
      };


    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      console.log("default do nothing");
      return state;
  }
};