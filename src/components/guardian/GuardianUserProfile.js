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

const fields = ["kids", "friends", "vehicles"];

const data = {
    kids: [1,2,3,4,5],
    friends: [6,7,8],
    vehicles: [9,10],
}

export default function GuardianUserProfile() {
    const [currentKey, setCurrentKey] = useState(fields[0]);
    const [add, setAdd] = useState(() => () => console.log("add") );
    const [curDat, setCurDat] = useState(data.kids);
    const navigate = useNavigate();
    const {client} = useContext(authContext);

    useEffect(()=>{
        console.log("load data");
    },[])

    function changeContent(key) {
        setCurrentKey(key);
        setCurDat(data[key])
    }

    return (
        <Main>
            <Sticky>
                <MultiFieldHeader
                    title={client.getName()}
                    src="pfp"
                    onTab={changeContent}
                    onEdit={()=>{navigate("edit")}}
                >
                    {fields.map((key)=>{
                        return <span key={key}>{key}</span>
                    })}
                </MultiFieldHeader>
            </Sticky>
            <OrderedList
                sort = {(a,b)=> -1}
            >
                {curDat.map((cur)=>{
                    return <ImageButton key={cur} content={cur} right={"pfp"} />
                })}
            </OrderedList>
            <Button>
                <AddButton onClick={add} type="solid"/>
            </Button>
        </Main>
    );
}
