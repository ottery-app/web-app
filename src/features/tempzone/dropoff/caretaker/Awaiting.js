import { Main } from "../../../../components/Main";
import { Title } from "../../../../ottery-ui/text/Title";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { requestType } from "ottery-dto";
import Faded from "../../../../ottery-ui/text/Faded";
import { API_ENV } from "../../../../env/api.env";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useTempzoneClient } from "../../useTempzoneClient";

export function Awaiting({form, mainFlow, onDone}) {
    const {useEventId} = useAuthClient()
    const {useGetWaitingChildrenFor} = useTempzoneClient();
    const eventId = useEventId();
    const {data:children} = useGetWaitingChildrenFor({
        inputs: [eventId, requestType.DROPOFF],
        refetchInterval: API_ENV.query_delta,
        refetchIntervalInBackground: true,
    });
    const requests = children?.data;

    return <Main>
        {requests && requests.length 
            ? <Title>Waiting to get dropped off</Title>
            : <Faded>No kids waiting to be dropped of</Faded>
        }
        {requests && requests.map((request,i)=>{
            if (request.child) {
                return <ImageButton 
                    key={i}
                    right={"pfp" && request.child.pfp.src}
                    content={request.child.firstName}
                    onClick={()=>{
                        onDone(mainFlow, {...form, request});
                    }}
                />
            }
        })}
    </Main>
}