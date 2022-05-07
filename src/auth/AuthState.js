import { useReducer } from "react";
import capitalize from "../functions/capitalize";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {axiosInst} from "../clients/axiosInst";

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
        axiosInst.defaults.headers.common["Authorization"] = initialState.token;
        const res = await axiosInst.get("auth/load");
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
      const res = await axiosInst.post("auth/login", { email, password });
      
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
      const res = await axiosInst.post(process.env.REACT_APP_BACKEND + "auth/register", {
        email,
        firstName: capitalize(name.first),
        lastName: capitalize(name.last),
        address: capitalize(address.address),
        city: capitalize(address.city),
        state: capitalize(address.state),
        zip: address.zip,
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
      const res = await axiosInst.put("auth/activate", {
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
      const res = await axiosInst.post("auth/resendActivation", {
        email,
      });
      success(res);
    } catch (err) {
      error(err);
    }
  }

  //clear user data
  function logout() {
    axiosInst.delete("auth/logout").then(
      () => {
        dispatch({ type: LOGOUT })
      }
    ).catch(() => {
      console.error("failed to logout");
    });
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