import styled from "styled-components";
import {useState} from "react";
import {EditImage, Input} from "../oui/index"
import { largeProfile } from "../oui/styles/image";
import { radiusRound } from "../oui/styles/radius";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Name = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    gap: 5px;
`;

export default function MakeKid() {
    const [first, setFirst] = useState("");
    const [middle, setMiddle] = useState(""); 
    const [last, setLast] = useState("");

    return (
        <Main>
            <h1>Add a child</h1>
            <EditImage src={"pfp"} alt={"profile"} width={largeProfile} height={largeProfile} radius={radiusRound} />
            <Name>
                <Input type="text" label={"first name"} value={first} onChange={(e)=>{setFirst(e.target.value)}} />
                <Input type="text" label={"middle name"} value={middle} onChange={(e)=>{setMiddle(e.target.value)}} />
                <Input type="text" label={"last name"} value={last} onChange={(e)=>{setLast(e.target.value)}} />
            </Name>
        </Main>
    );
}