import { createNativeStackNavigator } from "@react-navigation/native-stack";
import paths from "../paths";
import { AuthGuard } from "../../guards/AuthGuard";
import Header from "./Header";
import { useAuthClient } from "../../features/auth/useAuthClient";
import { role, tempzone } from "@ottery/ottery-dto";
import { Dismissal } from "../../features/event/tempzone/Dismissal";
import { useEventClient } from "../../features/event/useEventClient";
import { ApprovePickup } from "../../features/event/tempzone/approvePickup/ApprovePickup";
import { PickChildren } from "../../features/event/tempzone/RequestPickup/PickChildren";
import { PickupStatus } from "../../features/event/tempzone/RequestPickup/PickupStatus";
import { ConfirmChildPickup } from "../../features/event/tempzone/approvePickup/ConfirmChildPickup";
import { DeclinePickup } from "../../features/event/tempzone/approvePickup/DeclinePickup";
import { DismissList } from "../../features/event/tempzone/approvePickup/ErrorFlow/DismissList";
import { ContactGuardian } from "../../features/event/tempzone/approvePickup/ErrorFlow/ContactGuardian";
import { NoRequestPickup } from "../../features/event/tempzone/approvePickup/ErrorFlow/NoRequestPickup";
import { NoGuardianPickup } from "../../features/event/tempzone/approvePickup/ErrorFlow/NoGuardianPickup";

const Stack = createNativeStackNavigator();

export function PickUpStack() {
  const {state, event:eventId} = useAuthClient().useSesh();
  const event = useEventClient().useGetEvent({
    inputs: [eventId],
    enabled: !!eventId,
  })?.data?.data;

  const screens = [];

  if (state === role.CARETAKER) {
    if (event?.tempzone === tempzone.Default) {
      screens.push(
        <Stack.Screen
          name={paths.pickup.caretaker.root}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          <Dismissal/>
        </Stack.Screen>
      );
    } else if (event?.tempzone === tempzone.Secure) {
      screens.push(
        <Stack.Screen
          name={paths.pickup.caretaker.root}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          <ApprovePickup {...props}/>
        </Stack.Screen>,
        <Stack.Screen
          name={paths.pickup.caretaker.confirm}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          {props=><ConfirmChildPickup {...props}/>}
        </Stack.Screen>,
        <Stack.Screen
          name={paths.pickup.caretaker.decline}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          {props=><DeclinePickup {...props}/>}
        </Stack.Screen>,
        <Stack.Screen
          name={paths.pickup.caretaker.dismissList}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          {props=><DismissList {...props}/>}
        </Stack.Screen>,
        <Stack.Screen
          name={paths.pickup.caretaker.dismissContacts}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          {props => <ContactGuardian {...props}/>}
        </Stack.Screen>,
        <Stack.Screen
          name={paths.pickup.caretaker.noRequest}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
            {props => <NoRequestPickup {...props}/>}
        </Stack.Screen>,
        <Stack.Screen
          name={paths.pickup.caretaker.manualDismissal}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
            {props => <NoGuardianPickup {...props}/>}
        </Stack.Screen>,
      );
    }
  } else if (state === role.GUARDIAN) {
    screens.push(
      <Stack.Screen
          name={paths.pickup.guardian.pickKids}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
          <PickChildren/>
      </Stack.Screen>,
      <Stack.Screen
        name={paths.pickup.guardian.status}
        options={{
          header: (props) => <Header {...props} />,
        }}
      >
        <PickupStatus/>
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