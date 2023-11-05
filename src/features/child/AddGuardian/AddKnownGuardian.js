import { useAuthClient } from "../../auth/useAuthClient";
import { useChildClient } from "../useChildClient";
import { useSocialClient } from "../../social/useSocialClient";
import { Main } from "../../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import {useState} from "react"
import { Text } from "react-native-paper";
import { View } from "react-native";
import paths from "../../../router/paths";
import { useNavigator } from "../../../router/useNavigator";
import { margin } from "../../../../ottery-ui/styles/margin";
import Button from "../../../../ottery-ui/buttons/Button";
import { usePing } from "../../../../ottery-ping";
import { useUserClient } from "../../user/useUserClient";

export function AddGuardian({route, setInvite}) {
    const navigator = useNavigator();
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
    const addGuardian = useChildClient().useAddGuardians({
        onError: ()=>{Ping.error("Something went wrong")},
        onSuccess: ()=>{Ping.success("Invites sent")}
    });

    const [selected, setSelected] = useState({});
    //const freindIds = Object.entries(selected).filter(([key, value])=>value).map(([friendId])=>friendId)

    if (friendsRes.status === "success" && freindIds.length === 0) {
        setInvite(true);
    }

    return (
        <Main>
            <View style={{flex:1, justifyContent:"center",alignItems:"center", paddingTop:margin.large, paddingBottom:margin.large}}>
                <Text style={{textAlign:"center"}} variant={"headlineSmall"}>Select Guardians</Text>
                <Text style={{textAlign:"center"}}>These friends will be made guardians for {child.firstName}</Text>
            </View>
            <ImageButtonList>
                {friends?.map((friend)=>
                    <ImageButton 
                        key={friend._id}
                        right={{src:friend?.pfp?.src, aspectRatio:1}}
                        state={selected[friend._id] && "success"}
                        onPress={()=>{setSelected(p=>{
                            p[friend._id] = !!!p[friend._id];
                            return {...p};
                        })}}
                    >
                        <Text>{friend.firstName} {friend.lastName}</Text>
                    </ImageButton>
                )}
            </ImageButtonList>
            <View style={{flex:1, justifyContent:"center",alignItems:"center", paddingTop:margin.large, paddingBottom:margin.large}}>
                <Button
                    onPress={()=>{(freindIds.length) ? addGuardian.mutate({childId, userIds:freindIds}) : Ping.error("Please select a friend")}}
                >Add</Button>
                <Button type="default"
                    onPress={()=>navigator(paths.main.child.inviteGuardian, {childId:childId})}
                >Don't see them?</Button>
            </View>
        </Main>
    );
}

