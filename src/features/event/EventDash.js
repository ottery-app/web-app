import SquareButtonList from "../../ottery-ui/lists/SquareButtonList";
import useSwapState from "../../hooks/useSwapState";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigator } from "../../hooks/useNavigator";
import paths from "../../router/paths";
import {getAttendeeStatus, getVolenteerStatus} from "./eventApi";
import { useAuthClient } from "../auth/useAuthClient";
import { useClipboard } from "../../hooks/useClipboard";

export function EventDash() {
    const copyText = useClipboard();
    const [state, switchState] = useSwapState({goHome:false});
    const navigator = useNavigator();
    const {eventId} = useParams();
    const {useUserId} = useAuthClient()
    const selfId = useUserId();
    const [buttons, setButtons] = useState([])
    
    useEffect(()=>{
        (async ()=>{
            const baseButtons = [
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
                            "Link coppied",
                            "Unable to copy link"
                        );
                    }
                },
            ];
    
            const volenteerButtons = [
                {
                    icon: "clock",
                    title: (state === "caretaker") ? "clock out" : "clock in",
                    onClick: ()=>{
                        switchState(eventId);
                    }
                },
            ];
    
            const attendeeButtons = [];

            let {data:isVolenteer} = await getVolenteerStatus(eventId, selfId);
            let {data:isAttendee} = await getAttendeeStatus(eventId, selfId);

            let buttons = baseButtons;
            if (isVolenteer) {
                buttons = [...buttons, ...volenteerButtons];
            }
            
            if (isAttendee) {
                buttons = [...buttons, ...attendeeButtons];
            }

            setButtons(buttons);
        })()
    }, []);


    return <SquareButtonList
        buttons={buttons}
    />;
}