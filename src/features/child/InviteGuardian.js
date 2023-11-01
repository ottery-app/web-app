import { useAuthClient } from "../auth/useAuthClient";
import { useChildClient } from "./useChildClient";
import { useSocialClient } from "../social/useSocialClient";
import { Main } from "../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../ottery-ui/buttons/ImageButton";
import {useState} from "react"
import { Text } from "react-native-paper";
import { pluss } from "../../../assets/icons";
import paths from "../../router/paths";
import { useNavigator } from "../../router/useNavigator";

export function InviteGuardian({route}) {
    const navigator = useNavigator();

    const childId = route.params.childId;
    const userId = useAuthClient().useUserId();
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const child = childRes?.data?.data;
    const friendsRes = useSocialClient().useGetFriends({inputs:[childId]});
    const friends = friendsRes?.data?.data.filter((friend)=>!child.guardians.includes(friend._id));

    const [selected, setSelected] = useState({});

    return (
        <Main>
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
                <ImageButton
                    right={pluss}
                    state={"success"}
                    onPress={()=>{navigator(paths.main.child.inviteGuardian, {childId:childId})}}
                >
                    <Text>Invite new guardian</Text>
                </ImageButton>
            </ImageButtonList>
        </Main>
    );
}

