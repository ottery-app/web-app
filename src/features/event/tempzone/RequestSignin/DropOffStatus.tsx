import { ChildRequestDto, requestStatus, requestType } from "@ottery/ottery-dto";
import { useGetRequests, useRemoveRequest } from "../tempzoneSlice";
import {useEffect, useState, useMemo} from "react";
import { useChildClient } from "../../../child/useChildClient";
import { Text } from "react-native-paper";
import { ImageButton } from "../../../../../ottery-ui/buttons/ImageButton";
import { Main } from "../../../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../../../ottery-ui/containers/ImageButtonList";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useTempzoneClient } from "../tempzoneClient";
import { requestsStatus } from "./requestsStatus.func";
import { SpinAnimation } from "../../../../../ottery-ui/animations/Spin.animation";
import Image from "../../../../../ottery-ui/image/Image";
import { roundSpinningOtter } from "../../../../../assets/otters";
import { useScreenDimensions } from "../../../../hooks/dimentions.hook";
import { API_ENV } from "../../../../env/api.env";
import {View, StyleSheet} from "react-native";
import { margin } from "../../../../../ottery-ui/styles/margin";
import { happyCheck, unhappyCheck } from "../../../../../assets/icons";
import Shadowbox from "../../../../../ottery-ui/containers/Shadowbox";

const styles = StyleSheet.create({
    infoContainer: {
        flex:1,
        flexDirection:"column",
        gap: margin.large,
        justifyContent: "center",
        alignItems: "center",
    },
    infoText: {
        textAlign: "center",
    }
});

const infoHeaderVarient = "titleLarge";

function useConsumeRequests() {
    const [requests, setRequests] = useState([]);
    const userId = useAuthClient().useUserId();
    const oldRequests = useGetRequests(request=>request.type === requestType.DROPOFF);
    const removeRequest = useRemoveRequest();
    useTempzoneClient().useGetRequestsForGuardian({
        inputs:[userId],
        onSuccess: (res)=>{
            setRequests(p=>[...p, ...res?.data || []]);
        },
        refetchInterval: API_ENV.query_delta,
    });

    useEffect(()=>{
        if (oldRequests.length) {
            oldRequests.forEach((request:ChildRequestDto)=>removeRequest(request.child));
            setRequests(p=>[...p, ...oldRequests]);
        }
    }, [oldRequests])

    const requestsMap = {}
    return requests.filter((request)=>{
        const result = !!!requestsMap[request.child];
        requestsMap[request.child] = true;
        return result;
    });
}

export function DropOffStatus() {
    const {width} = useScreenDimensions();
    const requests = useConsumeRequests();
    const status = useMemo(()=>requestsStatus(requests), [requests]);
    const [results, setResults] = useState([]);
    useChildClient().useGetChildren({
        inputs:[requests.map(r=>r.child)],
        onSuccess: (res)=>{
            setResults(res.data.map((child)=>{
                const request:ChildRequestDto = requests.find((request)=>request.child === child._id);
                let state = "default";

                if (request?.status === requestStatus.ACCEPTED) {
                    state="success"
                } else if (request?.status === requestStatus.REJECTED) {
                    state="error";
                }

                return (
                    <ImageButton state={state} right={child.pfp}>
                        <Text>{child.firstName} {child.lastName}</Text>
                    </ImageButton>
                );
            }))
        }
    });

    let infoDisplay = undefined;

    if (requestStatus.INPROGRESS === status) {
        infoDisplay = (
            <View style={styles.infoContainer}>
                <Text style={styles.infoText} variant={infoHeaderVarient}>Dropping off your kids...</Text>
                <SpinAnimation>
                    <Image 
                        src={roundSpinningOtter}
                        alt={"loding icon"}
                        height={width/2}
                        width={width/2}
                    />
                </SpinAnimation>
                <Text style={styles.infoText}>Almost ready</Text>
            </View>
        );
    } else if (requestStatus.REJECTED === status) {
        infoDisplay = (
            <View style={styles.infoContainer}>
                <Image 
                    src={unhappyCheck}
                    alt={"done icon"}
                    height={width/2}
                    width={width/2}
                />
                <Text style={styles.infoText} variant={infoHeaderVarient}>Looks like we ran into some issues!</Text>
                <Text style={styles.infoText}>Please talk to the event supervisor</Text>
            </View>
        );
    } else if (requestStatus.ACCEPTED === status) {
        infoDisplay = (
            <View style={styles.infoContainer}>
                <Image 
                    src={happyCheck}
                    alt={"done icon"}
                    height={width/2}
                    width={width/2}
                />
                <Text style={styles.infoText} variant={infoHeaderVarient}>All your kids are dropped off safe and sound</Text>
            </View>
        );
    }

    return (
        <Main style={{paddingTop: margin.large, gap:margin.large}}>
            {infoDisplay}
            <ImageButtonList>
                {results}
            </ImageButtonList>
        </Main>
    );
}