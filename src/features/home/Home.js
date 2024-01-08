import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu";
import { useNavigator } from "../../router/useNavigator";
import { useMemo } from "react";
import { role } from "@ottery/ottery-dto";
import { usePing } from "../../../ottery-ping";
import {
  alertMessage,
  clock,
  message,
  pfp,
  users,
} from "../../../assets/icons";
import paths from "../../router/paths";
import { Main } from "../../../ottery-ui/containers/Main.tsx";
import { useAuthClient } from "../auth/useAuthClient";
import CameraComponent from "../../../ottery-ui/camera/CameraComponent";

export function Home() {
  const navigator = useNavigator();
  const authClient = useAuthClient();
  const [state, swapState] = authClient.useSwapState();
  const sesh = authClient.useSesh();
  const { error } = usePing();

  const buttons = useMemo(() => {
    const buttons = [
      {
        icon: { uri: pfp.src },
        title: "Account",
        onPress: () => {
          navigator(paths.main.user.profile);
        },
      },
      {
        icon: { uri: message.src },
        title: "Messages",
        onPress: () => navigator(paths.main.social.messages),
      },
      {
        icon: {uri: pfp.src},
        title: "camera",
        onPress: ()=>{
          navigator(paths.main.camera.home);
        }
      }
      // {
      //   icon: "NONE",
      //   title: "Notifications",
      //   onPress: () => {
      //     navigator(paths.main.social.notifications);
      //   },
      // },
    ];

    if (state === role.GUARDIAN) {
    } else if (state === role.CARETAKER) {
      buttons.push(
        {
          icon: { uri: clock.src },
          title: "Clock out?",
          onPress: () => {
            swapState(sesh.event);
          },
        },
        {
          icon: { uri: users.src },
          title: "Roster",
          onPress: () => {
            navigator(paths.main.event.roster, { eventId: sesh.event });
          },
        },
        {
          icon: { uri: alertMessage.src },
          title: "Get Help",
          onPress: () => {
            navigator(paths.main.event.getHelp, { eventId: sesh.event });
          },
        }
      );
    }

    return buttons;
  }, [state]);

  return (
    <Main>
      <ButtonMenu buttons={buttons} />
    </Main>
  );
}
