
import { SelectSignUpTypes } from "./SelectSignUpTypes";
import { QueueForm } from "../../../ottery-ui/forms/QueueForm";
import { VolenteerSignUp } from "./VolenteerSignUp";
import { ChildSignUp } from "./ChildSignUp";
import { DoneSignUp } from "./DoneSignUp";
import { signUps } from "./signUp.enum";
import { FillMissingData } from "./FillMissingData";
import {addDataByOwner} from "../../data/dataApi";
import { Ping } from "../../../ottery-ping/Ping";
import { signUpAttendeesByIds, signUpVolenteersByIds, getInfo } from "../eventApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import paths from "../../../router/paths";
import useSwapState from "../../../hooks/useSwapState";
import { useNavigator } from "../../../hooks/useNavigator";

export function EventSignUp() {
    const {eventId} = useParams();
    const userId = useSelector(store => store.auth.sesh.userId);
    const [state] = useSwapState();
    const navigator = useNavigator();

    let run = 0;
    useEffect(()=>{
        run++;
        if (!run) {
            getInfo(eventId)
            .catch(()=>{
                Ping.error("this event does not exist anymore");
                navigator(paths[state].home);
            });
        }
    }, []);

    return(
        <QueueForm
            onSubmit={async (form)=>{
                try {
                    const dataKeys = (form.data) ? Object.keys(form.data) : [];

                    for (let i = 0 ; i < dataKeys.length; i++) {
                        await addDataByOwner(dataKeys[i], form.data[dataKeys[i]]);
                    }
    
                    if (form.volenteering) {
                        await signUpVolenteersByIds(eventId, [userId]);
                    }
    
                    if (form.children && form.children.length) {
                        await signUpAttendeesByIds(eventId, form.children.map(c=>c._id));
                    }
                } catch (e) {
                    Ping.error(e.message);
                }
            }}
            initTodo={[signUps.SELECTING]}
            pages={[
                {
                    key: signUps.SELECTING,
                    page: SelectSignUpTypes,
                    //ideal next not needed since its dependednt on internals
                },
                {
                    key: signUps.VOLENTEER,
                    page: VolenteerSignUp,
                    mainFlow: [signUps.FILLMISSING]
                },
                {
                    key: signUps.CHILD,
                    page: ChildSignUp,
                    mainFlow: [signUps.FILLMISSING]
                },
                // {
                //     key: signUps.CONFIRMDATA,
                //     page: ConfirmData,
                //     mainFlow: [signUps.FILLMISSING]
                // },
                {
                    key: signUps.FILLMISSING,
                    page: FillMissingData,
                    mainFlow: [signUps.DONE]
                },
                // {
                //     key: signUps.COST,
                //     page: CostSignUp,
                //     mainFlow: [signUps.DONE]
                // },
                {
                    key: signUps.DONE,
                    page: DoneSignUp,
                    trailing: true,
                }
            ]}
        />
    );
}