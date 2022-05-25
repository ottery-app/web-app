import styled from "styled-components";
import {useState, useContext} from "react";
import {EditImage, Input, Button} from "../oui/index"
import { largeProfile } from "../oui/styles/image";
import { radiusRound } from "../oui/styles/radius";
import { useNavigate } from "react-router-dom";
import authContext from "../../auth/authContext";

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

export default function MakeVehicle() {
    const [make, setMake] = useState("");
    const [model, setModel] = useState(""); 
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [image, setImage] = useState("");
    const [plate, setPlate] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {client} = useContext(authContext);

    function save() {
        if (!make || !model || !color || !year || !plate ) {
            setError("text fields can not be empty");
            return;
        }

        if (isNaN(+year)) {
            setError("year must be a number");
            return;
        }

        console.warn("add image to vehicle");
        client.vehicles.post({
                make,
                model,
                color,
                year,
                plate
            },
            ()=>{navigate(-1)},
            (err)=>{setError(err.message)}
        );
    }

    return (
        <Main>
            <h1>Add a vehicle</h1>
            <EditImage 
                src={"pfp"} 
                alt={"car"}
                width={largeProfile}
                height={largeProfile}
                radius={radiusRound}
                onLoad={(img)=>{setImage(img)}}
            />
            <Input type="text" label={"make"} value={make} onChange={(e)=>{setMake(e.target.value)}} />
            <Input type="text" label={"model"} value={model} onChange={(e)=>{setModel(e.target.value)}} />
            <Input type="text" label={"year"} value={year} onChange={(e)=>{setYear(e.target.value)}} />
            <Input type="text" label={"color"} value={color} onChange={(e)=>{setColor(e.target.value)}} />
            <Input type="text" label={"licence plate"} value={plate} onChange={(e)=>{setPlate(e.target.value)}} />

            <Buttons>
                <Button type="outline" onClick={()=>{navigate(-1)}}>cancel</Button>
                <Button onClick={save}>save</Button>
            </Buttons>
            <Error>{error}</Error>
        </Main>
    )
}