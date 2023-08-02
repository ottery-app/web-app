import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../../ottery-ui/text/Title";
import { Ping } from "../../../ottery-ping/Ping";
import { useAuthClient } from "../../auth/useAuthClient";
import { useEventClient } from "../useEventClient";
import { useDataClient } from "../../data/useDataClient";
import { MainSignUp } from "./signUp.styles";
import {v4 as uuid} from "uuid";
import Input from "../../../ottery-ui/input/Input"; 
import Button from "../../../ottery-ui/buttons/Button";

const FormBox = styled.div`
`;

const FormTitle = styled(Title)`
    text-align: left;
`;

export function FillMissingData({form, onDone, mainFlow}) {
    const {eventId} = useParams();
    const {useUserId} = useAuthClient()

    const {
        useGetVolenteerSignup,
        useGetAttendeeSignup
    } = useEventClient();

    const {
        useGetMissingDataByOwner,
        useGetMissingDataByOwners,
    } = useDataClient();

    const userId = useUserId();
    const {
        data: volenteerSignup,
        status: volenteerStatus,
    } = useGetVolenteerSignup({
        inputs:[eventId],
        enabled: !!form.volenteering
    });

    const {
        data: attendeeSignup,
        status: attendeeStatus,
    } = useGetAttendeeSignup({
        inputs:[eventId],
        enabled: !!form.children,
    });

    const {
        data: missingVolenteerData,
        status: missingVoletneerStatus,
    } = useGetMissingDataByOwner({
        inputs:[userId, volenteerSignup?.data],
        enabled: !!(form.volenteering && volenteerSignup),
    });

    const childrenQueryArr = form.children.map((child)=>[child._id, ["6410cc1982ccad3a14aef202"]||attendeeSignup?.data||[]]);

    const {
        data: missingAttendeeData,
        status: missingAttendeeStatus,
    } = useGetMissingDataByOwners({
        inputs: childrenQueryArr,
        enabled: !!(form.children && attendeeSignup),
    });

    const [missing, setMissing] = useState([]);


    async function submit() {
        const data = {};
        let valid = true;

        missing.forEach(({needed})=>{
            needed.forEach((dataField)=>{
                if (dataField.value === undefined || dataField.value === "") {
                    valid = false;
                    Ping.error(`${dataField.label} must not be empty`);
                }

                if (data[dataField.owner]) {
                    data[dataField.owner].push({
                        formField: dataField._id,
                        label: dataField.label,
                        value: dataField.value,
                        type: dataField.type,
                    })
                } else {
                    data[dataField.owner] = [{
                        formField: dataField._id,
                        label: dataField.label,
                        value: dataField.value,
                        type: dataField.type,
                    }];
                }
            });
        });

        if (valid) {
            //onDone(mainFlow, {data:data});
        }
    }

    useEffect(()=>{
            let moveon = false;

            
            if (form.volenteering) {
                if (missingVolenteerData?.data.length) {
                    moveon = false;
                    setMissing((p)=>[...p, {
                        name: "you",
                        id: userId,
                        needed: missing.data,
                    }]);
                } else if (missingVolenteerData?.data.length === 0) {
                    moveon = true;
                }
            }

            if (form.children) {
                if (missingAttendeeData?.length) {
                    moveon = true;
                    for (let i = 0; i < missingAttendeeData.length; i++) {
                        if (missingAttendeeData[i].data.length) {
                            const child = form.children[i];
                            moveon = false;
                            setMissing((p)=>[...p, {
                                name: `${child.firstName} ${child.lastName}`,
                                id: child._id,
                                needed: missing.data,
                            }]);
                        }
                    }
                } else if (missingAttendeeData?.data?.length === 0) {
                    moveon = true;
                }
            }

            if (moveon) {
                onDone(mainFlow);
            }
    }, [missingVolenteerData, missingAttendeeData, form]);

    return  <MainSignUp>
        <Title>Looks like we are missing some information for:</Title>
        {missing.map((user, i)=>{
            return (
                <FormBox key={i}>
                    <FormTitle>{user.name}</FormTitle>
                    {user.needed.map((field, i)=>{
                        field.key = field.key || uuid();
                        field.owner = user.id;
                        return <Input 
                            key={field.key}
                            type={field.type} 
                            label={field.label}
                            value={field.value}
                            onChange={(e)=>{
                                const update = JSON.parse(JSON.stringify(missing));
                                update.forEach((u)=>{
                                    if (u.name === user.name) {
                                        u.needed.forEach((f)=>{
                                            if (f.key === field.key) {
                                                f.value = e.target.value;
                                            }
                                        });
                                    }
                                })
                                setMissing(update);
                            }}
                        />
                    })}
                </FormBox>
            );
        })}
        <Button onClick={submit}>submit</Button>
    </MainSignUp>;
}