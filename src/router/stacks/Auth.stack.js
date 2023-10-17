import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name={paths.auth.login}
            options={{headerShown: false,}}
        >
            {props => 
                <AuthGuard notLoggedin>
                    <Login/>
                </AuthGuard>
            }
        </Stack.Screen>
        <Stack.Screen 
            name={paths.auth.register}
            options={{headerShown: false,}} //switch to logo at some point
        >
            {props => 
                <AuthGuard notLoggedin>
                    <Register/>
                </AuthGuard>
            }
        </Stack.Screen>
        <Stack.Screen 
            name={paths.auth.validate}
            options={{headerShown: false,}}
        >
            {props => 
                <AuthGuard loggedin>
                    <View><Text>temp</Text></View>
                </AuthGuard>
            }
        </Stack.Screen>
    </Stack.Navigator>
  );
}