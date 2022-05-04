import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { logoDefault } from '../../assets/images/logos';

import {NavBar, MainHeader, IconButton, Image} from "../oui/index.js";
import {textPale} from "../oui/styles/colors.js";

const Main = styled.main`
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 60px;
    `;

    const Content = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        width: 100%;
    `

    const Footer = styled.footer`
        width: 100%;
        position: fixed;
        bottom: 0;
    `;

    const Header = styled.header`
        width: 100%;
        position: sticky;
        top: 0;
    `;

export default function MainWrap({state, children}) {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        let currentPath = window.location.pathname;
        currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1)

        if (currentPath === state) {
            setTitle(<Image src={logoDefault} alt={"logo"} height="80%" />);
        } else {
            setTitle(<h3>{currentPath.toUpperCase()}</h3>);
        }
    }, [window.location.pathname]);

    return (
        <>
            <Header>
                <MainHeader
                    left={<IconButton icon="back" onClick={()=>{navigate(-1)}} secondaryTextColor={"black"}/>}
                    main={title}
                    right={<IconButton icon="menu" onClick={()=>{navigate("/menu")}} secondaryTextColor={"black"}/>}
                />
            </Header>
            <Main>
                <Content>
                    {children}
                </Content>
            </Main>
            <Footer>
                <NavBar>
                    <IconButton icon="dropoff" onClick={()=>{navigate("/" + state + "/dropoff")}}/>
                    <IconButton icon="user" onClick={()=>{navigate("/" + state + "/user")}} primaryTextColor={textPale} />
                    <IconButton icon="home" onClick={()=>{navigate("/" + state)}} />
                    <IconButton icon="calendar" onClick={()=>{navigate("/" + state + "/calender")}} primaryTextColor={textPale} />
                    <IconButton icon="pickup" onClick={()=>{navigate("/" + state + "/pickup")}} />
                </NavBar>
            </Footer>
        </>
    );
}