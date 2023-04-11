import { Main } from "../../../../components/Main"
import Image from "../../../../ottery-ui/images/Image";
import { roundOtterFullBody } from "../../../../assets/images/otters";
import { Title } from "../../../../ottery-ui/text/Title";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { useEffect, useState } from "react";
import { checkRequestsStatus } from "../../tempzoneApi";
import { requestStatus } from "ottery-dto";

export function Await({form, onDone, mainFlow}) {
    const [requests, setRequests] = useState([]);
    const children = new Map();
    form.requests.forEach(({child})=>{
        children.set(child._id, child);
    });

    useEffect(()=>{
        setRequests(form.requests);
    }, [form]);
    
    useEffect(()=>{
        if (requests.length) {
            setTimeout(async ()=>{
                const {data} = await checkRequestsStatus(requests.map(({child})=>child._id));

                let dones = 0;
                data.forEach((request)=>{
                    if (request.status === requestStatus.ACCEPTED) {
                        dones++;
                    }
                    request.child = children.get(request.child);
                });


                if (dones === data.length) {
                    onDone(mainFlow, {
                        requests: data,
                    });
                } else {
                    setRequests([...data]);
                }
            }, 1000);
        }
    },[requests]);

    console.log(requests);
    return <Main>
        <Image
            src={roundOtterFullBody}
            width={"100%"}
            animation={"spin"}
        />
        <Title>Getting your kids off the raft. Hold on.</Title>
        {requests.map(({child})=>{
            return <ImageButton
                key={child._id}
                content={child.firstName}
                right={"pfp" && child.pfp.src}
            />
        })}
    </Main>
}