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
import { StyleSheet } from "react-native";
import { margin } from "../../../../ottery-ui/styles/margin";
import { colors } from "../../../../ottery-ui/styles/colors";
import { useNavigator } from "../../../router/useNavigator";
import paths from "../../../router/paths";

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        padding: margin.large,
        color: colors.text.tertiary,
    }
});

export function Signin() {
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
    const navigator = useNavigator();
    const dropOff = useRosterClient().useDropOff();
    const childrenRes = useRosterClient().useGetAttendees({inputs:[event._id, {present:false}]});
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
        }, {
            onSuccess: ()=>{
                setSelected([]);
                childrenRes.invalidator();
            }
        })
    }

    function newAttendee(){
        alert("new attendeee");
    }

    return(
        <Main>
            {(children?.length)
                ? <>
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
                </>
                : <Text style={styles.headerText} variant={"headlineSmall"}>All children are present!</Text>
            }
            <ButtonMenu
                buttons={[
                    {
                        icon: { uri: pfp.src },
                        title: "Invite Attendee",
                        onPress: () => {
                            navigator(paths.main.event.invite.attendee, {
                                eventId:event._id,
                                screen: paths.main.name,
                            })
                        },
                    },
                    {
                        icon: { uri: users.src },
                        title: "Roster",
                        onPress: () => {
                            navigator(paths.main.event.roster, {
                                eventId:event._id,
                                screen: paths.main.name,
                            })
                        },
                    }
                ]}
            />
        </Main>
    );
}