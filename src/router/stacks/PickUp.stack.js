import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";

const Stack = createNativeStackNavigator();

export function PickUpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={paths.pickup.caretaker}
        options={{ 
          title: 'Ottery',
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
          title: 'Ottery',
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