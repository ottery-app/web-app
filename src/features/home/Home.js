import { useSelector } from "react-redux";
import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu";
import { useNavigator } from "../../router/useNavigator";
import { selectUserState } from "../auth/authSlice";
import { useMemo } from "react";
import { role } from "@ottery/ottery-dto";
import { Frame } from "../../../ottery-ui/containers/Frame";
import { usePing } from "../../../ottery-ping";
import { message, pfp } from "../../../assets/icons";
import paths from "../../router/paths";

export function Home() {
  const navigator = useNavigator();
  const userState = useSelector(selectUserState);
  const { error } = usePing();

  function navigateToMessages() {
    navigator(paths.main.social.messages);
  }

  const buttons = useMemo(() => {
    const buttons = [
      {
        icon: { url: pfp.src },
        title: "Account",
        onPress: () => {
          navigator(paths.main.user.dummyPage);
        },
      },
      {
        icon: { uri: message.src },
        title: "Messages",
        onPress: navigateToMessages,
      },
    ];

    if (userState === role.GUARDIAN) {
    } else if (userState === role.CARETAKER) {
      buttons.push({
        icon: "clock",
        title: "Clock out?",
        onPress: () => {
          error("no");
        },
      });
    }

    return buttons;
  }, [userState]);

  return (
    <Frame>
      <ButtonMenu buttons={buttons} />
    </Frame>
  );
}
