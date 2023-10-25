import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import { useNavigator } from "../useNavigator";
import Button from "../../../ottery-ui/buttons/Button";
import Messages from "../../features/chat/Messages";
import Chat from "../../features/chat/Chat";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  const navigator = useNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={paths.main.home}
        options={{
          title: "Ottery",
        }} //switch to logo at some point
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Button onPress={() => navigator(paths.main.social.messages)}>
                Messages
              </Button>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.social.notifications}
        options={{
          title: "Notifications",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.social.chat}
        options={{
          title: "Chat",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <Chat {...props} />
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.social.messages}
        options={{
          title: "Messages",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <Messages />
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.child.new}
        options={{
          title: "New Child",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.child.profile}
        options={{
          title: "Child",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.user.profile}
        options={{
          title: "User Profile",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.new}
        options={{
          title: "New Event",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.info}
        options={{
          title: "Event Info",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.dash}
        options={{
          title: "Event Dash",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.signup}
        options={{
          title: "Sign Up",
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>temp</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
