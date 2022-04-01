import { backend } from "../../managers/Manager.js";
import axios from "axios";

import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
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
import User from "../../managers/User.js";

function AuthState(props) {

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
    manager: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state);

  function success(type, res) {
    dispatch({
      type: type,
      payload: res.data,
    });
  }

  function error(type, err) {
    dispatch({
      type: type,
      payload: err.response.data.msg,
    });
  }

  //load user token
  function loadUser() {
    if (initialState.token) {
      dispatch({ type: LOAD_USER });
    } else {
      dispatch({ type: UNLOAD_USER });
    }
  };

  //Register User
  async function register(email, username, password, firstName, middleName, lastName, gender, date, country, address, city, state, zip, phone) {
    User().register(email, username, password, firstName, middleName, lastName, gender, date, country, address, city, state, zip, phone, 
      (res) => {success(REGISTER_SUCCESS, res)},
      (err) => {error(REGISTER_FAIL, err)}
    )
  };

  //Login User
  async function login(username, password) {
    User().login(username, password, 
      (res) => {success(LOGIN_SUCCESS, res)},
      (err) => {error(LOGIN_FAIL, err)}
    )
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
        user: state.user,
        loading: state.loading,
        error: state.error,
        manager: state.manager,
        loadUser,
        register,
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