import React from "react";

import {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";

import logo from "../../assets/images/logo.jpg";
import {Image, Link, Input, Button} from "../oui/index";
import { Wrapper, LoginField, NewAccount, Form, Error } from "./LoginStyles";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const [emailState, setEmailState] = React.useState("");
    const [passwordState, setPasswordState] = React.useState("");

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isAuthenticated) {
            navigate(`/${authContext.client.state}`)
        }
    }, [authContext.isAuthenticated, navigate]);

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

        if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)){
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
                <Image src={logo} alt="logo" width={"100%"}/>
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