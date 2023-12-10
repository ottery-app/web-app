import { Main } from "../../../../../../ottery-ui/containers/Main";
import Image from "../../../../../../ottery-ui/image/Image";
import { useChildClient } from "../../../../child/useChildClient";
import { useUserClient } from "../../../../user/useUserClient";
import { image } from "../../../../../../ottery-ui/styles/image";
import { radius } from "../../../../../../ottery-ui/styles/radius";
import { Text } from "react-native-paper";
import { ButtonSpan } from "../../../../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../../../../ottery-ui/buttons/Button";
import { useNavigator } from "../../../../../router/useNavigator";
import paths from "../../../../../router/paths";
import { usePing } from "../../../../../../ottery-ping";
import { margin } from "../../../../../../ottery-ui/styles/margin";
import { useRosterClient } from "../../useRosterClient";

export function NoRequestPickup({route}){
    const navigator = useNavigator();
    const eventId = route.params.eventId;
    const childId = route.params.childId;
    const guardianId = route.params.guardianId;
    const child = useChildClient().useGetChild({inputs:[childId]})?.data?.data;
    const guardian = useUserClient().useGetUserInfo({inputs:[guardianId]})?.data?.data[0];
    const pickup = useRosterClient().usePickUp();
    const Ping = usePing();

    function handleAccept() {
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

    return (
        <Main style={{
            flex:1,
            justifyContent: "center",
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
            <Text variant="headlineSmall">Dissmissing with:</Text>
            <Text variant="headlineSmall">{guardian?.firstName} {guardian?.lastName}</Text>
            <Image
                src={guardian?.pfp}
                height={image.largeProfile}
                width={image.largeProfile}
                radius={radius.round}
                alt={"guardian photo"}
            />
            <ButtonSpan>
                <Button state="success" onPress={handleAccept}>Dissmiss</Button>
            </ButtonSpan>
        </Main>
    );
}