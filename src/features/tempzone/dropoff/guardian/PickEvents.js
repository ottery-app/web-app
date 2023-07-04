import { noId } from "ottery-dto";
import { useEffect, useState } from "react";
import { Main } from "../../../../components/Main";
import { useUserId } from "../../../../hooks/useUserId";
import { getEvents } from "../../../event/eventApi";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import {Title} from "../../../../ottery-ui/text/Title";
import { margin } from "../../../../ottery-ui/styles/margin";
import styled from "styled-components";

const Events = styled.div`
    display:flex;
    flex-direction: column;
    gap: ${margin.medium};
`;

export function PickEvents({form, mainFlow, subFlow, onDone}) {
    const userId = useUserId();
    const [events, setEvents] = useState([]);
    const [child, setChild] = useState({});

    function helperOnDone(request) {
        const requests = form.requests || [];

        if (request && !form.children.length) {
            onDone(mainFlow, {requests:[...requests, request]});
        } else if (request) {
            onDone(subFlow, {requests:[...requests, request]});
        }
    }

    useEffect(()=>{
        if (form.children.length) {
            const child = form.children.pop();
            setChild(child);
            let request;

            if (child.events.length === 0) { //the child is not enrolled...
                request = {
                    event: noId,
                    child: child,
                    guardian: userId,
                }
            } else if (child.events.length === 1) { //we can skip showing the user anything if the child has one event
                request = {
                    event: child.events[0],
                    child: child,
                    guardian: userId,
                };           
            } else {
                getEvents(child.events).then(res=>{setEvents(res.data)});
            }

            helperOnDone(request);
        }
    }, []);

    console.log(events);

    return <Main>
        <Title>Which event are you dropping {child.firstName + " " + child.lastName} off at?</Title>
        <Events>
            {events.map((event, i)=>{
                return <ImageButton 
                    key={i}
                    content={event.summary}
                    onClick={()=>{
                        helperOnDone({
                            child: child,
                            guardian: userId,
                            event: event._id,
                        })
                    }}
                />
            })}
        </Events>
    </Main>
}