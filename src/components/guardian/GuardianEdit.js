import React from "react";
import styled from "styled-components";
import {Input, EditImage, BottomButton} from "../../components/oui";
import { largeProfile } from "../oui/styles/image";
import authContext from "../../auth/authContext";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export default function GuardianEdit() {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();

    const {client} = React.useContext(authContext);

    React.useEffect(() => {
        client.user.info(
            (res) => {setUser(res.data.user)},
            (err) => {console.error(err)}
        );
    }, [client]);

    function update(user) {
        client.user.update(user, () => {
            navigate(-1);
        }, (err) => {
            alert("unable to update user");
        });
    }

    return (
        <Main>
            <EditImage src={"pfp"} alt={"profile picture"} width={largeProfile} />
            {Object.keys(user).map(key => {
                if (key!=="email") {
                    return <Input type="text" key={key} label={splitAtCapital(key)} value={user[key]} onChange={(e)=>{
                            setUser({...user, [key]: e.target.value});
                    }} />;
                }
            })}
            <BottomButton onClick={()=>{update(user)}} icon={"check"} />
        </Main> 
    );
}

function splitAtCapital(str) {
    let split = str.split(/(?=[A-Z])/);
    split = split.join(" ");
    return split.toLowerCase();
}