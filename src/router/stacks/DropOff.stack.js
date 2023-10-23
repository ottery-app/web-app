import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import { screenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export function DropoffStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={paths.dropoff.caretaker}
        options={{ 
          title: 'Drop off',
        }}
        >
          {props => 
            <AuthGuard loggedin activated caretaker>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen
        name={paths.dropoff.guardian}
        options={{ 
          title: 'Drop off',
        }}
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