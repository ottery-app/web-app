import { useMutation, useQuery } from "react-query";
import { activate, logout, resendEmail } from "./authApi";
import { useDispatch } from "react-redux";
import { API_ENV } from "../../env/api.env";
import { load, login, register } from "./authSlice";
import { useUserId } from "../../hooks/useUserId";

export function useAuthClient() {
    const dispatch = useDispatch();

    const useLoad = (options)=>useQuery(
        [API_ENV.paths.auth.load.split("/")],
        async ()=>dispatch(load()),
        options
    )

    const useLogin = (options)=>useMutation(
        async (loginDto)=>await dispatch(login(loginDto)),
        options
    );

    const useLogout = (options)=>useMutation(logout, options);

    const useRegister = (options)=>useMutation(
        async (registerDto)=>await dispatch(register(registerDto)),
        options
    );

    const useActivate = (options)=>useMutation(activate, options);

    const useResendEmail = (options)=>useMutation(resendEmail, options);

    return {
        useUserId,
        useLoad,
        useLogin,
        useRegister,
    }
}