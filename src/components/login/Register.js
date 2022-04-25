import React from "react";
import styled from "styled-components";

import {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";

import logo from "../../assets/images/logo.jpg";
import mail from "../../assets/images/mail.svg";
import {Image, Link, Input, Button} from "../oui/index";
import { Wrapper, RegisterField, Form, Error, NewAccount } from "./LoginStyles";
import {largeProfile} from "../oui/styles/image";

const Header = styled.div`
    padding: 20px;
    text-align: center;
`;

const phases = {
    register: "register",
    confirmation: "confirmation",
};

function Register() {
    const [phase, setPhase] = React.useState("register");

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordRepeat, setPasswordRepeat] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [error, setError] = React.useState("");
    const [code, setCode] = React.useState();

    const [emailState, setEmailState] = React.useState("");
    const [passwordState, setPasswordState] = React.useState("");
    const [passwordRepeatState, setPasswordRepeatState] = React.useState("");

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    }, [phase]);

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

    useEffect(()=>{
        if (passwordRepeat === "" || password === "") {
            setPasswordState("");
            setPasswordRepeatState("");
        } else if (passwordRepeat !== password) {
            setPasswordState("error");
            setPasswordRepeatState("error");
        } else {
            setPasswordState("success");
            setPasswordRepeatState("success");
        }
    }, [password, passwordRepeat]);

    function authenticate() {
        if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)){
            setEmailState("error");
            setError("Invalid email");
            return;
        }

        if (passwordRepeat === "" || password === "") {
            setPasswordState("error");
            setPasswordRepeatState("error");
            setError("Password cannot be empty");
            return;
        }

        if (passwordRepeat !== password) {
            setPasswordState("error");
            setPasswordRepeatState("error");
            setError("Passwords do not match");
            return;
        }

        if (false) {//check if the password is strong enough
            setPasswordState("error");
            setPasswordRepeatState("error");
            setError("password is too weak");
            return;
        }

        setPhase(phases.confirmation);
        authContext.confirmation(); 
    }

    function register() {
        authContext.register(email, name, address, password, code);
    }

    function resend() {
        alert("We resent the code to your email");
        authenticate();
    }

    let phaseDisplay;
    if (phase === phases.register) {
        phaseDisplay = (
            <>
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
                        label="full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        width="100%"
                        type="text"
                        label="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Input 
                        width="100%"
                        type="password"
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        state={passwordState}
                        regex={undefined}
                    />
                    <Input 
                        width="100%"
                        type="password"
                        label="repeat password"
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        state={passwordRepeatState}
                    />
                    <Button 
                        width="100%"
                        onClick={authenticate}
                    >Register</Button>
                </Form>
                <Error>{error}</Error>
            </>
        );
    } else if (phase === phases.confirmation) {
        phaseDisplay = (
                <>
                <Header>
                    <Image src={mail} alt="mail" width={largeProfile}/>
                    <h3>Enter Confirmation Code</h3>
                    We sent it to: {email}. <Link onClick={resend}>Resend Code?</Link>
                </Header>
                <Form>
                    <Input 
                        width="100%" 
                        type="text" 
                        label="activation code"
                        value={(code)? code : "" /*this is required to handle a known bug in mui*/}
                        onChange={(e) => setCode(e.target.value)}
                        regex={/^[0-9]{6}$/}
                    />
                    <Button 
                        width="100%"
                        onClick={register}
                    >Register</Button>
                    <Link onClick={()=>{setPhase(phases.register)}}>Go Back</Link>
                </Form>
                <Error>{error}</Error>
            </>
        );
    }

    return(
        <Wrapper>
            <RegisterField>
                {phaseDisplay}
            </RegisterField>
            <NewAccount>
                <div>Already have an account? <Link onClick={()=>{navigate("/")}}>Sign in!</Link></div>
            </NewAccount>
       </Wrapper>
   );

}

export default Register;