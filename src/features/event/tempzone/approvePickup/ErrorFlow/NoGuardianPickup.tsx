import { Text } from "react-native-paper";
import { Main } from "../../../../../../ottery-ui/containers/Main";
import { useAuthClient } from "../../../../auth/useAuthClient";
import { useChildClient } from "../../../../child/useChildClient";
import React, {useMemo, useState} from "react"
import Image from "../../../../../../ottery-ui/image/Image";
import { image } from "../../../../../../ottery-ui/styles/image";
import { CheckBox, CheckBoxMode } from "../../../../../../ottery-ui/input/CheckBox";
import { ButtonSpan } from "../../../../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../../../../ottery-ui/buttons/Button";
import { useRosterClient } from "../../useRosterClient";
import paths from "../../../../../router/paths";
import { useNavigator } from "../../../../../router/useNavigator";
import { usePing } from "../../../../../../ottery-ping";
import { radius } from "../../../../../../ottery-ui/styles/radius";
import { margin } from "../../../../../../ottery-ui/styles/margin";
import {View} from "react-native";
import { BUTTON_STATES } from "../../../../../../ottery-ui/buttons/button.enum";

export function NoGuardianPickup({route}) {
    const navigator = useNavigator();
    const childId = route.params.childId;
    const eventId = useAuthClient().useEventId();
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const child = useMemo(()=>childRes?.data?.data, [childRes]);
    const [contactedManager, setContactedManager] = useState(false);
    const [contactedGuardian, setContactedGuardian] = useState(false);
    const pickup = useRosterClient().usePickUp()
    const Ping = usePing();

    function handleDismiss() {
        pickup.mutate({
            eventId: eventId,
            childrenIds: [childId],
        }, {
            onSuccess: ()=>{
                navigator(paths.pickup.caretaker.root);
            },
            onError: ()=>{
                Ping.error("We ran into an issue here");
            }
        });
    }

    return <Main style={{
        gap:margin.large,
        alignItems:"center",
    }}>
        <Text variant="headlineSmall">{child?.firstName} {child?.lastName}</Text>
        <Image 
            radius={radius.round}
            src={child?.pfp}
            alt={"child profile"}
            height={image.largeProfile}
            width={image.largeProfile}
        />
        <Text variant="headlineSmall">I personally verify that:</Text>
        <View
            style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    gap: margin.large,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <CheckBox 
                    value={contactedManager} 
                    onChange={(v)=>setContactedManager(v)}
                    label={"I have contacted the event manager"}
                    mode={CheckBoxMode.default}
                />
                <CheckBox 
                    value={contactedGuardian} 
                    onChange={(v)=>setContactedGuardian(v)}
                    label={`I have contacted one of ${child?.firstName}'s guardians`}
                    mode={CheckBoxMode.default}
                />
            </View>
        </View>
        <ButtonSpan>
            <Button state={(!contactedGuardian || !contactedManager) ? BUTTON_STATES.disabled : pickup.status} onPress={handleDismiss}>Dismiss</Button>
        </ButtonSpan>
    </Main>
}