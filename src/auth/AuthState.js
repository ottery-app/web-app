import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  LOAD_USER,
  UNLOAD_USER,
} from "./types";

function AuthState(props) {

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    client: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user token
  async function load() {
    if (initialState.token) {
      try {
        const res = await axios.post(process.env.REACT_APP_BACKEND + "auth/load", {token: initialState.token});
        dispatch({
          type: LOAD_USER,
          payload: res.data,
        });
      } catch (err) {
        dispatch({ type: UNLOAD_USER });
      }
    } else {
      dispatch({ type: UNLOAD_USER });
    }
  };

  //Login User
  async function login(email, password, success=()=>{}, error=()=>{}) {
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND + "auth/login", { email, password });
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      success(res);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
      error(err);
    }
  };

  //Register User
  async function register(email, name, address, password, success=()=>{}, error=()=>{}) {
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND + "auth/register", {
        email,
        name,
        address,
        password,
      });

      /*
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      */

      success(res);
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });

      error(err);
    }
  };

  async function activate(email, activationCode, success=()=>{}, error=()=>{}) {
    try {
      const res = await axios.put(process.env.REACT_APP_BACKEND + "auth/activate", {
        email,
        activationCode
      });
      
      dispatch({
        type: ACTIVATE_SUCCESS,
        payload: res.data,
      });

      success(res);
    } catch (err) {

      dispatch({
        type: ACTIVATE_FAIL,
        payload: err,
      });

      error(err);
    }
  }

  async function resendActivation(email, success=()=>{}, error=()=>{}) {
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND + "auth/resendActivation", {
        email,
      });
      success(res);
    } catch (err) {
      error(err);
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
        client: state.client,
        load,
        login,
        logout,
        clearErrors,
        register,
        activate,
        resendActivation,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;