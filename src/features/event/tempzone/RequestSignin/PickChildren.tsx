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
import React from "react";

export function PickChildren() {
    const userId = useAuthClient().useUserId();
    const selected = useGetRequests(request=>request.type === requestType.DROPOFF).map(request=>request.child);
    const removeRequest = useRemoveRequest();
    const updateRequest = useUpdateRequest();
    const childrenRes = useUserClient().useChildrenAt({inputs:[userId, noId]});
    let children = childrenRes?.data?.data.filter(child=>child.events.length);
    // const eventRes = useEventClient().useGetEvents({inputs:[children?.reduce((arr, child)=>[...arr, child.events],[])]});
    // const eventMap = eventRes?.data?.data.reduce((map, event)=>{
    //     map[event._id] = event;
    //     return map;
    // }, {});

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
                caretaker: noId,
                type: requestType.DROPOFF,
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
                ? <>
                    <SelectionButton
                        itemCount={selected.length}
                        itemTitle={["child", "children"]}
                        buttonTitle="Drop off"
                        onPress={selectEvents}
                    />
                    <ImageButtonList>
                        {(children?.map(child=>{
                            let state = "default";
                            
                            if (selected.includes(child._id)) {
                                state = "success";
                            }

                            return <ImageButton 
                                right={child.pfp}
                                state={state}
                                onPress={()=>updateSelected(child)}
                            ><Text>{child.firstName} {child.lastName}</Text></ImageButton>
                        }))}
                    </ImageButtonList> 
                </>
                : <Text style={[fadedStyle]} variant={fadedVariant}>All your kids are dropped off!</Text>
            }
        </Main>
    )
}