import { noId, requestType } from "@ottery/ottery-dto";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useGetRequests, useRemoveRequest, useUpdateRequest } from "../tempzoneSlice";
import { useEventClient } from "../../useEventClient";
import { useChildClient } from "../../../child/useChildClient";
import { useEffect } from "react";
import { useNavigator } from "../../../../router/useNavigator";
import paths from "../../../../router/paths";
import {useState} from "react";
import { ImageButtonList } from "../../../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../../../ottery-ui/buttons/ImageButton";
import { Text } from "react-native-paper";
import { Main } from "../../../../../ottery-ui/containers/Main";
import { ButtonSpan } from "../../../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../../../ottery-ui/buttons/Button";
import { useTempzoneClient } from "../tempzoneClient";

export function SelectEvents() {
    const navigator = useNavigator();
    const requests = useGetRequests(request=>request.type === requestType.DROPOFF).filter(request=>request.event === noId);
    const readyRequests = useGetRequests(request=>request.type === requestType.DROPOFF).filter(request=>request.event !== noId);
    const removeRequest = useRemoveRequest();
    const updateReqeust = useUpdateRequest();
    //take the top. On refresh
    const childRes = useChildClient().useGetChild({inputs:[requests[0]?.child], enabled:!!requests.length});
    const child = childRes?.data?.data;
    const eventsRes = useEventClient().useGetEvents({inputs:[child?.events], enabled:!!child});
    const events = eventsRes?.data?.data;
    const [navigated, setNavigated] = useState(false);
    const [selected, setSelected] = useState(noId);

    const dropOff = useTempzoneClient().useDropOffChildren();

    function addEventToRequest(eventId) {
        updateReqeust({
            ...requests[0],
            event: eventId,
        })
    }

    useEffect(()=>{
        if (events?.length === 1) { 
            addEventToRequest(events[0]._id);
        }
    }, [eventsRes]);

    useEffect(()=>{
        if (navigated===false) {
            if (requests.length === 0) {
                dropOff.mutate(readyRequests, {
                    onSuccess: (res:any)=>{
                        res?.data.forEach((request)=>{
                            updateReqeust(request); //JUST LINKE THE MUTATE INTERNALLY
                        })
                        navigator(paths.dropoff.guardian.status);
                    },
                })
                setNavigated(true);
            }
        }
    }, [requests])

    if (child === undefined || events === undefined) { 
        return;
    }

    return (
        <Main>
            <Text variant="titleMedium" style={{textAlign:"center"}}>Which event are you dropping {child?.firstName} off at?</Text>
            <ImageButtonList>
                {events?.map((event)=>
                    <ImageButton 
                        key={event._id}
                        onPress={()=>setSelected(event._id)}
                        state={event._id === selected && "success"}
                    >
                        <Text>{event.summary}</Text>
                    </ImageButton>
                )}
            </ImageButtonList>
            <ButtonSpan>
                <Button onPress={()=>addEventToRequest(selected)}>Drop off</Button>
            </ButtonSpan>
        </Main>
    );
}