import { Main } from "../../../../components/Main";
import { Title } from "../../../../ottery-ui/text/Title";
import { getWatingChildrenFor } from "../../tempzoneApi";
import { useEffect, useState } from "react";
import {Ping} from "../../../../ottery-ping/Ping";
import { useSelector } from "react-redux";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { requestType } from "ottery-dto";
import Faded from "../../../../ottery-ui/text/Faded";
import * as delay from "delay";
import { API_ENV } from "../../../../env/api.env";

export function Awaiting({form, mainFlow, onDone}) {
    const eventId = useSelector(store=>store.auth.sesh.event);
    const [requests, setRequests] = useState([]);

    useEffect(()=>{
        (async ()=>{
            try {
                if (requests) {
                    await delay(API_ENV.query_delta);
                }

                const res = await getWatingChildrenFor(eventId, requestType.PICKUP);
                setRequests(res.data);

            } catch (e) {
                Ping.error(e.message);
            }
        })()
    },[requests]);

    return <Main>
        {requests.length 
            ? <Title>Waiting to get picked up</Title>
            : <Faded>No kids waiting to be picked up</Faded>
        }
        {requests.map((request,i)=>
            <ImageButton
                key={i}
                right={"pfp" && request.child.pfp.src}
                content={request.child.firstName}
                onClick={()=>{
                    onDone(mainFlow, {...form, request});
                }}
            />
        )}
    </Main>
}