import { noId } from "ottery-dto";
import { useEffect, useState } from "react";
import { Main } from "../../../../components/Main";
import { getEvents } from "../../../event/eventApi";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import {Title} from "../../../../ottery-ui/text/Title";
import { margin } from "../../../../ottery-ui/styles/margin";
import styled from "styled-components";
import { useAuthClient } from "../../../auth/useAuthClient";

const Events = styled.div`
    display:flex;
    flex-direction: column;
    gap: ${margin.medium};
`;

export function PickEvents({form, mainFlow, subFlow, onDone}) {
    const {useUserId} = useAuthClient()
    const userId = useUserId();
    const [events, setEvents] = useState([]);
    const [child, setChild] = useState({});

    const helperOnDone = (request) => {
        const updatedForm = {
            ...form,
            requests:[...form.requests || [], request],
        }

        if (request && !updatedForm.children.length) {
            onDone(mainFlow, updatedForm);
        } else if (request) {
            onDone(subFlow, updatedForm);
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

            //helperOnDone(request);
        }
    }, []);

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