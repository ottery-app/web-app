import React from "react";

import {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";

import {logoDefault} from "../../assets/images/logos";
import {Image, Link, Input, Button} from "../oui/index";
import { Wrapper, LoginField, NewAccount, Form, Error } from "./LoginStyles";
import { regexEmail } from "../../globals/regex";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const [emailState, setEmailState] = React.useState("");
    const [passwordState, setPasswordState] = React.useState("");

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(authContext.error){
            setError(authContext.error.message);
        }
    }, [authContext.error]);

    function login() {
        if (email === "") {
            setEmailState("error");
            setError("Email is required");
            return;
        }

        if(!regexEmail.test(email)){
            setEmailState("error");
            setError("Invalid email");
            return;
        }

        if (password === "") {
            setPasswordState("error");
            setError("Password is required");
            return;
        }

        authContext.login(email, password);
    }

    return(
        <Wrapper>
            <LoginField>
                <Image src={logoDefault} alt="logo" width={"100%"}/>
                <Form>
                    <Input 
                        width="100%" 
                        type="text" 
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        state={emailState}
                    />
                    <Input 
                        width="100%"
                        type="password"
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        state={passwordState}
                    />
                    <br></br>
                    <Button 
                        width="100%"
                        onClick={login}
                    >Login</Button>
                </Form>
                <Error>{error}</Error>
            </LoginField>
            <NewAccount>
                <div>Don't have an account? <Link onClick={()=>{
                    setError(""); // this is here because the error got caried over for some reason
                    navigate("/register")
                }}>Sign up!</Link></div>
            </NewAccount>
       </Wrapper>
   );

}

export default Login;