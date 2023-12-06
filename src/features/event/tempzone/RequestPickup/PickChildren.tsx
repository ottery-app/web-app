import { Text } from "react-native-paper";
import { ImageButton } from "../../../../../ottery-ui/buttons/ImageButton";
import SelectionButton from "../../../../../ottery-ui/buttons/SelectionButton"
import { ImageButtonList } from "../../../../../ottery-ui/containers/ImageButtonList";
import { Main } from "../../../../../ottery-ui/containers/Main"
import { useAuthClient } from "../../../auth/useAuthClient";
import { useUserClient } from "../../../user/useUserClient";
import { noId, requestStatus, requestType } from "@ottery/ottery-dto";
import { View } from "react-native";
import { fadedStyle, fadedVariant } from "../tempzone.style";
import { useGetRequests, useRemoveRequest, useUpdateRequest } from "../tempzoneSlice";
import { useNavigator } from "../../../../router/useNavigator";
import { usePing } from "../../../../../ottery-ping";
import paths from "../../../../router/paths";

export function PickChildren() {
    const userId = useAuthClient().useUserId();
    const selected = useGetRequests(request=>request.type === requestType.PICKUP).map(request=>request.child);
    const removeRequest = useRemoveRequest();
    const updateRequest = useUpdateRequest();
    const childrenRes = useUserClient().useChildrenAt({inputs:[userId, noId]});
    const children = childrenRes?.data?.data.filter(child=>child.events.length);
    const navigator = useNavigator();
    const Ping = usePing();

    function updateSelected(child) {
        if (selected.includes(child._id)) {
            removeRequest(child._id);
        } else {
            updateRequest({
                child: child._id,
                guardian: userId,
                event: noId,
                type: requestType.PICKUP,
                status: requestStatus.NONE,
            });
        }
    }

    function selectEvents() {
        if (selected.length === 0) {
            Ping.error("Please select a child");
            return;
        }

        navigator(paths.dropoff.guardian.pickEvent);
    }

    return (
        <Main>
            {(children?.length)
                ? <View>
                    <SelectionButton
                        itemCount={selected.length}
                        itemTitle={["child", "children"]}
                        buttonTitle="Pick up"
                        onPress={selectEvents}
                    />
                    <ImageButtonList>
                        {(children?.map(child=>{
                            let state = "default";
                            
                            if (selected.includes(child._id)) {
                                state = "success";
                            }

                            return <ImageButton 
                                state={state}
                                onPress={()=>updateSelected(child)}
                            ><Text>{child.firstName} {child.lastName}</Text></ImageButton>
                        }))}
                    </ImageButtonList> 
                </View>
                : <Text style={[fadedStyle]} variant={fadedVariant}>No kids to pick up!</Text>
            }
        </Main>
    )
}