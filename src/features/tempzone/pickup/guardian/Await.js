import { Main } from "../../../../components/Main"
import Image from "../../../../ottery-ui/images/Image";
import { roundOtterFullBody } from "../../../../assets/images/otters";
import { Title } from "../../../../ottery-ui/text/Title";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { useEffect, useMemo, useState } from "react";
import { checkRequestsStatus } from "../../tempzoneApi";
import { requestStatus } from "ottery-dto";
import { API_ENV } from "../../../../env/api.env";
import delay from "delay";

export function Await({form, onDone, mainFlow}) {
    const interval = useMemo(
        ()=>setInterval(async ()=>{
            const {data} = await checkRequestsStatus(form.requests.map(({child})=>child._id));
            let dones = 0;

            if (dones === data.length) {
                data.forEach((request)=>{
                    if (request.status !== requestStatus.INPROGRESS) {
                        dones++;
                    }

                    for (let {child} of form.requests) {
                        if (child._id === request.child) {
                            request.child = child;
                        }
                    }
                });


                onDone(mainFlow, {
                    requests: data,
                });
            }
        },
        API_ENV.query_delta,
    ), [form]);

    useEffect(()=>()=>clearInterval(interval), [interval]);

    return <Main>
        <Image
            src={roundOtterFullBody}
            width={"100%"}
            animation={"spin"}
        />
        <Title>Getting your kids off the raft. Hold on.</Title>
        {form.requests.map(({child})=>{
            try {
                return <ImageButton
                    key={child._id}
                    content={child.firstName}
                    right={"pfp" && child.pfp.src}
                />
            } catch (e) {
            }
        })}
    </Main>
}