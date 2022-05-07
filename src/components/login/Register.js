import React from "react";
import styled from "styled-components";

import {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";

import {logoDefault} from "../../assets/images/logos";
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
    regexZip,
} from "../../globals/regex";

const Header = styled.div`
    padding: 20px;
    text-align: center;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
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
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [zipState, setZipState] = React.useState("");
    const [error, setError] = React.useState("");
    const [code, setCode] = React.useState(null);
    const [codeState, setCodeState] = React.useState("");
    const [emailState, setEmailState] = React.useState("");
    const [passwordState, setPasswordState] = React.useState("");
    const [passwordRepeatState, setPasswordRepeatState] = React.useState("");

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    }, [phase]);

    useEffect(()=>{
        if(authContext.error){
            console.log(authContext.error);
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

    function register() {
        if (!regexZip.test(zip)) {
            setZipState("error");
            setError("Invalid zip code");
            return;
        }

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
            setError("The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            setCodeState("error");
            return;
        }

        const name = first + " " + last;
        const fullAddress = address + "," + city + "," + state + "," + zip;

        authContext.register(
            email, name, fullAddress, password,
            ()=>{setPhase(phases.confirmation)}
        );
    }

    function activate() {
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

        authContext.activate(email, code.toUpperCase());
    }

    function resend() {
        authContext.resendActivation(email, ()=>{
            alert("email sent to " + email);
        }, ()=> {
            setError("email not sent");
        });
    }

    let phaseDisplay;
    if (phase === phases.register) {
        phaseDisplay = (
            <>
                <h1>Register</h1>
                <Form>
                    <Input 
                        width="100%" 
                        type="text" 
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        state={emailState}
                    />
                    <Row>
                        <Input
                            width="100%"
                            label="first name"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                        />
                        <Input
                            width="100%"
                            label="last"
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                        />
                    </Row>
                    <Input
                        width="100%"
                        type="text"
                        label="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Row>
                        <Input
                            type="text"
                            label="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Input 
                            type="states"
                            label="state"
                            value={state}
                            onChange={(e)=>{setState(e.target.value)}}
                            supported
                        />
                        <Input
                            type="text"
                            label="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            state={zipState}
                        />
                    </Row>
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
                        onClick={register}
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
                        onClick={activate}
                    >Validate</Button>
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
                <div>Already have an account? <Link onClick={()=>{navigate("/login")}}>Sign in!</Link></div>
            </NewAccount>
       </Wrapper>
   );

}

export default Register;