import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import { screenOptions } from "./screenOptions";
import { LogoTitle } from "./LogoTitle";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={paths.main.home}
        options={{ 
          headerTitle: props=><LogoTitle {...props}/>,
        }} //switch to logo at some point
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.social.notifications}
        options={{ 
          title: 'Notifications',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.social.chat}
        options={{ 
          title: 'Chat',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.social.messages}
        options={{ 
          title: 'Messages',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.child.new}
        options={{ 
          title: 'New Child',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.child.profile}
        options={{ 
          title: 'Child',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.user.profile}
        options={{ 
          title: 'User Profile',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.event.new}
        options={{ 
          title: 'New Event',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.event.info}
        options={{ 
          title: 'Event Info',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.event.dash}
        options={{ 
          title: 'Event Dash',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
      <Stack.Screen 
        name={paths.main.event.signup}
        options={{ 
          title: 'Sign Up',
        }}
        >
          {props => 
            <AuthGuard loggedin activated>
              <View><Text>temp</Text></View>
            </AuthGuard>
          }
      </Stack.Screen>
    </Stack.Navigator>
  )
}