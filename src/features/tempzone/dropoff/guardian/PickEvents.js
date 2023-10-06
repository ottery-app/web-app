import { noId } from "ottery-dto";
import { useEffect, useState } from "react";
import { Main } from "../../../../components/Main";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import {Title} from "../../../../ottery-ui/text/Title";
import { margin } from "../../../../ottery-ui/styles/margin";
import styled from "styled-components";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useEventClient } from "../../../event/useEventClient";
import { AwaitLoad } from "../../../../guards/AwaitLoad";
import {usePing} from "../../../../ottery-ping";

const Events = styled.div`
    display:flex;
    flex-direction: column;
    gap: ${margin.medium};
`;

export function PickEvents({form, mainFlow, subFlow, onDone}) {
    const Ping = usePing();
    const {useUserId} = useAuthClient()
    const {useGetEvents} = useEventClient();
    const userId = useUserId();
    const [child, setChild] = useState();

    const {data:events, status} = useGetEvents({
        inputs: [child?._id],
        enabled: !!child,
    });

    const helperOnDone = (request) => {
        let requests = form.requests || [];
        requests.push(request);

        const updatedForm = {...form, requests}

        if (request && updatedForm.children.length === 0) {
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
                Ping.error(`${child.firstName} is not enrolled in any events`);
                
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
            }

            helperOnDone(request);
        }
    }, []);

    return (
        <AwaitLoad status={status}>
            <Main>
                <Title>Which event are you dropping {child?.firstName + " " + child?.lastName} off at?</Title>
                <Events>
                    {events?.map((event, i)=>{
                        return <ImageButton 
                            key={i}
                            content={event.summary}
                            onClick={()=>{
                                helperOnDone({
                                    child: child,
                                    guardian: userId,
                                    event: event?._id,
                                })
                            }}
                        />
                    })}
                </Events>
            </Main>
        </AwaitLoad>
    );
}