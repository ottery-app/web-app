import { Main } from "../../../../components/Main";
import { Title } from "../../../../ottery-ui/text/Title";
import Image from "../../../../ottery-ui/images/Image";
import { image } from "../../../../ottery-ui/styles/image";
import ButtonField from "../../../../ottery-ui/buttons/ButtonField";
import Button from "../../../../ottery-ui/buttons/Button";
import styled from "styled-components";
import {Ping} from "../../../../ottery-ping/Ping";
import { useTempzoneClient } from "../../useTempzoneClient";
import { useUserClient } from "../../../user/useUserClient";
import { AwaitLoad } from "../../../../guards/AwaitLoad";

const Spread = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    width: 100%;
`;

export function Accept({form, onDone, mainFlow, subFlow}) {
    const {useAcceptChildRequest, useDeclineChildRequest} = useTempzoneClient();
    const {useGetUserInfo} = useUserClient();
    const acceptChildRequest = useAcceptChildRequest();
    const declineChildRequest = useDeclineChildRequest();
    const {data:guardianRes, status} = useGetUserInfo({inputs:[form.request.guardian]});
    const guardian = guardianRes?.data || {};

    function getChild() {
        return form.request.child;
    }

    function accept() {
        acceptChildRequest.mutate({
            ...form.request,
            child: form.request.child._id,
        }, {
            onSuccess:()=>onDone(mainFlow, {}),
            onError:(err)=>Ping.error(err.message)
        });
    }

    function decline() {
        declineChildRequest.mutate({
            ...form.request,
            child: form.request.child._id,
        }, {
            onSuccess: ()=>onDone(subFlow, {
                ...form,
                guardian: guardian,
            }),
            onError: (err)=>Ping.error(err.message)
        });
    }

    return (
        <AwaitLoad status={status}>
            <Main>
                <Spread>
                    <div>
                        <Title>{getChild().firstName + " " + getChild().lastName}</Title>
                        <Image 
                            src={form.request.child.pfp.src}
                            radius={"100%"}
                            height={image.largeProfile}
                            width={image.largeProfile}
                        />
                        <Title>Requested by:</Title>
                        <Title>{guardian.firstName + " " + guardian.lastName}</Title>
                        <Image 
                            src={guardian.pfp && guardian.pfp.src || "pfp"}
                            radius={"100%"}
                            height={image.largeProfile}
                            width={image.largeProfile}
                        />
                    </div>
                    <ButtonField>
                        <Button
                            onClick={decline}
                            state={"error"}
                        >
                            decline
                        </Button>
                        <Button
                            onClick={accept}
                            state={"success"}
                        >
                            accept
                        </Button>
                    </ButtonField>
                </Spread>
            </Main>
        </AwaitLoad>
    );
}