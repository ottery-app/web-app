import { useSelector } from "react-redux";
import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu"
import { useNavigator } from "../../router/useNavigator";
import { selectUserState } from "../auth/authSlice";
import { useMemo } from "react";
import paths from "../../router/paths";
import { role } from "@ottery/ottery-dto";
import { Frame } from "../../../ottery-ui/containers/Frame";

export function Home() {
    const navigator = useNavigator();
    const userState = useSelector(selectUserState); 

    const buttons = useMemo(()=>{
        const buttons = [
            {
                icon: "account",
                title: "Account",
                onPress: ()=>{navigator(paths.user.profile)}
            },
            {
                icon: "message",
                title: "Messages",
                onPress: ()=>{navigator(paths.social.messages)}
            }
        ];

        if (userState === role.GUARDIAN) {

        } else  if (userState === role.CARETAKER) {
            buttons.push(
                {
                    icon: "clock",
                    title: "Clock out?",
                    onPress: ()=>{console.log("no")}
                },
            )
        }

        return buttons;
    }, [userState])
    
    return <Frame><ButtonMenu buttons={buttons}/></Frame>
}