import { resendEmail } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  load,
  login,
  register,
  logout,
  selectUserEmail,
  selectUserId,
  selectUserState,
  activate,
  selectUserEventId,
  selectSesh,
  forgotPassword,
  resetPassword,
} from "./authSlice";
import useSwapState from "./useSwapState";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { query_paths } from "../../provider/queryClient";

export function useAuthClient() {
  const dispatch = useDispatch();

  const useLoad = makeUseQuery({
    queryKey: [query_paths.auth.root],
    queryFn: async () => {dispatch(load())},
  });

  const useLogin = makeUseMutation({
    mutationFn: async (loginDto) => dispatch(login(loginDto)),
  });

  const useLogout = makeUseMutation({
    mutationFn: async () => dispatch(logout()),
  });

  const useRegister = makeUseMutation({
    mutationFn: async (registerDto) => dispatch(register(registerDto)),
  });

  const useActivate = makeUseMutation({
    mutationFn: async (activateDto) => dispatch(activate(activateDto)),
  });

  const useResendEmail = makeUseMutation({
    mutationFn: resendEmail,
  });

  const useForgotPassword = makeUseMutation({
    mutationFn: async (emailDto) => dispatch(forgotPassword(emailDto)),
  });

  const useResetPassword = makeUseMutation({
    mutationFn: async (resetPasswordDto) =>
      dispatch(resetPassword(resetPasswordDto)),
  });

  const useUserId = () => useSelector(selectUserId);
  const useUserEmail = () => useSelector(selectUserEmail);
  const useUserState = () => useSelector(selectUserState);
  const useEventId = () => useSelector(selectUserEventId);
  const useSesh = () => useSelector(selectSesh);

  return {
    useLoad,
    useLogin,
    useLogout,
    useRegister,
    useResendEmail,
    useActivate,
    useSesh,
    useForgotPassword,
    useResetPassword,

    useUserId,
    useUserEmail,
    useUserState,
    useSwapState,
    useEventId,
  };
}
