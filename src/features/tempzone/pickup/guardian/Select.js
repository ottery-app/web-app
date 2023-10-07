import { Main } from "../../../../components/Main";
import Faded from "../../../../ottery-ui/text/Faded";
import { SelectChildren } from "../../../../components/SelectChildren";
import {Title} from "../../../../ottery-ui/text/Title";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useUserClient } from "../../../user/useUserClient";
import { useTempzoneClient } from "../../useTempzoneClient";
import { useState } from "react";

export function Select({onDone, mainFlow}) {
    const {useUserId} = useAuthClient()
    const userId = useUserId();
    const {useGetDroppedOffChildren} = useUserClient();
    const {usePickupChildren} = useTempzoneClient();
    const pickupChildren = usePickupChildren();
    const {data} = useGetDroppedOffChildren({inputs:[userId]});
    const children = data?.data 

    async function makePickupRequest(children) {
        let requests = [];
        for (let i = 0 ; i < children.length; i++) {
            requests.push({
                child: children[i]._id,
                guardian: userId,
                event: children[i].lastStampedLocation.at,
            });
        }

        const {data} = await pickupChildren.mutateAsync(requests);
        requests = data.map((request)=>{
            for (let i = 0; i < children.length; i++) {
                if (children[i]._id === request.child) {
                    request.child = children[i];
                    return request;
                }
            }

            return request;
        });

        return requests;
    }

    return (
        <Main>
            <Title>Select children to pick up</Title>
            <SelectChildren
                onDone={(children)=>{
                    makePickupRequest(children)
                        .then(requests=>{
                            onDone(mainFlow, {requests});
                        });
                }}
                children={children}
                //later we can offer the search for event tool
                htmlForNone={<Faded>You don't have any children to pick up</Faded>}
            />
        </Main>
    );
}