import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import { useNavigator } from "../useNavigator";
import { useEffect } from "react";
import { useAuthClient } from "../../features/auth/useAuthClient";
import Validate from "../../features/auth/Validate";
import ForgotPasswordScreen from "../../features/auth/ForgotPassword";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  const navigator = useNavigator();
  const sesh = useAuthClient().useSesh();

  useEffect(() => {
    if (sesh.loggedin && !sesh.activated) {
      navigator(paths.auth.validate);
    }
  }, [sesh]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={paths.auth.register}
        options={{ headerShown: false }} //switch to logo at some point
      >
        {(props) => (
          <AuthGuard notLoggedin>
            <Register />
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen name={paths.auth.login} options={{ headerShown: false }}>
        {(props) => (
          <AuthGuard notLoggedin>
            <Login />
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen name={paths.auth.validate} options={{ headerShown: false }}>
        {(props) => (
          <AuthGuard loggedin>
            <Validate />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen
        name={paths.auth.forgotPassword}
        options={{ headerShown: false }}
      >
        {(props) => (
          <AuthGuard {...props} notLoggedin>
            <ForgotPasswordScreen />
          </AuthGuard>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
