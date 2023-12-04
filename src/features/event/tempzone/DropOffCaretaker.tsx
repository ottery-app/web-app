import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import SelectionButton from "../../../../ottery-ui/buttons/SelectionButton";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { Main } from "../../../../ottery-ui/containers/Main";
import { useAuthClient } from "../../auth/useAuthClient";
import { useChildClient } from "../../child/useChildClient";
import { useEventClient } from "../useEventClient";
import React from "react";
import { Text } from "react-native-paper";
import { useRosterClient } from "./useRosterClient";

export function DropOffCaretaker() {
    const sesh = useAuthClient().useSesh();
    const eventRes = useEventClient().useGetEvent({inputs:[sesh.event]});
    const event = eventRes?.data?.data;

    if (event) {
        if (event?.secure) {

        } else {
            return <UnSecure event={event} />
        }
    }
}

function UnSecure({event}) {
    const dropOff = useRosterClient().useDropOff();
    const childrenRes = useChildClient().useGetChildren({
        inputs:[event?.attendees],
        enabled: !!event,
    });
    const children = childrenRes?.data?.data;
    const [selected, setSelected] = React.useState([]);

    //does not sort right when in a effect
    children?.sort((a, b) => {
        const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
        const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
        
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    function markPresent() {
        dropOff.mutate({
            eventId: event._id,
            childrenIds: selected,
        })
    }

    return(
        <Main>
            <SelectionButton
                itemCount={selected.length}
                itemTitle={["child", "children"]}
                buttonTitle="Mark present"
                onPress={markPresent}
            />
            <ImageButtonList>
                {(children?.map(child=>
                    <ImageButton 
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
        </Main>
    );
}