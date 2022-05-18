import React from "react";
import styled from "styled-components";
import {Input, EditImage, IconButton} from "../../components/oui";
import { primary, textLight } from "../oui/styles/colors";
import { largeProfile } from "../oui/styles/image";
import { minHeight } from '../oui/styles/clickable';
import authContext from "../../auth/authContext";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Button = styled.div`
    position: fixed;
    bottom: ${minHeight};
    padding: 30px;
    right: 0;
`;

const Name = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export default function GuardianEdit() {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();

    const {client} = React.useContext(authContext);

    React.useEffect(() => {
        setUser(client.getInfo());
    }, [client]);

    function update(user) {
        client.updateUser(user, () => {
            navigate(-1);
        }, (err) => {
            alert("unable to update user");
        });
    }

    return (
        <Main>
            <EditImage src={"pfp"} alt={"profile picture"} width={largeProfile} />
            {Object.keys(user).map(key => {
                return <Input type="text" key={key} label={key} value={user[key]} onChange={(e)=>{
                    if (key!=="email") {
                        setUser({...user, [key]: e.target.value});
                    }
                }} />;
            })}
            <Button>
                <IconButton onClick={()=>{update(user)}} primaryColor={primary} primaryTextColor={textLight} secondaryTextColor={textLight} icon={"check"} />
            </Button>
        </Main> 
    );
}