import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./stacks/Auth.stack";
// import { AppTabs } from "./stacks/App.tabs";
import { useAuthClient } from "../features/auth/useAuthClient";
import { Text } from "react-native-paper";

export default function Router() {
  const { useLoad, useSesh } = useAuthClient();
  useLoad();

  const sesh = useSesh();

  return (
    <NavigationContainer>
      {!sesh.loggedin || !sesh.activated ? ( //is authenticated
        <AuthStack />
      ) : (
        <Text>app</Text>
        // <AppTabs />
      )}
    </NavigationContainer>
  );
}
