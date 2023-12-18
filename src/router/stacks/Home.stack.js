import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { Text, View } from "react-native";
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
import GetHelpScreen from "../../features/event/GetHelp";
import { SignUp } from "../../features/event/SignUp";
import { InviteAttendee } from "../../features/event/InviteAttendee";
import NewEventScreen from "../../features/event/new";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={paths.main.home}
        
        options={{  
          header: Header,
        }}
        component={Home}
      />
      <Stack.Screen
        name={paths.main.social.notifications}
        options={{
          title: "Notifications",
          header: (props) => <Header {...props} />,
        }}
        component={Notifications}
      />
      <Stack.Screen
        name={paths.main.social.chat}
        options={{
          title: "Chat",
          header: (props) => <Header {...props} />,
        }}
        component={Chat}
      />
      <Stack.Screen
        name={paths.main.social.messages}
        options={{
          title: "Messages",
          header: (props) => <Header {...props} />,
        }}
        component={Messages}
      />
      <Stack.Screen
        name={paths.main.child.new}
        options={{
          title: "New Child",
          header: (props) => <Header {...props} />,
        }}
        component={NewChild}
      />
      <Stack.Screen
        name={paths.main.child.acceptGuardian}
        options={{
          title: "Accept guardian invite",
          header: (props) => <Header {...props} />,
        }}
        component={AcceptGuardianship}
      />
      <Stack.Screen
        name={paths.main.child.profile}
        options={{
          title: "Child",
          header: (props) => <Header {...props} />,
        }}
        component={ChildProfile}
      />
      <Stack.Screen
        name={paths.main.child.addGuardian}
        options={{
          title: "Add Guardian",
          header: (props) => <Header {...props} />,
        }}
        component={AddGuardian}
      />
      <Stack.Screen
        name={paths.main.user.profile}
        options={{
          title: "User Profile",
          header: (props) => <Header {...props} />,
        }}
        component={UserProfile}
      />
      <Stack.Screen
        name={paths.main.event.dash}
        options={{
          title: "Event Dash",
          header: (props) => <Header {...props} />,
        }}
        component={EventHome}
      />
      <Stack.Screen
        name={paths.main.event.roster}
        options={{
          title: "Roster",
          header: (props) => <Header {...props} />,
        }}
        component={Roster}
      />
      <Stack.Screen
        name={paths.main.event.getHelp}
        options={{
          title: "Get Help",
          header: (props) => <Header {...props} />,
        }}
        component={GetHelpScreen}
      />
      <Stack.Screen
        name={paths.main.event.invite.caretaker}
        options={{
          title: "Invite Caretaker",
          header: (props) => <Header {...props} />,
        }}
        component={InviteCaretaker}
      />
      <Stack.Screen
        name={paths.main.event.invite.attendee}
        options={{
          title: "Invite Attendee",
          header: (props) => <Header {...props} />,
        }}
        component={InviteAttendee}
      />
      <Stack.Screen
        name={paths.main.event.accept.caretaker}
        options={{
          title: "Accept caretaker invite",
          header: (props) => <Header {...props} />,
        }}
        component={()=><Text>accept being a caretaker</Text>}
      />
      <Stack.Screen
        name={paths.main.event.signup}
        options={{
          title: "Sign Up",
          header: (props) => <Header {...props} />,
        }}
        component={SignUp}
      />
      <Stack.Screen
        name={paths.main.event.new}
        options={{
          title: "New Event",
          header: (props) => <Header {...props} />,
        }}
        component={NewEventScreen}
      />
    </Stack.Navigator>
  );
}
