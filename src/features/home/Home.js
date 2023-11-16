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
import { Dropdown } from "../../../ottery-ui/input/Dropdown";

export function Home() {
  const navigator = useNavigator();
  const userState = useSelector(selectUserState);
  const { error } = usePing();
  const [drop, setDrop] = useState();

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

  console.log(drop)
  
  return (
    <Main>
      <ButtonMenu buttons={buttons} />
      <Dropdown 
        label="testing this thang"
        value={drop}
        options={[{label:"asdf", value:"test"}, {label:"5454", value:"test2"}]}
        onChange={(value)=>{setDrop(value)}}
      />
    </Main>
  );
}
