import { ChildRequestDto, noId, requestStatus, requestType } from "@ottery/ottery-dto";
import { useGetRequests, useRemoveRequest } from "../tempzoneSlice";
import {useEffect, useState} from "react";
import { useChildClient } from "../../../child/useChildClient";
import { Text } from "react-native-paper";
import { ImageButton } from "../../../../../ottery-ui/buttons/ImageButton";
import { Main } from "../../../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../../../ottery-ui/containers/ImageButtonList";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useTempzoneClient } from "../tempzoneClient";

function useConsumeRequests() {
    const [requests, setRequests] = useState([]);
    const userId = useAuthClient().useUserId();
    const oldRequests = useGetRequests(request=>request.type === requestType.DROPOFF);
    const removeRequest = useRemoveRequest();
    useTempzoneClient().useGetRequestsForGuardian({
        inputs:[userId],
        onSuccess: (res)=>{
            console.log(res);
            setRequests(p=>[...p, ...res?.data || []]);
        }
    });

    useEffect(()=>{
        if (oldRequests.length) {
            oldRequests.forEach((request:ChildRequestDto)=>removeRequest(request.child));
            setRequests(p=>[...p, ...oldRequests]);
        }
    }, [oldRequests])

    return requests;
}

export function DropOffStatus() {
    const reqeusts = useConsumeRequests();
    const [results, setResults] = useState([]);
    useChildClient().useGetChildren({
        inputs:[reqeusts.map(r=>r.child)],
        onSuccess: (res)=>{
            setResults(res.data.map((child)=>{
                const request:ChildRequestDto = reqeusts.find((request)=>request.child === child._id);
                let state = "default";

                if (request?.status === requestStatus.ACCEPTED) {
                    state="success"
                } else if (request?.status === requestStatus.REJECTED) {
                    state="error";
                }

                return (
                    <ImageButton state={state}>
                        <Text>{child.firstName} {child.lastName}</Text>
                    </ImageButton>
                );
            }))
        }
    });

    return (
        <Main>
            <ImageButtonList>
                {results}
            </ImageButtonList>
        </Main>
    );
}