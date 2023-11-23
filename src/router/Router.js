import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./stacks/Auth.stack";
import { AppTabs } from "./stacks/App.tabs";
import { useAuthClient } from "../features/auth/useAuthClient";

export default function Router() {
  const { useLoad, useSesh } = useAuthClient();
  useLoad();

  const sesh = useSesh();

  // const linking = {
  //   prefixes: [
  //     /*linking prefixes*/
  //     Linking.createURL("/"),
  //     process.env.EXPO_PUBLIC_WEB_APP_URL,
  //   ],
  //   config: {
  //     /** configuration for matching screens with paths */
  //     screens: {
  //       [paths.auth.resetPassword]: "reset-password",
  //       //[paths.main.child.addGuardian]: "child/:childId/addguardian",
  //     },
  //   },
  // };

  return (
    <NavigationContainer>
      {!sesh.loggedin || !sesh.activated ? ( //is authenticated
        <AuthStack />
      ) : (
        <AppTabs />
      )}
    </NavigationContainer>
  );
}
