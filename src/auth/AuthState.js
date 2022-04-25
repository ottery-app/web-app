import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
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
  async function login(username, password) {
    //make axios call to login
  };

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;