import { Main } from "../../../../components/Main";
import { Title } from "../../../../ottery-ui/text/Title";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { requestType } from "@ottery/ottery-dto";
import Faded from "../../../../ottery-ui/text/Faded";
import { API_ENV } from "../../../../env/api.env";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useTempzoneClient } from "../../useTempzoneClient";

export function Awaiting({form, mainFlow, onDone}) {
    const {useEventId} = useAuthClient();
    const {useGetWaitingChildrenFor} = useTempzoneClient();
    const eventId = useEventId();
    const {data: requestsRes} = useGetWaitingChildrenFor({
        inputs: [eventId, requestType.PICKUP],
        refetchInterval: API_ENV.query_delta,
        refetchIntervalInBackground: true,
    })
    const requests = requestsRes?.data || [];

    return (
        <Main>
            {requests.length 
                ? <Title>Waiting to get picked up</Title>
                : <Faded>No kids waiting to be picked up</Faded>
            }
            {requests.map((request,i)=>
                <ImageButton
                    key={i}
                    right={"pfp" && request.child.pfp.src}
                    content={request.child.firstName}
                    onClick={()=>{
                        onDone(mainFlow, {...form, request});
                    }}
                />
            )}
        </Main>
    );
}