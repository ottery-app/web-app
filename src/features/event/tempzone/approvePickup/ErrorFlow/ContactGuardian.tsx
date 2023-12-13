import { useChildClient } from "../../../../child/useChildClient"
import {useMemo} from "react";
import { useUserClient } from "../../../../user/useUserClient";
import { Main, MarginlessMain } from "../../../../../../ottery-ui/containers/Main";
import { IconHeader } from "../../../../../../ottery-ui/headers/IconHeader";
import { ImageButtonList } from "../../../../../../ottery-ui/containers/ImageButtonList";
import { Text } from "react-native-paper";
import { ImageButton } from "../../../../../../ottery-ui/buttons/ImageButton";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { clickable } from "../../../../../../ottery-ui/styles/clickable";
import { radius } from "../../../../../../ottery-ui/styles/radius";
import { margin } from "../../../../../../ottery-ui/styles/margin";
import Image from "../../../../../../ottery-ui/image/Image";
import { message } from "../../../../../../assets/icons";
import paths from "../../../../../router/paths";
import { useNavigator } from "../../../../../router/useNavigator";
import { useAuthClient } from "../../../../auth/useAuthClient";
import { useChatClient } from "../../../../chat/useChatClient";
import { ButtonSpan } from "../../../../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../../../../ottery-ui/buttons/Button";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        gap: margin.medium,
        width: "100%",
    },
    input: {
        flex: 9,
        justifyContent: "center",
        alignItems:"center",
    },
    icon: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        borderRadius: radius.round,
        position:"relative",
        transform: [{translateX: -margin.small}, {translateY: 1}],
        right: -margin.small,
    },
})
export function IconWrapper({children, onPress}) {
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                {children}
            </View>
            <TouchableOpacity onPress={onPress} style={styles.icon}>
                <Image src={message} alt={"input icon"} height={clickable.minHeight} width={clickable.minHeight + 2}/>
            </TouchableOpacity>
        </View>
    );
}

export function ContactGuardian({route}) {
    const userId = useAuthClient().useUserId();
    const navigator = useNavigator();
    const eventId = useAuthClient().useEventId();
    const childId = route.params.childId;
    const childRes = useChildClient().useGetChild({inputs:[route.params.childId]});
    const child = useMemo(()=>childRes?.data?.data, [childRes]);
    const guardiansRes = useUserClient().useGetUserInfo({inputs: [child?.guardians]}) 
    const [primary, dropper, guardians] = useMemo(()=>{
        const primary = guardiansRes?.data?.data.find(c=>c._id === child?.primaryGuardian);
        const dropper = guardiansRes?.data?.data.find((c)=>c._id === child.lastStampedLocation.with);
        const guardians = guardiansRes?.data?.data.filter(g => g._id !== primary._id && g._id !== dropper._id);
        return [primary, dropper, guardians];        
    }, [guardiansRes]);
    const dmsRes = useChatClient().useGetDirectChats({
        inputs:[userId, guardiansRes?.data?.data.map(g=>g._id)],
        enabled: guardiansRes.status === "success"
    });
    const chatIds = useMemo(()=>dmsRes?.data, [dmsRes])

    function gotoChildConfirm(guardianId) {
        navigator(paths.pickup.caretaker.noRequest, {
            eventId,
            guardianId,
            childId,
        });
    }

    function gotoChat(guardianId) {
        navigator(paths.main.social.chat, {
            chatId: chatIds[guardianId]
        })
    }

    return <MarginlessMain>
        <IconHeader
            src={child?.pfp}
            title={child?.firstName + " " + child?.lastName}
        />
        <Main>
            <ImageButtonList>
                <>
                    <Text variant="titleMedium">Primary guardian:</Text>
                    <IconWrapper onPress={()=>gotoChat(primary._id)}>
                        <ImageButton
                            onPress={()=>gotoChildConfirm(primary._id)}
                            right={primary?.pfp}
                        ><Text>{primary?.firstName} {primary?.lastName}</Text></ImageButton>
                    </IconWrapper>
                </>
                {(dropper)
                    ? <>
                        <Text variant="titleMedium">Dropped off by:</Text>
                        <IconWrapper onPress={()=>gotoChat(dropper._id)}>
                            <ImageButton 
                                onPress={()=>gotoChildConfirm(dropper._id)}
                                right={dropper?.pfp}
                            ><Text>{dropper?.firstName} {dropper?.lastName}</Text></ImageButton>
                        </IconWrapper>
                    </>
                    :undefined
                }
                <>
                    <Text variant="titleMedium">Other guardians:</Text>
                    {guardians?.map((g)=>
                        <IconWrapper onPress={()=>gotoChat(g._id)}>
                            <ImageButton
                                onPress={()=>gotoChildConfirm(g._id)}
                                right={g.pfp}
                            >
                                <Text>{g.firstName} {g.lastName}</Text>
                            </ImageButton>
                        </IconWrapper>
                    )}
                </>
            </ImageButtonList>
            <ButtonSpan>
                <Button width={200} onPress={()=>navigator(paths.pickup.caretaker.manualDismissal, {childId})}>
                    Manual dismissal
                </Button>
            </ButtonSpan>
        </Main>
    </MarginlessMain>
}