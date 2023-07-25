import { useMutation, useQuery } from "react-query";
import { activate, logout, resendEmail } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { API_ENV } from "../../env/api.env";
import { load, login, register, selectUserEmail, selectUserId, selectUserState } from "./authSlice";

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

    const useUserId = useSelector(selectUserId);
    const useUserEmail = useSelector(selectUserEmail);
    const useUserState = useSelector(selectUserState);

    return {
        useLoad,
        useLogin,
        useRegister,

        useUserId,
        useUserEmail,
        useUserState,
    }
}