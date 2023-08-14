import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import paths from "../router/paths";
import SquareButtonList from "../ottery-ui/lists/SquareButtonList";
import { useNavigator } from "../hooks/useNavigator";

export default function Home() {
    const sesh = useSelector(store=>store.auth.sesh);
    const navigator = useNavigator();
    const [buttons, setButtons] = useState([]);

    useEffect(()=>{
        const both = [
            {
                icon: "user",
                title: "account",
                onClick: ()=>{navigator(paths.user.profile, {userId: sesh.userId})}
            },
            {
                icon: "bell",
                title: "notifications",
                onClick: ()=>{navigator(paths.social.notifications)}
            },
            {
                icon: "msg",
                title: "messages",
                onClick: ()=>{navigator(paths.social.messages)}
            }
        ]

        //could switch these to guards in the future
        if (sesh.state === "guardian") {
            setButtons([
                ...both,
                // {
                //     icon: "calendar",
                //     title: "calendar",
                //     onClick: ()=>{navigator("./tbd")}
                // },
                // {
                //     icon: "search",
                //     title: "explore",
                //     onClick: ()=>{navigator("./tbd")}
                // },
            ]);
        } else if (sesh.state === "caretaker") {
            setButtons([
                ...both,
                // {
                //     icon: "search",
                //     title: "class info",
                //     onClick: ()=>{navigator("./tbd")}
                // },
                // {
                //     icon: "calendar",
                //     title: "schedule",
                //     onClick: ()=>{navigator("./tbd")}
                // },
                // {
                //     icon: "team",
                //     title: "members",
                //     onClick: ()=>{navigator("./tbd")}
                // },
            ]);
        }
    }, [sesh]);
    
    return (
        <SquareButtonList buttons={buttons}/>
    );
}