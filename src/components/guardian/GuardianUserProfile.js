import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MultiFieldHeader, OrderedList } from '../oui/index.js';
import {height} from "../oui/styles/banners";
import authContext from '../../auth/authContext';
import addPx from '../../functions/addPx.js';
import { backgroundColor } from '../oui/styles/colors.js';

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

export default function GuardianUserProfile() {
    const [currentKey, setCurrentKey] = useState("kids");

    const navigate = useNavigate();
    const {client} = useContext(authContext);

    useEffect(() => {
        //load the user data
        //load the content
    }, []);

    function changeContent(key) {
        setCurrentKey(key);
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
                    <span key="kids">kids</span>
                    <span key="friends">friends</span>
                    <span key="vehicles">vehicles</span>
                </MultiFieldHeader>
            </Sticky>
            {(()=>{switch(currentKey) {
                case "kids":
                    return(
                        <OrderedList
                            sort = {(a,b)=> 1}
                        >
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                        </OrderedList>
                    );
                case "friends":
                    return(
                        <OrderedList
                            sort = {(a,b)=> 1}
                        >
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                        </OrderedList>
                    );
                case "vehicles":
                    return(
                        <OrderedList
                            sort = {(a,b)=> 1}
                        >
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                        </OrderedList>
                    );
            }})()}
        </Main>
    );
}
