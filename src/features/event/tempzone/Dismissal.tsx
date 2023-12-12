import React from "react";
import { Main } from "../../../../ottery-ui/containers/Main";
import { useAuthClient } from "../../auth/useAuthClient"
import { useRosterClient } from "./useRosterClient";
import { useNavigator } from "../../../router/useNavigator";
import SelectionButton from "../../../../ottery-ui/buttons/SelectionButton";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import { Text } from "react-native-paper";
import { ButtonMenu } from "../../../../ottery-ui/containers/ButtonMenu";
import paths from "../../../router/paths";
import { clock, users } from "../../../../assets/icons";
import {View} from "react-native";
import { fadedStyle, fadedVariant } from "./tempzone.style";

export function Dismissal() {
    const eventId = useAuthClient().useSesh().event;
    const childrenRes = useRosterClient().useGetAttendees({inputs:[eventId, {present:true}]});
    const children = childrenRes?.data?.data;
    const navigator = useNavigator()
    const [selected, setSelected] = React.useState([]);
    const pickup = useRosterClient().usePickUp();

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
                ? <View>
                    <SelectionButton
                        itemCount={selected.length}
                        itemTitle={["child", "children"]}
                        buttonTitle="Dismiss"
                        onPress={markDismiss}
                        state={(pickup.status==="success")?undefined:pickup.status}
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
                </View>
                : <Text style={fadedStyle} variant={fadedVariant}>No kids to dismiss!</Text>
            }
            <ButtonMenu
                buttons={[
                    {
                        icon: { uri: clock.src },
                        title: "End Event",
                        onPress: () => {
                            navigator(paths.main.event.end, {
                                eventId:eventId,
                                screen: paths.main.name,
                            })
                        },
                    },
                    {
                        icon: { uri: users.src },
                        title: "Dismissal list",
                        onPress: () => {
                            navigator(paths.main.event.dismissalList, {
                                eventId:eventId,
                                screen: paths.main.name,
                            })
                        },
                    }
                ]}
            />
        </Main>
    );
}
