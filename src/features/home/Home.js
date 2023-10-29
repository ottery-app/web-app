import { useSelector } from "react-redux";
import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu"
import { useNavigator } from "../../router/useNavigator";
import { selectUserState } from "../auth/authSlice";
import { useMemo } from "react";
import { role } from "@ottery/ottery-dto";
import { Frame } from "../../../ottery-ui/containers/Frame";
import { usePing } from "../../../ottery-ping";
import { message, pfp } from "../../../assets/icons";

export function Home() {
    const navigator = useNavigator();
    const userState = useSelector(selectUserState);
    const {error} = usePing()

    const buttons = useMemo(()=>{
        const buttons = [
            {
                icon: {uri:pfp.src},
                title: "Account",
                onPress: ()=>{navigator(paths.main.user.dummyPage)}
            },
            {
                icon: {uri:message.src},
                title: "Messages",
                onPress: ()=>{console.log("goto messages")}
            },
            {
                icon: "NONE",
                title: "Notifications",
                onPress: ()=>{navigator(paths.main.social.notifications)}
            },

        ];

        if (userState === role.GUARDIAN) {

        } else  if (userState === role.CARETAKER) {
            buttons.push(
                {
                    icon: "clock",
                    title: "Clock out?",
                    onPress: ()=>{error("no")}
                },
            )
        }

        return buttons;
    }, [userState])
    
    return <Frame><ButtonMenu buttons={buttons}/></Frame>
}