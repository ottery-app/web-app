import { copyText } from "../../functions/clipboard";
import SquareButtonList from "../../ottery-ui/lists/SquareButtonList";
import useSwapState from "../../hooks/useSwapState";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigator } from "../../hooks/useNavigator";
import paths from "../../router/paths";

export function EventDash() {
    const [state, switchState] = useSwapState({goHome:false});
    const navigator = useNavigator();
    const {eventId} = useParams();
    const [buttons, setButtons] = useState([
        {
            icon: "info",
            title: "details",
            onClick: ()=>{
                navigator(paths.event.info, {eventId});
            }
        },
        {
            icon: "share",
            title: "share",
            onClick: ()=>{
                copyText(
                    window.location.href,
                    "link coppied",
                    "unable to copy link"
                );
            }
        },
        // {
        //     icon: "team",
        //     title: "members",
        //     onClick: ()=>{
        //         Ping.alert("not implemented");
        //     }
        // },
        // {
        //     icon: "calendar",
        //     title: "schedule",
        //     onClick: ()=>{
        //         Ping.alert("not implemented");
        //     }
        // },
        {
            icon: "clock",
            title: (state === "caretaker") ? "clock out" : "clock in",
            onClick: ()=>{
                switchState(eventId);
            }
        },
        // {
        //     icon: "settings",
        //     title: "options",
        //     onClick: ()=>{
        //         Ping.alert("not implemented");
        //     }
        // } 
    ]);

    console.warn("this is problematic since it shows the same thing for both volenteers and regular parents");

    return <SquareButtonList
        buttons={buttons}
    />;
}