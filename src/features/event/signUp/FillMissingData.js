import { useEffect, useState } from "react";
import { MainSignUp } from "./signUp.styles";
import { getVolenteerSignup, getAttendeeSignup } from "../eventApi";
import { useParams } from "react-router-dom";
import { getMissingDataByOwner, addDataByOwner } from "../../data/dataApi";
import { useSelector } from "react-redux";
import Input from "../../../ottery-ui/input/Input"; 
import styled from "styled-components";
import Button from "../../../ottery-ui/buttons/Button";
import {v4 as uuid} from "uuid";
import { Title } from "../../../ottery-ui/text/Title";
import { Ping } from "../../../ottery-ping/Ping";

const FormBox = styled.div`
`;

const FormTitle = styled(Title)`
    text-align: left;
`;

export function FillMissingData({form, onDone, mainFlow}) {
    const {eventId} = useParams();
    const sesh = useSelector(store=>store.auth.sesh);
    const [missing, setMissing] = useState([]);

    let ran = false;

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
            onDone(mainFlow, {data:data});
        }
    }

    useEffect(()=>{
        if (ran === false) {
            (async ()=>{
                let moveon = true;
                ran = true;
                if (form.volenteering) {
                    const signups = await getVolenteerSignup(eventId);
                    const missing = await getMissingDataByOwner(sesh.userId, signups.data);
                    if (missing.data.length) {
                        moveon = false;
                        setMissing((p)=>[...p, {
                            name: "you",
                            id: sesh.userId,
                            needed: missing.data,
                        }]);
                    }

                }
        
                if (form.children) {
                    const signups = await getAttendeeSignup(eventId)
                    for (let i = 0 ; i < form.children.length; i++) {
                        const child = form.children[i];
                        const missing = await getMissingDataByOwner(child._id, signups.data);
                        if (missing.data.length) {
                            moveon = false;
                            setMissing((p)=>[...p, {
                                name: `${child.firstName} ${child.lastName}`,
                                id: child._id,
                                needed: missing.data,
                            }]);
                        }
                    }
                }

                if (moveon) {
                    onDone(mainFlow);
                }
            })()
        }
    },[]);

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