import { useAuthClient } from "../../auth/useAuthClient";
import { useChildClient } from "../useChildClient";
import { useSocialClient } from "../../social/useSocialClient";
import { Main } from "../../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import {useEffect, useState} from "react"
import { Text } from "react-native-paper";
import { View } from "react-native";
import paths from "../../../router/paths";
import { useNavigator } from "../../../router/useNavigator";
import { margin } from "../../../../ottery-ui/styles/margin";
import Button from "../../../../ottery-ui/buttons/Button";
import { usePing } from "../../../../ottery-ping";
import { useUserClient } from "../../user/useUserClient";
import { useInviteClient } from "../../invite/useInviteClient";

export function AddGuardian({route, setInvite}) {
    const Ping = usePing();

    const userId = useAuthClient().useUserId()
    const childId = route.params.childId;
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const child = childRes?.data?.data;
    const friendIdsRes = useSocialClient().useGetFriends({inputs:[userId]});
    const freindIds = friendIdsRes?.data?.data.filter((friend)=>!child.guardians.includes(friend));
    const friendsRes = useUserClient().useGetUserInfo({
        inputs: [freindIds],
        enabled: !!freindIds,
    })
    const friends = friendsRes?.data?.data;

    const [selected, setSelected] = useState({});

    const inviteGuardian = useInviteClient().useInviteGuardianForChild({
        onSuccess: ()=>{
            Ping.success("Invitation sent");
            setSelected({});
        },
        onError: ()=>{Ping.error("Looks like we ran into an issue")}
    });

    //const freindIds = Object.entries(selected).filter(([key, value])=>value).map(([friendId])=>friendId)

    if (friendsRes.status === "success" && freindIds.length === 0) {
        setInvite(true);
    }

    return (
        <Main>
            <View style={{justifyContent:"center",alignItems:"center", paddingTop:margin.large, paddingBottom:margin.large}}>
                <Text style={{textAlign:"center"}} variant={"headlineSmall"}>Select Guardians</Text>
                <Text style={{textAlign:"center"}}>These friends will be made guardians for {child.firstName}</Text>
            </View>
            <ImageButtonList>
                {friends?.map((friend)=>
                    <ImageButton 
                        key={friend.email}
                        right={{src:friend?.pfp?.src, aspectRatio:1}}
                        state={selected[friend.email] && "success"}
                        onPress={()=>{setSelected(p=>{
                            p[friend.email] = !!!p[friend.email];
                            return {...p};
                        })}}
                    >
                        <Text>{friend.firstName} {friend.lastName}</Text>
                    </ImageButton>
                )}
            </ImageButtonList>
            <View style={{justifyContent:"center",alignItems:"center", paddingTop:margin.large, paddingBottom:margin.large}}>
                <Button
                    state={inviteGuardian.status}
                    onPress={()=>{
                        (freindIds.length) ? Object.keys(selected).forEach((email)=>{
                            inviteGuardian.mutate({email, childId}, {onSuccess:()=>Ping.success("Invited friend(s)")});
                        }) : Ping.error("Please select a friend")}
                    }
                >Add</Button>
                <Button type="default"
                    width={"100%"}
                    onPress={()=>setInvite(true)}
                >Don't see them?</Button>
            </View>
        </Main>
    );
}

