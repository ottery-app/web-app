import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AddButton, ImageButton, MultiFieldHeader, OrderedList } from '../oui/index.js';
import {height} from "../oui/styles/banners";
import authContext from '../../auth/authContext';
import addPx from '../../functions/addPx.js';
import { backgroundColor } from '../oui/styles/colors.js';
import { minHeight } from '../oui/styles/clickable';

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Sticky = styled.div`
    position: sticky;
    background: ${backgroundColor};
    padding: 10px;
    padding-bottom: 0px;
    top: ${addPx(height, 1)};
`;

const Button = styled.div`
    position: fixed;
    bottom: ${minHeight};
    right: 0;
    padding: 30px 20px;
`;

const List = styled.div`
    margin: 0 55px;
`;

const fields = ["kids", "friends", "vehicles"];

export default function GuardianUserProfile() {
    const [currentKey, setCurrentKey] = useState(fields[0]);
    const navigate = useNavigate();
    const [add, setAdd] = useState(() => () => navigate("./create/" + fields[0]));
    const [data, setData] = useState({});
    const [curDat, setCurDat] = useState([]);
    const {client} = useContext(authContext);

    useEffect(()=>{
        client.getKids((k)=>{
            console.log(k);
            data.kids = k;
        })

        client.getVehicles((v)=>{
            console.log(v);
            data.vehicles = v;
        })

        client.getFriends((f)=>{
            console.log(f);
            data.friends = f;
        })
    },[]);

    useEffect(()=>{
        setCurDat(data[currentKey]);
    }, [data[currentKey]]);

    function changeContent(key) {
        setCurrentKey(key);
        setCurDat(data[key])
        setAdd(() => () => navigate("./create/" + key));
    }

    return (
        <Main>
            <Sticky>
                <MultiFieldHeader
                    title={client.getInfo().name}
                    src="pfp"
                    onTab={changeContent}
                    onEdit={()=>{navigate("edit")}}
                >
                    {fields.map((key)=>{
                        return <span key={key}>{key}</span>
                    })}
                </MultiFieldHeader>
            </Sticky>
            <List>
                <OrderedList
                    sort = {(a,b)=> -1}
                >
                    {curDat.map((cur)=>{
                        return <ImageButton key={cur} content={cur} right={"pfp"} />
                    })}
                </OrderedList>
            </List>
            <Button>
                <AddButton onClick={add} type="solid"/>
            </Button>
        </Main>
    );
}
