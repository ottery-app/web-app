import { useEffect } from "react";
import { Main } from "../../../../components/Main";
import { useState } from "react";
import Faded from "../../../../ottery-ui/text/Faded";
import { SelectChildren } from "../../../../components/SelectChildren";
import {Title} from "../../../../ottery-ui/text/Title";
import {getDroppedOffChildren} from "../../../user/userApi";
import { pickUpChildren } from "../../tempzoneApi";
import { useAuthClient } from "../../../auth/useAuthClient";

export function Select({onDone, mainFlow}) {
    const {useUserId} = useAuthClient()
    const userId = useUserId();
    const [children, setChildren] = useState([]);
    
    useEffect(()=>{
        getDroppedOffChildren(userId).then((res)=>{
            setChildren(res.data);
        });
    }, []);

    async function makePickupRequest(children) {
        let requests = [];
        for (let i = 0 ; i < children.length; i++) {
            requests.push({
                child: children[i]._id,
                guardian: userId,
                event: children[i].lastStampedLocation.at,
            });
        }

        const {data} = await pickUpChildren(requests)
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

    return <Main>
        <Title>Select children to pick up</Title>
        <SelectChildren
            onDone={(children)=>{
                makePickupRequest(children)
                    .then(requests=>{
                        onDone(mainFlow, {requests});
                    });
            }}
            children={children}
            setChildren={setChildren}
            //later we can offer the search for event tool
            htmlForNone={<Faded>You don't have any children to pick up</Faded>}
        />
    </Main>;
}