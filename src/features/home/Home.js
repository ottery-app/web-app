import { useSelector } from "react-redux";
import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu";
import { useNavigator } from "../../router/useNavigator";
import { selectUserState } from "../auth/authSlice";
import { useMemo, useState } from "react";
import { role } from "@ottery/ottery-dto";
import { usePing } from "../../../ottery-ping";
import { message, pfp } from "../../../assets/icons";
import paths from "../../router/paths";
import { Main } from "../../../ottery-ui/containers/Main.tsx";
import ImageInput from "../../../ottery-ui/input/ImageInput";

export function Home() {
  const navigator = useNavigator();
  const userState = useSelector(selectUserState);
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
        onPress: ()=>navigator(paths.main.social.messages),
      },
      // {
      //   icon: "NONE",
      //   title: "Notifications",
      //   onPress: () => {
      //     navigator(paths.main.social.notifications);
      //   },
      // },
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
    <Main>
      <ButtonMenu buttons={buttons} />
    </Main>
  );
}
