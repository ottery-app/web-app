import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import { screenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export function PickUpStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={paths.pickup.caretaker}
        options={{ 
          title: 'Pick up',
        }} //switch to logo at some point
        >
          {props => 
            <AuthGuard loggedin activated caretaker>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen
        name={paths.pickup.guardian}
        options={{ 
          title: 'Pick up',
        }} //switch to logo at some point
        >
          {props => 
            <AuthGuard loggedin activated guardian>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
    </Stack.Navigator>
  )
}