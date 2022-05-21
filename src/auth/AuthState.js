import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {axiosInst} from "../clients/axiosInst";
import authClient from "../clients/auth";

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

  const auth = authClient(axiosInst);

  const [state, dispatch] = useReducer(authReducer, initialState);

  function load() {
    auth.load(
      ()=>dispatch({ type: LOAD_USER }),
      ()=>dispatch({ type: UNLOAD_USER }),
    );
  };

  function login(email, password, success=()=>{}, error=()=>{}) {
    auth.login(
      email,
      password,
      (res)=>{
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        success(res);
      },
      (err)=>{
        dispatch({
          type: LOGIN_FAIL,
          payload: err,
        });
        error(err);
      },
    )
  }

  function register(email, name, address, password, success=()=>{}, error=()=>{}) {
    auth.register(
      email,
      name,
      address,
      password,
      success,
      (err)=>{
        dispatch({
          type: REGISTER_FAIL,
          payload: err,
        });
        error(err);
      }
    );
  }
  
  function activate(email, activationCode, success=()=>{}, error=()=>{}) {
    auth.activate(
      email,
      activationCode,
      (res)=>{
        dispatch({
          type: ACTIVATE_SUCCESS,
          payload: res.data,
        });
        success(res);
      },
      (err)=>{
        dispatch({
          type: ACTIVATE_FAIL,
          payload: err,
        });
  
        error(err);
      }
    )
  }

  function resendActivation(email, success=()=>{}, error=()=>{}) {
    auth.resendActivation(email, success, error);
  }

  function logout(success=()=>{}, error=()=>{}) {
    auth.logout(
      (res)=>{
        dispatch({ type: LOGOUT });
        success(res);
      },
      (err)=>error(err)
    );
  }

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