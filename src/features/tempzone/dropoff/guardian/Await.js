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

export function Await({form, onDone, mainFlow}) {
    const [requests, setRequests] = useState([]);
    let run = 0;

    useEffect(()=>{
        const requests = form.requests.map((request)=>{
            return {
                ...request,
                child: request.child._id
            }
        })

        if (run === 0) {
            dropOffChildren(requests)
                .then(res=>{
                    setRequests(res.data);
                }).catch(err=>{
                    Ping.error(err.message)
                });

            run++;
        }
    },[]);

    useEffect(()=>{
        if (requests.length) {
            setTimeout(()=>{
                const ids = requests
                    .filter((request)=>request.status === requestStatus.INPROGRESS)
                    .map((request)=>request.child); 

                if (ids.length) {
                    checkRequestsStatus(ids)
                        .then((res)=>{
                            let droppedOff = 0;
                            let update = res.data.map((request)=>{
                                if (request.status === requestStatus.ACCEPTED) {
                                    droppedOff++;
                                }

                                for (let i = 0 ; i < res.data.length; i++) {
                                    if (res.data[i].child === request.child) {
                                        return res.data[i];
                                    }
                                }
                                return request;
                            });

                            if (droppedOff === requests.length) {
                                update = update.map((responce)=>{
                                    for (let i = 0; i < form.requests.length; i++) {
                                        if (responce.child === form.requests[i].child._id) {
                                            return {
                                                ...responce,
                                                child: form.requests[i].child,
                                            }
                                        }
                                    }
                                })

                                onDone(mainFlow, {
                                    requests: [],
                                    responces: update,
                                })
                            }

                            setRequests(update);
                        });
                }
            }, API_ENV.query_delta);
        }
    }, [requests]);

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