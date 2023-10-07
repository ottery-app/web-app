import { resendEmail } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { load, login, register, logout, selectUserEmail, selectUserId, selectUserState, activate, selectUserEventId, selectSesh } from "./authSlice";
import useSwapState from "../../hooks/useSwapState";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";

const CLIENT_AUTH_TAG = 'auth';

export function useAuthClient() {
    const dispatch = useDispatch();

    const useLoad = makeUseQuery({
        queryKey: [CLIENT_AUTH_TAG],
        queryFn: async ()=>dispatch(load())
    });

    const useLogin = makeUseMutation({
        mutationFn: async (loginDto)=>dispatch(login(loginDto)),
    });

    const useLogout = makeUseMutation({
        mutationFn: async ()=>dispatch(logout()),
    });

    const useRegister = makeUseMutation({
        mutationFn: async (registerDto)=>dispatch(register(registerDto)),
    });

    const useActivate = makeUseMutation({
        mutationFn: async (activateDto)=>dispatch(activate(activateDto)),
    });

    const useResendEmail = makeUseMutation({
        mutationFn: resendEmail,
    })

    const useUserId = ()=>useSelector(selectUserId);
    const useUserEmail = ()=>useSelector(selectUserEmail);
    const useUserState = ()=>useSelector(selectUserState);
    const useEventId = ()=>useSelector(selectUserEventId);
    const useSesh = ()=>useSelector(selectSesh);

    return {
        useLoad,
        useLogin,
        useLogout,
        useRegister,
        useResendEmail,
        useActivate,
        useSesh,

        useUserId,
        useUserEmail,
        useUserState,
        useSwapState,
        useEventId,
    }
}