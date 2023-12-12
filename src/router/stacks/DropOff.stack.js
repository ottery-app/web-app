import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import Header from "./Header";
import { useAuthClient } from "../../features/auth/useAuthClient";
import { noId, role, tempzone } from "@ottery/ottery-dto";
import { Signin } from "../../features/event/tempzone/Signin";
import { useEventClient } from "../../features/event/useEventClient";
import { ApproveSignin } from "../../features/event/tempzone/approveSingin/ApproveSignin";
import { PickChildren } from "../../features/event/tempzone/RequestSignin/PickChildren";
import { SelectEvents } from "../../features/event/tempzone/RequestSignin/SelectEvents";
import { DropOffStatus } from "../../features/event/tempzone/RequestSignin/DropOffStatus";
import { ConfirmChildSignin } from "../../features/event/tempzone/approveSingin/ConfirmChildSignin";
import { DeclineSignin } from "../../features/event/tempzone/approveSingin/DeclineSignin";

const Stack = createNativeStackNavigator();

export function DropoffStack() {
  const {state, event:eventId} = useAuthClient().useSesh();
  const event = useEventClient().useGetEvent({
    inputs: [eventId],
    enabled: !!eventId && eventId !== noId,
  })?.data?.data;

  const screens = [];

  if (state === role.CARETAKER) {
    if (event?.tempzone === tempzone.Default) {
      screens.push(
        <Stack.Screen
          name={paths.dropoff.caretaker.root}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          <Signin/>
        </Stack.Screen>
      )
    } else if (event?.tempzone === tempzone.Secure) {
      screens.push(
        <Stack.Screen
          name={paths.dropoff.caretaker.root}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          <ApproveSignin/>
        </Stack.Screen>,
        <Stack.Screen
          name={paths.dropoff.caretaker.confirm}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          <ConfirmChildSignin {...props}/>
        </Stack.Screen>,
        <Stack.Screen
          name={paths.dropoff.caretaker.decline}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          {props=><DeclineSignin {...props}/>}
        </Stack.Screen>,
      )
    }
  } else if (state === role.GUARDIAN) {
    screens.push(
      <Stack.Screen
          name={paths.dropoff.guardian.pickKids}
          options={{
            header: (props) => <Header {...props} />,
          }}
      >
        <PickChildren/>
      </Stack.Screen>,
      <Stack.Screen
        name={paths.dropoff.guardian.pickEvent}
        options={{
          header: (props) => <Header {...props} />,
        }}
      >
        <SelectEvents/>
      </Stack.Screen>,
        <Stack.Screen
        name={paths.dropoff.guardian.status}
        options={{
          header: (props) => <Header {...props} />,
        }}
      >
        <DropOffStatus/>
      </Stack.Screen>
    )
  }

  if (screens.length === 0) {
    return;
  }

  return (
    <Stack.Navigator>
      {screens}
    </Stack.Navigator>
  )
}