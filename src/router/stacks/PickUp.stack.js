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
      );
    } else if (event?.tempzone === tempzone.Secure) {
      screens.push(
        <Stack.Screen
          name={paths.dropoff.caretaker}
          options={{
            header: (props) => <Header {...props} />,
          }}
        >
            {props => 
              <AuthGuard loggedin activated caretaker>
                <ApprovePickup/>
              </AuthGuard>
            }
        </Stack.Screen>
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
          {props => 
            <AuthGuard loggedin activated guardian>
              <PickChildren/>
            </AuthGuard>
          }
      </Stack.Screen>,
      <Stack.Screen
        name={paths.pickup.guardian.status}
        options={{
          header: (props) => <Header {...props} />,
        }}
      >
        {props => 
          <AuthGuard loggedin activated guardian>
            <PickupStatus/>
          </AuthGuard>
        }
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