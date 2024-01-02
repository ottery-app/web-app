import { useChildClient } from "./useChildClient";
import { Main } from "../../../ottery-ui/containers/Main";
import {useCallback, useEffect, useState} from "react";
import { pfp } from "../../../assets/icons";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import Button from "../../../ottery-ui/buttons/Button";
import { margin } from "../../../ottery-ui/styles/margin";
import { useUserClient } from "../user/useUserClient";
import { useAuthClient } from "../auth/useAuthClient";
import Image from "../../../ottery-ui/image/Image";
import {image as imageConsts} from "../../../ottery-ui/styles/image";
import { radius } from "../../../ottery-ui/styles/radius";
import { ButtonSpan } from "../../../ottery-ui/containers/ButtonSpan";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { usePing } from "../../../ottery-ping";
import { useInviteClient } from "../invite/useInviteClient";
import { useFormClient } from "../form/useFormClient";
import { FormFlag } from "@ottery/ottery-dto";
import { GetFormInfo } from "../form/GetFormInfo";
import {View} from "react-native";

const styles = StyleSheet.create({
    text: {
        textAlign:"center",
    }
})

enum Phase {
    acceptQuestion,
    validateInfo,
    failed,
}

export function AcceptGuardianship({route}) {
    const [phase, setPhase] = useState(Phase.acceptQuestion);
    const Ping = usePing();
    const userId = useAuthClient().useUserId();
    const acceptGuardianship = useInviteClient().useAcceptGuardianship();
    const userClient = useUserClient();
    const updateData = userClient.useUpdateUserData();
    // const updateProfilePhoto = userClient.useUpdateProfilePhoto(); DELETE this client?
    const childRes = useChildClient().useGetChild({inputs:[route?.params?.childId]});
    const child = childRes?.data?.data;
    const userRes = userClient.useGetUserInfo({inputs:[userId]});
    const user = userRes?.data?.data[0];
    const token = route.params.token;
    const baseGuardianFieldsRes = useFormClient().useGetBaseFormFields({inputs:[FormFlag.guardian]});
    const baseFields = baseGuardianFieldsRes?.data?.data;
    const missingRes = useUserClient().useMissingUserData({
        inputs:[userId, baseFields?.map(({_id})=>_id)],
        enabled: !!baseFields,
    })
    const navigator = useNavigator();

    function decline() {
        navigator(paths.main.home);
    }

    function triggerAddChild() {
        if (acceptGuardianship.status === 'idle') {
            acceptGuardianship.mutate({
                userId: user._id,
                childId: child._id,
                token: token,
                key: route.params.key
            },{
                onSuccess:()=>{
                    navigator(paths.main.child.profile, {childId: child._id});
                },
                onError:(e:any)=>{
                    setPhase(Phase.failed);
                    Ping.error(e?.data?.message || "Looks like we ran into some issues");
                }
            });
        }
    }

    function accept(formFields={}) {
        const dataToUpdate = Object.values(formFields);
        
        if (dataToUpdate.length !== missingRes?.data?.data?.length && missingRes?.data?.data !== undefined) {
            Ping.error("All fields need to be filled");
        } else if (dataToUpdate.length === 0) {
            triggerAddChild();
        } else {
            updateData.mutate({
                userId: userId,
                dataFields: Object.values(formFields),
            },{
                onSuccess: triggerAddChild,
                onError: (e:Error)=>{
                    Ping.error(e.message);
                }
            })
        }
    }

    useEffect(()=>{
        if (missingRes.status === 'success' && missingRes?.data?.data?.length === 0 && phase === Phase.validateInfo) {
            triggerAddChild();
        }
    },[missingRes, acceptGuardianship, phase]);

    if (phase === Phase.acceptQuestion) {
        return (
            <Main style={{
                gap:margin.large,
            }}>
                <Text variant="headlineLarge" style={styles.text}>Welcome to ottery</Text>
                <View style={{
                    alignItems: "center",
                    gap: margin.large,
                }}>
                    <Text style={{textAlign:"center"}}>Would you like to be a guardian for {child?.firstName} {child?.lastName}?</Text>
                    <Image
                        src={child?.pfp}
                        alt={`photo of ${child?.firstName} ${child?.lastName}`}
                        radius={radius.round}
                        width={imageConsts.largeProfile}
                        height={imageConsts.largeProfile}
                    />
                </View>
                <ButtonSpan>
                    <Button
                        state="error"
                        onPress={decline}
                    >Decline</Button>
                    <Button
                        state="success"
                        onPress={()=>setPhase(Phase.validateInfo)}
                    >Accept</Button>
                </ButtonSpan>
            </Main>
        );
    } else if (phase === Phase.validateInfo) {
        return (
            <Main>
                <View style={{padding:margin.large}}>
                    <GetFormInfo 
                        title={"We need some info to keep your kids safe"} 
                        formFields={missingRes?.data?.data || []}
                        onDone={accept}
                        onBack={()=>{setPhase(Phase.acceptQuestion)}}
                    />
                </View>
            </Main>
        );
    } else if (phase === Phase.failed && missingRes?.data?.data.length === 0) {
        return (
            <Main style={{
                gap:margin.large,
            }}>
                <Text variant="headlineSmall" style={styles.text}>We ran into some issues making you a guardian for {child?.firstName}</Text>
                <View style={{
                    alignItems: "center",
                    gap: margin.large,
                }}>
                    <Text style={{textAlign:"center"}}>This is mostlikely due to an expired link</Text>
                    <Image
                        src={child?.pfp}
                        alt={`photo of ${child?.firstName} ${child?.lastName}`}
                        radius={radius.round}
                        width={imageConsts.largeProfile}
                        height={imageConsts.largeProfile}
                    />
                </View>
                <ButtonSpan>
                    <Button
                        onPress={()=>navigator(paths.main.home)}
                    >Ok</Button>
                </ButtonSpan>
            </Main>
        )
    }
}