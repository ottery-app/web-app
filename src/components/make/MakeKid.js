import styled from "styled-components";
import {useState, useContext} from "react";
import {EditImage, Input, Button} from "../oui/index"
import { largeProfile } from "../oui/styles/image";
import { radiusRound } from "../oui/styles/radius";
import { useNavigate } from "react-router-dom";
import authContext from "../../auth/authContext";
import capitalize from "../../functions/capitalize";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 10px;
`;

const Name = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

const Buttons = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

const Error = styled.div`
    color: red;
`;

export default function MakeKid() {
    const [first, setFirst] = useState("");
    const [middle, setMiddle] = useState(""); 
    const [last, setLast] = useState("");
    const [birth, setBirth] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {client} = useContext(authContext);

    function save() {
        if (!first || !middle || !last || !birth ) {
            setError("text fields can not be empty");
            return;
        }

        client.addKid({
            first: capitalize(first),
            middle: capitalize(middle),
            last: capitalize(last),
            image,
            birth:(new Date(birth)).getTime()
        },
        (res)=>{navigate(-1)},
        (err)=>{setError(err.message)});
    }

    return (
        <Main>
            <h1>Add a child</h1>
            <EditImage 
                src={"pfp"} 
                alt={"profile"}
                width={largeProfile}
                height={largeProfile}
                radius={radiusRound}
                onLoad={(img)=>{setImage(img)}}
            />
            <Name>
                <Input type="text" label={"first"} value={first} onChange={(e)=>{setFirst(e.target.value)}} />
                <Input type="text" label={"middle"} value={middle} onChange={(e)=>{setMiddle(e.target.value)}} />
                <Input type="text" label={"last name"} value={last} onChange={(e)=>{setLast(e.target.value)}} />
            </Name>
            <Input type="date" label={"birth date"} value={birth} onChange={(e)=>{setBirth(e.target.value)}} />

            <Buttons>
                <Button type="outline" onClick={()=>{navigate(-1)}}>cancel</Button>
                <Button onClick={save}>save</Button>
            </Buttons>
            <Error>{error}</Error>
        </Main>
    );
}