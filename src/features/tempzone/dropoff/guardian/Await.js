import { Main } from "../../../../components/Main"
import Image from "../../../../ottery-ui/images/Image";
import { roundOtterFullBody } from "../../../../assets/images/otters";
import { Title } from "../../../../ottery-ui/text/Title";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { useEffect, useState } from "react";
import {Ping} from "../../../../ottery-ping/Ping";
import { dropOffChildren, checkRequestsStatus } from "../../tempzoneApi";
import { requestStatus } from "ottery-dto";
import { API_ENV } from "../../../../env/api.env";
import { useTempzoneClient } from "../../useTempzoneClient";

function formatRequest(request) {
    return {
        ...request,
        child: request.child._id
    }
}

function getIdsFromRequests(requests) {
    return requests
        .filter((request)=>request.status === requestStatus.INPROGRESS)
        .map((request)=>request.child); 
}

export function Await({form, onDone, mainFlow}) {
    console.log(form);
    debugger;
    const [requests, setRequests] = useState(form.requests.map(formatRequest));
    const {useDropOffChildren, useCheckRequestsStatus} = useTempzoneClient();
    const {mutate:dropOffChildren} = useDropOffChildren();
    useCheckRequestsStatus({
        inputs:[getIdsFromRequests(requests)],
        refetchInterval: API_ENV.query_delta,
        refetchIntervalInBackground: true,
        onSuccess: (res)=>{
            setRequests(res.data);

            let dones = res.data.map((request)=>request.status === requestStatus.ACCEPTED || request.status === requestStatus.REJECTED);

            if (dones.length && dones.every(s=>s)) {
                const responces = res.data.map((responce)=>{
                    for (let i = 0; i < form.requests.length; i++) {
                        if (responce.child === form.requests[i].child._id) {
                            return {
                                ...responce,
                                child: form.requests[i].child,
                            }
                        }
                    }
                });

                onDone(mainFlow, {
                    requests: [],
                    responces: responces,
                })
            }
        },
    })

    useEffect(()=>{
        dropOffChildren(requests, {
            onSuccess: (res)=>setRequests(res.data),
            onError: (err)=>Ping.error(err.message)
        });
    },[]);

    return <Main>
        <Image
            src={roundOtterFullBody}
            width={"100%"}
            animation={"spin"}
        />
        <Title>Getting your kids on the raft. Hold on.</Title>
        {form.requests.map(({child})=>{
            return <ImageButton
                key={child._id}
                content={child.firstName}
                right={"pfp" && child.pfp.src}
            />
        })}
    </Main>
}