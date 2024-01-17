import { Text } from "react-native-paper";
import { ImageButton } from "../../../../../ottery-ui/buttons/ImageButton";
import SelectionButton from "../../../../../ottery-ui/buttons/SelectionButton"
import { ImageButtonList } from "../../../../../ottery-ui/containers/ImageButtonList";
import { Main } from "../../../../../ottery-ui/containers/Main"
import { useAuthClient } from "../../../auth/useAuthClient";
import { useUserClient } from "../../../user/useUserClient";
import { noId, requestStatus, requestType } from "@ottery/ottery-dto";
import { fadedStyle, fadedVariant } from "../tempzone.style";
import { useGetRequests, useRemoveRequest, useUpdateRequest } from "../tempzoneSlice";
import { useNavigator } from "../../../../router/useNavigator";
import { usePing } from "../../../../../ottery-ping";
import paths from "../../../../router/paths";
import { useEventClient } from "../../useEventClient";
import { RRule } from "rrule";
import { activeEvent } from "../../../../functions/activeEvent";

export function PickChildren() {
    const userId = useAuthClient().useUserId();
    const selected = useGetRequests(request=>request.type === requestType.DROPOFF).map(request=>request.child);
    const removeRequest = useRemoveRequest();
    const updateRequest = useUpdateRequest();
    const childrenRes = useUserClient().useChildrenAt({inputs:[userId, noId]});
    let children = childrenRes?.data?.data.filter(child=>child.events.length);
    const eventsRes = useEventClient().useGetEvents({
        inputs:[children?.reduce((arr, c)=>[...arr, ...c.events], [])],
        enabled:!!children,
    });

    const currentDate = new Date(); // Get the current date
    const startOfWeek = new Date(currentDate); // Clone the current date for start of week
    const endOfWeek = new Date(currentDate); // Clone the current date for end of week

    // Calculate the difference between the current day and the start of the week
    const startDiff = currentDate.getDay() - 1; // Assuming Monday as the start of the week (0-indexed)
    startOfWeek.setDate(currentDate.getDate() - startDiff); // Subtract the difference from the current date

    // Calculate the difference between the end of the week and the current day
    const endDiff = 6 - currentDate.getDay(); // Assuming Saturday as the end of the week (0-indexed)
    endOfWeek.setDate(currentDate.getDate() + endDiff);

    console.log(eventsRes?.data?.data);
    const events = eventsRes?.data?.data?.filter(activeEvent);
    children = children?.filter((child)=>{
        const yes_perhaps = child?.events?.filter((event)=>{
            return events?.map(({_id})=>_id).includes(event);
        });

        return !!yes_perhaps.length;
    });

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
                : <Text style={[fadedStyle]} variant={fadedVariant}>No kids to drop off!</Text>
            }
        </Main>
    )
}