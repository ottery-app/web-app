import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
import { AuthGuard } from "../../guards/AuthGuard";
import { Home } from "../../features/home/Home";
import Chat from "../../features/chat/Chat";
import Messages from "../../features/chat/Messages";
import { Notifications } from "../../features/notifications/notifications";
import { UserProfile } from "../../features/user/UserProfile";
import { ChildProfile } from "../../features/child/ChildProfile";
import AddGuardian from "../../features/child/AddGuardian";
import Header from "./Header";
import { EventHome } from "../../features/event/EventHome";
import { NewChild } from "../../features/child/NewChild";
import { Roster } from "../../features/event/Roster";
import { InviteCaretaker } from "../../features/event/InviteCaretaker";
import { AcceptGuardianship } from "../../features/child/AcceptGuardianship";
import { SignUp } from "../../features/event/SignUp";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={paths.main.home}
        options={{
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <Home />
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.social.notifications}
        options={{
          title: "Notifications",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <Notifications />
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.social.chat}
        options={{
          title: "Chat",
          header: (props) => <Header {...props} />,
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
          header: (props) => <Header {...props} />,
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
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <NewChild/>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.child.acceptGuardian}
        options={{
          title: "Accept guardian invite",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <AcceptGuardianship {...props} />
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.child.profile}
        options={{
          title: "Child",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <ChildProfile {...props}/>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.child.addGuardian}
        options={{
          title: "Add Guardian",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <AddGuardian {...props}/>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.user.profile}
        options={{
          title: "User Profile",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <UserProfile/>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.dash}
        options={{
          title: "Event Dash",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <EventHome {...props} />
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.roster}
        options={{
          title: "Roster",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Roster {...props} />
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.invite.caretaker}
        options={{
          title: "Invite Caretaker",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <InviteCaretaker {...props}/>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.accept.caretaker}
        options={{
          title: "Accept caretaker invite",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <Text>accept being a caretaker</Text>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={paths.main.event.signup}
        options={{
          title: "Sign Up",
          header: (props) => <Header {...props} />,
        }}
      >
        {(props) => (
          <AuthGuard loggedin activated>
            <View>
              <SignUp {...props}/>
            </View>
          </AuthGuard>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
