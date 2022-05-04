import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MultiFieldHeader, OrderedList } from '../oui/index.js';
import authContext from '../../auth/authContext';

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
            <MultiFieldHeader
                title="Title"
                src="pfp"
                onTab={changeContent}
                onEdit={()=>{navigate("edit")}}
            >
                <span key="kids">kids</span>
                <span key="friends">friends</span>
                <span key="vehicles">vehicles</span>
            </MultiFieldHeader>
            {(()=>{switch(currentKey) {
                case "kids":
                    return(
                        <OrderedList
                            title = "kids"
                            sort = {(a,b)=> 1}
                        >
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                        </OrderedList>
                    );
                case "friends":
                    return(
                        <OrderedList
                            title = "friends"
                            sort = {(a,b)=> 1}
                            onClick={()=>{}}
                        >
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                        </OrderedList>
                    );
                case "vehicles":
                    return(
                        <OrderedList
                            title = "vehicles"
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
