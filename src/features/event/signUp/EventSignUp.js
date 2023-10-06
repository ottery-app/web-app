
import { SelectSignUpTypes } from "./SelectSignUpTypes";
import { QueueForm } from "../../../ottery-ui/forms/QueueForm";
import { VolenteerSignUp } from "./VolenteerSignUp";
import { ChildSignUp } from "./ChildSignUp";
import { DoneSignUp } from "./DoneSignUp";
import { signUps } from "./signUp.enum";
import { FillMissingData } from "./FillMissingData";
import { usePing } from "../../../ottery-ping";
import { useParams } from "react-router-dom";
import paths from "../../../router/paths";
import { useNavigator } from "../../../hooks/useNavigator";
import {useEventClient} from "../useEventClient";
import {useAuthClient} from "../../auth/useAuthClient";
import {useDataClient} from "../../data/useDataClient";

export function EventSignUp() {
    const {
        useGetEventInfo,
        useSignUpAttendeesByIds,
        useSignUpVolenteersByIds
    } = useEventClient();
    const {
        useUserId,
        useSwapState,
    } = useAuthClient();
    const {
        useAddDataByOwner
    } = useDataClient();

    const {eventId} = useParams();
    const [state] = useSwapState();
    const navigator = useNavigator();
    const userId = useUserId();
    const Ping = usePing();

    useGetEventInfo({
        inputs:[eventId],
        onError: ()=>{
            Ping.error("this event does not exist anymore");
            navigator(paths[state].home);
        }
    });

    const signUpVolenteersByIds = useSignUpVolenteersByIds();
    const signUpAttendeesByIds = useSignUpAttendeesByIds();
    const addDataByOwner = useAddDataByOwner();

    return(
        <QueueForm
            onSubmit={async (form)=>{
                try {
                    const dataKeys = (form.data) ? Object.keys(form.data) : [];

                    for (let i = 0 ; i < dataKeys.length; i++) {
                        await addDataByOwner.mutate(dataKeys[i], form.data[dataKeys[i]]);
                    }
    
                    if (form.volenteering) {
                        await signUpVolenteersByIds.mutate(eventId, [userId]);
                    }
    
                    if (form.children && form.children.length) {
                        await signUpAttendeesByIds.mutate(eventId, form.children.map(c=>c._id));
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