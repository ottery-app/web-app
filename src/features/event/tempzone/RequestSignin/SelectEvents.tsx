import { noId, requestType } from "@ottery/ottery-dto";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useGetRequests, useRemoveRequest, useUpdateRequest } from "../tempzoneSlice";
import { useEventClient } from "../../useEventClient";
import { useChildClient } from "../../../child/useChildClient";
import { useEffect, useMemo, useRef } from "react";
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
    const killPage = useRef(false);
    const navigator = useNavigator();
    const requests = useGetRequests(request=>request.type === requestType.DROPOFF).filter(request=>request.event === noId);
    const readyRequests = useGetRequests(request=>request.type === requestType.DROPOFF).filter(request=>request.event !== noId && !request._id);
    const removeRequest = useRemoveRequest();
    const updateReqeust = useUpdateRequest();
    //take the top. On refresh
    const childRes = useChildClient().useGetChild({inputs:[requests[0]?.child], enabled:!!requests.length});
    const child = childRes?.data?.data;


    function addEventToRequest(eventId) {
        console.log('adding event to request');
        updateReqeust({
            ...requests[0],
            event: eventId,
        });
    }

    const eventsRes = useEventClient().useGetEvents({
        inputs:[child?.events],
        enabled:!!child,
        onSuccess:(res)=>{
            if (res?.data?.length === 1) {
                addEventToRequest(res.data[0]._id);
            }
        }
    });

    const events = eventsRes?.data?.data;
    const [selected, setSelected] = useState(noId);

    const dropOff = useTempzoneClient().useMakeChildRequest();

    useEffect(()=>{
        if (killPage.current === false) {
            if (requests.length === 0) {
                killPage.current = true;
                dropOff.mutate(readyRequests, {
                    onSuccess:(res:any)=>{
                        res.data.forEach(request=>updateReqeust(request));
                        navigator(paths.dropoff.guardian.status);
                    }
                })
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
                <Button onPress={()=>{
                    addEventToRequest(selected)
                }}>Drop off</Button>
            </ButtonSpan>
        </Main>
    );
}