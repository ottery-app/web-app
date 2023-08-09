import { Main } from "../../../../components/Main"
import Image from "../../../../ottery-ui/images/Image";
import { roundOtterFullBody } from "../../../../assets/images/otters";
import { Title } from "../../../../ottery-ui/text/Title";
import ImageButton from "../../../../ottery-ui/buttons/ImageButton";
import { requestStatus } from "ottery-dto";
import { API_ENV } from "../../../../env/api.env";
import { useTempzoneClient } from "../../useTempzoneClient";

export function Await({form, onDone, mainFlow}) {
    const {useCheckRequestsStatus} = useTempzoneClient();
    useCheckRequestsStatus({
        inputs: [form.requests.map(({child})=>child._id)],
        refetchInterval: API_ENV.query_delta,
        refetchIntervalInBackground: true,
        onSuccess: ({data})=>{
            let dones = 0;


            data.forEach((request)=>{
                if (request.status !== requestStatus.INPROGRESS) {
                    dones++;
                }

                for (let {child} of form.requests) {
                    if (child._id === request.child) {
                        request.child = child;
                    }
                }
            });

            if (dones === data.length) {
                onDone(mainFlow, {
                    requests: data,
                });
            }
        }
    });

    return <Main>
        <Image
            src={roundOtterFullBody}
            width={"100%"}
            animation={"spin"}
        />
        <Title>Getting your kids off the raft. Hold on.</Title>
        {form.requests.map(({child})=>{
            try {
                return <ImageButton
                    key={child._id}
                    content={child.firstName}
                    right={"pfp" && child.pfp.src}
                />
            } catch (e) {
            }
        })}
    </Main>
}