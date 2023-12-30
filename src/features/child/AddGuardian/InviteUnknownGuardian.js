import { useChildClient } from "../useChildClient";
import { Main } from "../../../../ottery-ui/containers/Main";
import {useState} from "react"
import { Text } from "react-native-paper";
import { pfp } from "../../../../assets/icons";
import Image from "../../../../ottery-ui/image/Image";
import {View, StyleSheet} from "react-native";
import TextInput from "../../../../ottery-ui/input/TextInput";
import { isEmail } from "@ottery/ottery-dto";
import { margin } from "../../../../ottery-ui/styles/margin";
import { image } from "../../../../ottery-ui/styles/image";
import { radius } from "../../../../ottery-ui/styles/radius";
import Button from "../../../../ottery-ui/buttons/Button";
import { ButtonSpan } from "../../../../ottery-ui/containers/ButtonSpan";
import { usePing } from "../../../../ottery-ping";
import { useInviteClient } from "../../invite/useInviteClient";

export function InviteGuardian({route, setInvite}) {
    const Ping = usePing();

    const childId = route.params.childId;
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const [email, setEmail] = useState();
    const inviteGuardian = useInviteClient().useInviteGuardianForChild({
        onSuccess: ()=>{
            Ping.success("Invitation sent"); setEmail("")},
        onError: ()=>{Ping.error("Looks like we ran into an issue")}
    });
    const child = childRes?.data?.data;
    
    return (
        <Main scrollable={true}>
            <View style={styles.padding}>
                <Text style={{textAlign:"center"}} variant={"headlineSmall"}>Email Invite</Text>
                <Text style={{textAlign:"center"}}>You are inviting a guardian for {child.firstName}</Text>
            </View>
            <View style={styles.padding}>
                <Image radius={radius.round} height={image.largeProfile} width={image.largeProfile} src={{src: child?.pfp?.src || pfp, aspectRatio: 1}}/>
            </View>
            <View style={styles.padding}>
                <TextInput
                    label="Email"
                    value={email}
                    validator={isEmail}
                    onChange={(text)=>{setEmail(text)}}
                />
            </View>
            <ButtonSpan>
                <Button
                    state={inviteGuardian.status}
                    onPress={()=>{inviteGuardian.mutate({email, childId})}}
                >Send</Button>
            </ButtonSpan>
        </Main>
    );
}

const styles = StyleSheet.create({
    padding: {justifyContent:"center",alignItems:"center", paddingTop:margin.large, paddingBottom:margin.large}
})

