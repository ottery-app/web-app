import React from "react";
import styled from "styled-components";

import {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";

import logo from "../../assets/images/logo.jpg";
import mail from "../../assets/images/mail.svg";

import {
    Image,
    Link,
    Input,
    Button
} from "../oui/index";

import { 
    Wrapper,
    RegisterField,
    Form,
    Error,
    NewAccount
} from "./LoginStyles";

import {largeProfile} from "../oui/styles/image";

import { 
    regexCode,
    regexEmail,
    regexPassword,
    regexPasswordLower,
    regexPasswordMin,
    regexPasswordNumber,
    regexPasswordSpecial,
    regexPasswordUpper,
} from "../../globals/regex";

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
    const [codeState, setCodeState] = React.useState("");
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
        if(!regexEmail.test(email)){
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

        if (!regexPassword.test(password)) {//check if the password is strong enough
            if (!regexPasswordMin.test(password)) {
                setError("The password must be least 8 characters long");
            } else if (!regexPasswordUpper.test(password)) {
                setError("The password must contain at least one uppercase letter");
            } else if (!regexPasswordLower.test(password)) {
                setError("The password must contain at least one lowercase letter");
            } else if (!regexPasswordNumber.test(password)) {
                setError("The password must contain at least one number");
            } else if (!regexPasswordSpecial.test(password)) {
                setError("The password must contain at least one special character");
            } else {
                setError("The password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
            }

            setCodeState("error");
            return;
        }

        setPhase(phases.confirmation);
        authContext.confirmation(); 
    }

    function register() {
        if (code === undefined || code === "" || code === null) {
            setError("Code cannot be empty");
            setCodeState("error");
            return;
        }

        if (!regexCode.test(code)) {
            setCodeState("error");
            setError("Invalid code");
            return;
        }

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
                        label="re-enter password"
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
                        regex={regexCode}
                        state={codeState}
                    />
                    <Button 
                        width="100%"
                        onClick={register}
                    >Validate</Button>
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