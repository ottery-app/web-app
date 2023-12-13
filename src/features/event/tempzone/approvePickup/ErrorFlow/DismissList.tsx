import { useMemo } from "react";
import {useRosterClient} from "../../useRosterClient";
import { Main } from "../../../../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../../../../ottery-ui/containers/ImageButtonList";
import { fadedStyle, fadedVariant } from "../../tempzone.style";
import { Text } from "react-native-paper";
import { ImageButton } from "../../../../../../ottery-ui/buttons/ImageButton";
import { useNavigator } from "../../../../../router/useNavigator";
import paths from "../../../../../router/paths";

export function DismissList({route}) {
    const rosterRes = useRosterClient().useGetAttendees({inputs:[route.params.eventId, {present:true}]});
    const navigator = useNavigator();

    const kids = useMemo(()=>{
        return rosterRes?.data?.data.filter((child)=>child.lastStampedLocation.at === route.params.eventId);
    }, [rosterRes]);

    function goToGuardianList(childId) {
        navigator(paths.pickup.caretaker.dismissContacts, {childId})
    }

    return (
        <Main>
            {(kids && kids.length)
                ? <ImageButtonList>
                    {kids.map(kid=>{
                        return <ImageButton onPress={()=>goToGuardianList(kid._id)} right={kid.pfp}><Text>{kid.firstName} {kid.lastName}</Text></ImageButton>
                    })}
                  </ImageButtonList>
                : <Text style={fadedStyle} variant={fadedVariant}>No kids at this event</Text>
            }
        </Main>
    );
}