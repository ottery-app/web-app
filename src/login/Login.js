import {useState, useEffect, useContext} from "react";
import {OptionInput, TextInput, DateInput} from "../components/Input";
import FormBar from "../components/FormBar";
import { DirectionalButton } from "../components/Buttons";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";


import "../css/Login.css";
import "../css/Buttons.css";
import "../css/colors.css";

function Login() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isAuthenticated) {
            if (authContext.state) {
                navigate(`/${authContext.state}`);
            } else {
                navigate("/bridge");
            }
        }
    }, [authContext.isAuthenticated, navigate]);

    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
    "Iowa", "Kansas", "Kentuky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "new Hampshire", "new Jersey", "new Mexico", "new York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    const countries = ["United States of America (USA)", "Canada"];

    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [genderStatus, setGenderStatus] = useState("");
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [signup, setSignup] = useState(false);
    const [formField, setFormField] = useState(1);

    useEffect(validateGender, [gender]);
    useEffect(validatePassword, [password, repPassword]);
    useEffect(validateEmail,[email]);

    function emptyFields() {
        if (username === "") {
            return "username not entered";
        }

        if (password === "") {
            return "password not entered";
        }

        if (firstName === "") {
            return "first name not entered";
        }

        if (middleName === "") {
            return "middle name not entered";
        }

        if (lastName === "") {
            return "last name not entered";
        }

        if (date === "") {
            return "date of birth not entered";
        }

        if (gender === "") {
            return "gender not entered";
        }

        if (country === "") {
            return "country not entered";
        }

        if (address === "") {
            return "address not entered";
        }

        if (city === "") {
            return "city not entered";
        }

        if (state === "") {
            return "state not entered";
        }

        if (zip === "") {
            return "zip code not entered";
        }

        if (email === "") {
            return "email not entered";
        }

        if (phone === "") {
            return "phone number not entered";
        }

        return false;
    }

    function validateGender() {
        if (gender === "" || String(gender).toLowerCase() === "male" || String(gender).toLowerCase() === "female") {
            setGenderStatus("")
            return true;
        } else {
            setGenderStatus("b8");
            return "must be a valid birth gender";
        }
    }

    function validatePassword() {
        if (password !== repPassword) {
            setPasswordStatus("b8");
            return "passwords must match";
        } else {
            setPasswordStatus("");
            return true;
        }
    }

    function validateEmail() {
        if (String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || email === "") {
            setEmailStatus("");
            return true;
        }else {
            setEmailStatus("b8");
            return "must be a valid email";
        }
    }

    function validateFields() {
        if (validatePassword() !== true) {
            return validatePassword();
        }

        if (validateGender() !== true) {
            return validateGender();
        }

        if (validateEmail() !== true) {
            return validateEmail();
        }

        return true;
    }

    if (signup) {
        let fields = [
            <>
                <form>
                    <h2>Create User</h2>
                    <TextInput className="b4 s1" name="username" value={username} setValue={setUsername} /><br/>
                    <TextInput className={`${passwordStatus} b4 s1`} name="password" value={password} setValue={setPassword} secure={true} /><br/>
                    <TextInput className={`${passwordStatus} b4 s1`} name="repeat password" value={repPassword} setValue={setRepPassword} secure={true} /><br/>
                    <p className="t1">{error}</p>
                </form>
            </>,
            <>
                <form>
                    <h2>Personal Info</h2>
                    <TextInput className="b4 s1" name="first name" value={firstName} setValue={setFirstName} /><br/>
                    <TextInput className="b4 s1" name="middle name" value={middleName} setValue={setMiddleName} /><br/>
                    <TextInput className="b4 s1" name="last name" value={lastName} setValue={setLastName} /><br/>
                    <DateInput className="b4 s1" name="date of birth" value={date} setValue={setDate} />
                    <OptionInput className={`${genderStatus} b4 s1`} name="birth gender" value={gender} setValue={setGender} options={["male","female"]}/><br/>
                    <p className="t1">{error}</p>
                </form>
            </>,
            <>
                <form>
                    <h2>Location</h2>
                    <OptionInput className="b4 s1" name="country" value={country} setValue={setCountry} options={countries} /><br/>
                    <TextInput className="b4 s1" name="address" value={address} setValue={setAddress}/><br/>
                    <TextInput className="b4 s1" name="city" value={city} setValue={setCity} /><br/>
                    <OptionInput className="b4 s1" name="state" value={state} setValue={setState} options={states} /><br/>
                    <TextInput className="b4 s1" name="zip code" value={zip} setValue={setZip} /><br/>
                    <p className="t1">{error}</p>
                </form>
            </>,
            <>
                <form>
                    <h2>Contact Information</h2>
                    <TextInput className={`${emailStatus} b4 s1`} name="email" value={email} setValue={setEmail} /><br/>
                    <TextInput className="b4 s1" name="phone number" value={phone} setValue={setPhone} /><br/>
                    <p className="t1">{error}</p>
                </form>
            </>
        ];
        return (
            <div id="signup" className="auth">
                <div className="signup">

                    <center><h1>LOGO</h1></center>
                    <FormBar numFields={4} current={formField}/>
                    {fields[formField - 1]}
                    <div className="buttons">
                        <DirectionalButton className={"back"} display={"back"} direction={"left"} handleEvent={()=>{
                            if (formField === 1) {
                                setSignup(false);
                                setError("");
                            } else {
                                setFormField((p)=> p - 1);
                            }
                        }} />
                        <DirectionalButton className={"next"} display={"next"} direction={"right"} handleEvent={()=>{                                
                            if (validateFields() === true) {
                                if (formField === 4) {
                                    if (emptyFields()) {
                                        setError(emptyFields());
                                        return;
                                    } else {
                                        authContext.register(email, username, password, firstName, middleName, lastName, gender, date, country, address, city, state, zip, phone);
                                    }
                                } else {
                                    setFormField((p)=> p + 1);
                                }
                            }
                            setError(validateFields());
                        }} />

                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id="login" className="auth">
                <center><h1>LOGO</h1></center>
                <div className="signin b3 s1">
                    <TextInput className="c6 b5" name="username" value={username} setValue={setUsername} /><br/>
                    <TextInput className="c6 b5" name="password" value={password} setValue={setPassword} secure={true}/><br/>
                    <div className="err t1">{error}</div>
                    <button className="minor-button c2" onClick={async ()=>{authContext.login(username, password)}}>Login</button>
                </div>
                <div className="signup b3 s1">
                    Don't have an account? <a className="t2" onClick={()=>{
                        setSignup(true);
                    }}>sign up!</a>
                </div>
            </div>
        );
    }

}

export default Login;