import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import { useNavigator } from "../useNavigator";
import { useEffect } from "react";
import { useAuthClient } from "../../features/auth/useAuthClient";
import Validate from "../../features/auth/Validate";
import ForgotPasswordScreen from "../../features/auth/ForgotPassword";
import ResetPasswordScreen from "../../features/auth/ResetPassword";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  const navigator = useNavigator();
  const sesh = useAuthClient().useSesh();

  useEffect(() => {
    if (sesh.loggedin && !sesh.activated) {
      navigator(paths.auth.validate, undefined, {ignoreNext:true});
    }
  }, [sesh]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={paths.auth.register}
        options={{ headerShown: false }} //switch to logo at some point
        component={Register}
      />
      <Stack.Screen 
        name={paths.auth.login} 
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name={paths.auth.validate}
        options={{ headerShown: false }}
        component={Validate} 
      />
      <Stack.Screen
        name={paths.auth.forgotPassword}
        options={{ headerShown: false }}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={paths.auth.resetPassword}
        options={{ headerShown: false }}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
