import { IconHeader } from "../../../../ottery-ui/headers/IconHeader";
import { useChildClient } from "../useChildClient";
import { Main } from "../../../../ottery-ui/containers/Main";
import { useEventClient } from "../../event/useEventClient";
import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import { useNavigator } from "../../../router/useNavigator";
import paths from "../../../router/paths";
import { Text } from "react-native-paper";

export function AttendanceChildPickEvent({route}) {
    const navigator = useNavigator();
    const childId = route.params.childId;
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const eventRes = useEventClient().useGetEvents({
        inputs:[childRes?.data?.data?.events],
        enabled: !!childRes?.data?.data
    });

    return (
        <Main margins={false} scrollable={false}>
            <IconHeader
                src={childRes?.data?.data?.pfp}
                alt="profile photo"
                title={`${childRes?.data?.data?.firstName} ${childRes?.data?.data?.lastName}`}
            />
            <Main>
                {eventRes?.data?.data?.map((event)=>
                    <ImageButton onPress={()=>navigator(paths.main.child.attendance, {childId, eventId:event._id})}><Text>{event.summary}</Text></ImageButton>
                )}
            </Main>
        </Main>
    );
}