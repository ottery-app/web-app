import React from "react";
import { Main } from "../../../../ottery-ui/containers/Main";
import { useAuthClient } from "../../auth/useAuthClient"
import { useRosterClient } from "./useRosterClient";
import SelectionButton from "../../../../ottery-ui/buttons/SelectionButton";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import { Text } from "react-native-paper";
import { fadedStyle, fadedVariant } from "./tempzone.style";
import { useTempzoneClient } from "./tempzoneClient";
import { requestType } from "@ottery/ottery-dto";
import { query_delta } from "../../../provider/clideInst";

export function Dismissal() {
    const eventId = useAuthClient().useSesh().event;
    const childrenRes = useRosterClient().useGetAttendees({inputs:[eventId, {present:true}]});
    const children = childrenRes?.data?.data || [];
    const [selected, setSelected] = React.useState([]);
    const pickup = useRosterClient().usePickUp();
    const requestsRes = useTempzoneClient().useGetWaitingChildrenForEvent({
        inputs:[eventId, requestType.PICKUP],
        refetchInterval: query_delta,
    });
    const waitingChildrenIds = requestsRes?.data?.data?.reduce((map, request)=>{
        map[request.child] = request.child;
        return map;
    }, {});

    const presentChildren = [];
    const waitingChildren = children?.filter((child)=>{
        if (waitingChildrenIds[child._id]) {
            return true;
        } else {
            presentChildren.push(child);
            return false;
        }
    }) || [];

    function sortChildrenByName(a,b) {
        const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
        const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
        
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    children?.sort(sortChildrenByName);
    waitingChildren?.sort(sortChildrenByName);

    function markDismiss() {
        pickup.mutate({
            eventId: eventId,
            childrenIds: selected,
        }, {
            onSuccess: ()=>{
                setSelected([]);
                childrenRes.invalidator();
            }
        })
    }

    return(
        <Main>
            {(children?.length)
                ? <>
                    <SelectionButton
                        itemCount={selected.length}
                        itemTitle={["child", "children"]}
                        buttonTitle="Dismiss"
                        onPress={markDismiss}
                        state={(pickup.status==="success")?undefined:pickup.status}
                    />
                    <ImageButtonList>
                        {(waitingChildren?.length) ? <Text>Parents are here for:</Text> : undefined}
                        {(waitingChildren?.map(child=>
                            <ImageButton
                                right={child.pfp}
                                state={(selected.includes(child._id))?"success":"default"}
                                onPress={()=>{
                                    if (selected.includes(child._id)) {
                                        setSelected([...selected].filter((id)=>id!==child._id))
                                    } else {
                                        setSelected([...selected, child._id]);
                                    }
                                }}
                            ><Text>{child.firstName} {child.lastName}</Text></ImageButton>
                        ))}
                        {(presentChildren?.length) ? <Text>Children currently present:</Text> : undefined}
                        {(presentChildren?.map(child=>
                            <ImageButton
                                right={child.pfp}
                                state={(selected.includes(child._id))?"success":"default"}
                                onPress={()=>{
                                    if (selected.includes(child._id)) {
                                        setSelected([...selected].filter((id)=>id!==child._id))
                                    } else {
                                        setSelected([...selected, child._id]);
                                    }
                                }}
                            ><Text>{child.firstName} {child.lastName}</Text></ImageButton>
                        ))}
                    </ImageButtonList>
                </>
                : <Text style={fadedStyle} variant={fadedVariant}>No kids to dismiss!</Text>
            }
        </Main>
    );
}
