import { useEffect, useState } from "react";
import { Main } from "../../../../components/Main";
import { Title } from "../../../../ottery-ui/text/Title";
import { getInfo } from "../../../user/userApi";
import Image from "../../../../ottery-ui/images/Image";
import { image } from "../../../../ottery-ui/styles/image";
import ButtonField from "../../../../ottery-ui/buttons/ButtonField";
import Button from "../../../../ottery-ui/buttons/Button";
import styled from "styled-components";
import { acceptChildRequest, declineChildRequest } from "../../tempzoneApi";
import {Ping} from "../../../../ottery-ping/Ping";

const Spread = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    width: 100%;
`;

export function Accept({form, onDone, mainFlow, subFlow}) {
    const [guardian, setGuardian] = useState({});

    function getChild() {
        return form.request.child;
    }

    function accept() {
        acceptChildRequest({
            ...form.request,
            child: form.request.child._id,
        }).then((res)=>{
            onDone(mainFlow, {});
        }).catch(err=>{
            Ping.error()
        });
    }

    function decline() {
        declineChildRequest({
            ...form.request,
            child: form.request.child._id,
        }).then((res)=>{
            onDone(subFlow, {
                ...form,
                guardian: guardian,
            });
        }).catch(err=>{
            Ping.error(err.message);
        });
    }

    useEffect(()=>{
        getInfo(form.request.guardian)
            .then(res=>{
                setGuardian(res.data);
            });
    }, []);

    console.log(guardian);

    return <Main>
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
    </Main>;
}