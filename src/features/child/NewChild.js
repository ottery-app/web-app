import EditImage from "../../ottery-ui/input/ImageInput";
import TextInput from "../../ottery-ui/input/TextInput";
import DateInput from "../../ottery-ui/input/DateInput";
import OptionsInput from "../../ottery-ui/input/OptionsInput";
import * as ChildApi from "./childApi";
import styled from "styled-components";
import { useState } from "react";
import { margin } from "../../ottery-ui/styles/margin";
import { Ping } from "../../ottery-ping/Ping";
import { useNavigator } from "../../hooks/useNavigator";
import { useChildClient } from "./useChildClient";
import {AwaitButton} from "../../guards/AwaitButton";

const Main = styled.div`
    margin: ${margin.medium};
`;

const Form = styled.div`
    display: flex;
    align-items:center;
    flex-direction: column;
    gap: ${margin.medium};
`;

export default function NewChild() {
    const navigator = useNavigator();
    const [first, setFirst] = useState("");
    const [middle, setMiddle] = useState("");
    const [last, setLast] = useState("");
    const [dob, setDob] = useState();
    const [gender, setGender] = useState("");
    const [image, setImage] = useState({});
    const {useNewChild} = useChildClient();
    const newChild = useNewChild();

    function submit() {
        newChild.mutate({
            firstName: first,
            middleName: middle,
            lastName: last,
            dateOfBirth: dob,
            gender: gender,
            pfp: image,
        }, {
            onSuccess: ()=>navigator(-1),
            onError: (e)=>Ping.error(e.message),
        })
    }

    return (
        <Main>
            <Form>
                <EditImage
                    value={image.src}
                    onChange={(e)=>{setImage(e.target.value)}}
                />
                <TextInput 
                    label="first name"
                    value={first}
                    onChange={(e)=>setFirst(e.target.value)}
                />
                <TextInput
                    label="middle name"
                    value={middle}
                    onChange={(e)=>setMiddle(e.target.value)}
                />
                <TextInput
                    label="last name"
                    value={last}
                    onChange={(e)=>setLast(e.target.value)}
                />
                <DateInput 
                    label="birthday"
                    value={dob}
                    onChange={(e)=>setDob(e.target.value)}
                />
                <OptionsInput
                    label="gender"
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                    options={["male", "female"]}
                />
                <AwaitButton
                    state="success"
                    onClick={submit}
                    status={newChild.status}
                >
                    submit
                </AwaitButton>
            </Form>
        </Main>
    );
}