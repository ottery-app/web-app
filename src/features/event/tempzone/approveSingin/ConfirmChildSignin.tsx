import { Main } from "../../../../../ottery-ui/containers/Main";
import Image from "../../../../../ottery-ui/image/Image";
import { useChildClient } from "../../../child/useChildClient";
import { useEventClient } from "../../useEventClient";
import { useUserClient } from "../../../user/useUserClient";
import { image } from "../../../../../ottery-ui/styles/image";
import { radius } from "../../../../../ottery-ui/styles/radius";
import { Text } from "react-native-paper";
import { ButtonSpan } from "../../../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../../../ottery-ui/buttons/Button";
import { useNavigator } from "../../../../router/useNavigator";
import paths from "../../../../router/paths";
import { useTempzoneClient } from "../tempzoneClient";
import { requestType } from "@ottery/ottery-dto";
import { usePing } from "../../../../../ottery-ping";
import { margin } from "../../../../../ottery-ui/styles/margin";
import React from "react";

export function ConfirmChildSignin({route}){
    const navigator = useNavigator();
    const eventId = route.params.eventId;
    const childId = route.params.childId;
    const guardianId = route.params.guardianId;
    const child = useChildClient().useGetChild({inputs:[childId]})?.data?.data;
    //const event = useEventClient().useGetEvent({inputs:[eventId]})?.data?.data;
    const guardian = useUserClient().useGetUserInfo({inputs:[guardianId]})?.data?.data[0];
    const accept = useTempzoneClient().useAcceptChildRequest();
    const Ping = usePing();

    const requestsRes = useTempzoneClient().useGetWaitingChildrenForEvent({
        inputs:[eventId, requestType.DROPOFF],
    });

    function handleDeline() {
        navigator(paths.dropoff.caretaker.decline, {
            eventId,
            childId,
            guardianId,
        })
    }

    function handleAccept() {
        const reqeuest = requestsRes?.data?.data.find((r)=>r.child === childId);
        accept.mutate(reqeuest, {
            onSuccess:()=>{navigator(paths.dropoff.caretaker.root)},
            onError:()=>{Ping.error("We ran into some issues")}
        })
    }

    return (
        <Main style={{
            //flex:1,
            //justifyContent: "center",
            alignItems: "center",
            gap: margin.small,
        }}>
            <Text variant="headlineSmall">{child?.firstName} {child?.lastName}</Text>
            <Image
                src={child?.pfp}
                height={image.largeProfile}
                width={image.largeProfile}
                radius={radius.round}
                alt={"child photo"}
            />
            <Text variant="headlineSmall">Requested by:</Text>
            <Text variant="headlineSmall">{guardian?.firstName} {guardian?.lastName}</Text>
            <Image
                src={guardian?.pfp}
                height={image.largeProfile}
                width={image.largeProfile}
                radius={radius.round}
                alt={"guardian photo"}
            />
            <ButtonSpan>
                <Button state="error" onPress={handleDeline}>Decline</Button>
                <Button state="success" onPress={handleAccept}>Accept</Button>
            </ButtonSpan>
        </Main>
    );
    
    //JSON.stringify([childId, eventId]);
}