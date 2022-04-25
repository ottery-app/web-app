import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import Manager from "../managers/Manager";
import axios from "axios";

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

function AuthState(props) {

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    manager: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  function success(type, res) {
    dispatch({
      type: type,
      payload: res.data,
    });
  }

  function error(type, err) {
    dispatch({
      type: type,
      payload: err,
    });
  }

  //load user token
  function load() {
    if (initialState.token) {
      //load user from local storage then make axios call to verify token
    } else {
      dispatch({ type: UNLOAD_USER });
    }
  };

  //Login User
  async function login(email, password) {
    try {
      const res = await axios.post("", { email, password });
      success(LOGIN_SUCCESS, res);
    } catch (err) {
      error(LOGIN_FAIL, err);
    }
  };

  //Register User
  async function register(email, name, address, password, code) {
    try {
      const res = await axios.post("", {
        email,
        name,
        address,
        password,
        code
      });
      success(REGISTER_SUCCESS, res);
    } catch (err) {
      error(REGISTER_FAIL, err);
    }
  };

  async function confirmation(email, code) {
    try {
      const res = await axios.post("", {
        email,
        code
      });
      console.log("handle success");
    } catch (err) {
      console.log("handle error");
    }
  }

  //clear user data
  function logout() {
    dispatch({ type: LOGOUT })
  };

  //Clear Errors
  function clearErrors() {
    dispatch({ type: CLEAR_ERRORS })
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        manager: state.manager,
        load,
        login,
        logout,
        clearErrors,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;