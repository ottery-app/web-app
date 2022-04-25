import React from "react";

import {useEffect, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import {tertiary} from "../oui/styles/colors";
import { shadowDefault } from "../oui/styles/shadow";

import logo from "../../assets/images/logo.jpg";
import {Image, Link, Input, Button} from "../oui/index";

const Wrapper = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    width: 100%;
`;

const LoginField = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${tertiary};
    margin: 20px;
    padding: 20px;
    ${shadowDefault}
`;

const NewAccount = LoginField;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 10px;
    padding: 10px;
`;

const Error = styled.div`
    color: red;
    padding: 10px;
`;

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isAuthenticated) {
            navigate(`/${authContext.manager.state}`)
        }
    }, [authContext.isAuthenticated, navigate]);

    useEffect(()=>{
        if(authContext.error){
            setError(authContext.error.message);
        }
    }, [authContext.error]);

    return(
        <Wrapper>
            <LoginField>
                <Image src={logo} alt="logo" width={"100%"}/>
                <Form>
                    <Input 
                        width="100%" 
                        type="text" 
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        width="100%"
                        type="password"
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <Button 
                        width="100%"
                        onClick={() => authContext.login(email, password)}
                    >Login</Button>
                </Form>
                <Error>{error}</Error>
            </LoginField>
            <NewAccount>
                <div>Don't have an account? <Link onClick={()=>{navigate("/register")}}>Sign up!</Link></div>
            </NewAccount>
       </Wrapper>
   );

}

export default Login;