import { Text } from "react-native-paper";
import { Main } from "../../../../../ottery-ui/containers/Main";
import { ImageButton } from "../../../../../ottery-ui/buttons/ImageButton";
import { ImageButtonList } from "../../../../../ottery-ui/containers/ImageButtonList";
import { ButtonMenu } from "../../../../../ottery-ui/containers/ButtonMenu";
import { useNavigator } from "../../../../router/useNavigator";
import paths from "../../../../router/paths";
import { pfp } from "../../../../../assets/icons";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useTempzoneClient } from "../tempzoneClient";
import { API_ENV } from "../../../../env/api.env";
import { requestType } from "@ottery/ottery-dto";
import { useChildClient } from "../../../child/useChildClient";
import { fadedStyle, fadedVariant } from "../tempzone.style";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    center: {
        textAlign: "center",
    }
});

export function ApproveSignin() {
    const navigator = useNavigator();
    const eventId = useAuthClient().useEventId();
    const requestsRes = useTempzoneClient().useGetWaitingChildrenForEvent({
        inputs:[eventId, requestType.DROPOFF],
        refetchInterval: API_ENV.query_delta,
    });
    const childrenRes = useChildClient().useGetChildren({
        inputs:[requestsRes?.data?.data.map(r=>r.child)],
        enabled: requestsRes.status === "success",
    });

    const children = childrenRes?.data?.data;

    return (
        <Main>
            {(children?.length)
                ? <>
                    <Text variant={"headlineSmall"} style={styles.center}>Kids waiting to be dropped off:</Text>
                    <ImageButtonList>
                        {children?.map((child)=>{
                            return (
                                <ImageButton
                                    right={child.pfp}
                                    onPress={()=>{
                                        const reqeust = requestsRes.data.data.find((r)=>r.child === child._id);
                                        navigator(paths.dropoff.caretaker.confirm, {
                                            eventId,
                                            childId: child._id,
                                            guardianId: reqeust.guardian
                                        });
                                    }}
                                >
                                    <Text>{child.firstName} {child.lastName}</Text>
                                </ImageButton>
                            )
                        })}
                    </ImageButtonList>
                </>
                : <Text style={[fadedStyle]} variant={fadedVariant}>All your kids are dropped off!</Text>
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