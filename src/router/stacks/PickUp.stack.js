import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import { screenOptions } from "./screenOptions";
import Header from "./Header";
import { useAuthClient } from "../../features/auth/useAuthClient";
import { role } from "@ottery/ottery-dto";
import { Dismissal } from "../../features/event/tempzone/Dismissal";

const Stack = createNativeStackNavigator();

export function PickUpStack() {
  const state = useAuthClient().useUserState();

  if (state === role.CARETAKER) {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={paths.pickup.caretaker}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
            {props => 
              <AuthGuard loggedin activated caretaker>
                <Dismissal/>
              </AuthGuard>
            }
        </Stack.Screen>
      </Stack.Navigator>
    )
  } else if (state === role.GUARDIAN) {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name={paths.pickup.guardian}
            options={{
              header: (props) => <Header {...props} />,
            }}
          >
              {props => 
                <AuthGuard loggedin activated guardian>
                  <View><Text>temp</Text></View>
                </AuthGuard>
              }
          </Stack.Screen>
      </Stack.Navigator>
    );
  }
}