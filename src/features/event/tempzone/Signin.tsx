import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import SelectionButton from "../../../../ottery-ui/buttons/SelectionButton";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { Main } from "../../../../ottery-ui/containers/Main";
import { useAuthClient } from "../../auth/useAuthClient";
import { useEventClient } from "../useEventClient";
import React from "react";
import { Text } from "react-native-paper";
import { useRosterClient } from "./useRosterClient";
import { pfp, users } from "../../../../assets/icons";
import { ButtonMenu } from "../../../../ottery-ui/containers/ButtonMenu";
import { View } from "react-native";
import { useNavigator } from "../../../router/useNavigator";
import paths from "../../../router/paths";
import { fadedStyle, fadedVariant } from "./tempzone.style";
import { useTempzoneClient } from "./tempzoneClient";
import { requestType } from "@ottery/ottery-dto";
import { query_delta } from "../../../provider/clideInst";


export function Signin() {
    const eventId = useAuthClient().useSesh().event;
    const navigator = useNavigator();
    const dropOff = useRosterClient().useDropOff();
    const childrenRes = useRosterClient().useGetAttendees({inputs:[eventId, {present:false}]});
    const allChildren = childrenRes?.data?.data || [];
    const [selected, setSelected] = React.useState([]);
    const requestsRes = useTempzoneClient().useGetWaitingChildrenForEvent({
        inputs:[eventId, requestType.DROPOFF],
        refetchInterval: query_delta,
    });
    const waitingChildrenIds = requestsRes?.data?.data?.reduce((map, request)=>{
        map[request.child] = request.child;
        return map;
    }, {});

    const children = [];
    const waitingChildren = allChildren?.filter((child)=>{
        if (waitingChildrenIds[child._id]) {
            return true;
        } else {
            children.push(child);
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


    function markPresent() {
        dropOff.mutate({
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
            {(children?.length || waitingChildren?.length)
                ? <>
                    <SelectionButton
                        itemCount={selected.length}
                        itemTitle={["child", "children"]}
                        buttonTitle="Mark present"
                        onPress={markPresent}
                        state={(dropOff.status==="success")?undefined:dropOff.status}
                    />
                    <ImageButtonList>
                        {(waitingChildren?.length) ? <Text>Waiting for sign in</Text> : undefined}
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
                        { (children?.length) ? <Text>Absent children</Text> : undefined}
                        {(children?.map(child=>
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
                : <Text style={[fadedStyle]} variant={fadedVariant}>All children are present!</Text>
            }
            <ButtonMenu
                buttons={[
                    {
                        icon: { uri: pfp.src },
                        title: "Invite Attendee",
                        onPress: () => {
                            navigator(paths.main.event.invite.attendee, {
                                eventId:eventId,
                                screen: paths.main.name,
                            })
                        },
                    },
                ]}
            />
        </Main>
    );
}