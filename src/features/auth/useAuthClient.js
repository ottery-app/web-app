import { useMutation, useQuery } from "react-query";
import { resendEmail } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { load, login, register, logout, selectUserEmail, selectUserId, selectUserState, activate } from "./authSlice";
import useSwapState from "../../hooks/useSwapState";

const CLIENT_AUTH_TAG = 'auth';

export function useAuthClient() {
    const dispatch = useDispatch();

    const useLoad = (options)=>useQuery(
        CLIENT_AUTH_TAG,
        async ()=>dispatch(load()),
        options
    )

    const useLogin = (options)=>useMutation(
        async (loginDto)=>dispatch(login(loginDto)),
        options
    );

    const useLogout = (options)=>useMutation(
        async ()=>dispatch(logout()),
        options
    );

    const useRegister = (options)=>useMutation(
        async (registerDto)=>dispatch(register(registerDto)),
        options
    );

    const useActivate = (options)=>useMutation(
        async (activateDto)=>dispatch(activate(activateDto)),
        options
    );

    const useResendEmail = (options)=>useMutation(resendEmail, options);

    const useUserId = ()=>useSelector(selectUserId);
    const useUserEmail = ()=>useSelector(selectUserEmail);
    const useUserState = ()=>useSelector(selectUserState);

    return {
        useLoad,
        useLogin,
        useLogout,
        useRegister,
        useResendEmail,
        useActivate,

        useUserId,
        useUserEmail,
        useUserState,
        useSwapState,
    }
}