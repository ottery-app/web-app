import { useChildClient } from "./useChildClient";
import { Main } from "../../../ottery-ui/containers/Main";
import {useState} from "react";
import ImageInput from "../../../ottery-ui/input/ImageInput";
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap: margin.large,
        paddingTop: margin.large,
        marginTop: margin.large,
    },
    text: {
        textAlign:"center",
    }
})

enum Phase {
    acceptQuestion,
    validateInfo,
}

export function AcceptGuardianship({route}) {
    const [phase, setPhase] = useState(Phase.acceptQuestion);
    const Ping = usePing();

    const [image, setImage] = useState(pfp);
    const userId = useAuthClient().useUserId();

    const acceptGuardianship = useInviteClient().useAcceptGuardianship();

    const userClient = useUserClient();
    const updateProfilePhoto = userClient.useUpdateProfilePhoto();
    const childRes = useChildClient().useGetChild({inputs:[route?.params?.childId]});
    const child = childRes?.data?.data;
    const userRes = userClient.useGetUserInfo({inputs:[userId]});
    const user = userRes?.data?.data[0];
    const token = route.params.token;
    const navigator = useNavigator();

    function savePhoto() {
        updateProfilePhoto.mutate({
            userId: user._id,
            pfp: image,
        }, {
            onSuccess: ()=>{
                accept();
            },
            onError: (e:Error)=>{
                Ping.error(e.message)
            }
        });
    }

    function decline() {
        navigator(paths.main.home);
    }

    function accept() {
        acceptGuardianship.mutate({
            userId: user._id,
            childId: child._id,
            token: token,
            key: route.params.key
        }, {
            onSuccess: ()=>{
                Ping.success("You're a guardian now!");
                navigator(paths.main.home);
            },
            onError: (e:Error)=>{
                Ping.error(e.message);
                navigator(paths.main.home);
            }
        })
    }

    if (phase === Phase.acceptQuestion) {
        return (
            <Main style={styles.container}>
                <Text variant="headlineLarge" style={styles.text}>Welcome to ottery</Text>
                <Text>Would you like to be a guardian for {child?.firstName} {child?.lastName}?</Text>
                <Image
                    src={child?.pfp}
                    alt={`photo of ${child?.firstName} ${child?.lastName}`}
                    radius={radius.round}
                    width={imageConsts.largeProfile}
                    height={imageConsts.largeProfile}
                />
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

        if (user?.pfp && acceptGuardianship.status === "idle") {
            accept()
        }

        return (
            <Main style={styles.container}>
                <Text style={styles.text} variant="headlineLarge">We need your photo</Text>
                <Text style={styles.text}>We need this to make sure your kids are safe</Text>
                <Text style={styles.text}>Make sure your face is clearly visible</Text>
                <ImageInput
                    value={image}
                    onChange={(image)=>{setImage(image)}}
                />
                <Button
                    state={(image === pfp) ? "disabled" : updateProfilePhoto.status}
                    width={200}
                    onPress={savePhoto}
                >Save photo</Button>
            </Main>
        );
    }
}