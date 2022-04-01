import {TextInput, OptionInput, DateInput} from "../components/Input";
import {Button} from "../components/Buttons";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/colors.css";
import "../css/NewChild.css";

function NewChild() {
    const navigate = useNavigate();

    const [first,setFirst] = useState("");
    const [middle, setMiddle] = useState("");
    const [last, setLast] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [genderStatus, setGenderStatus] = useState("");
    const [allergies, setAllergies] = useState("");
    const [specialNeeds, setSpecialNeeds] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [error, setError] = useState("");

    function emptyFields() {
        if (first === "") {
            return "first name not entered";
        }

        if (middle === "") {
            return "middle name not set";
        }

        if (last === "") {
            return "last name not set";
        }

        if (dob === "") {
            return "date of birth not set";
        }

        if (gender === "") {
            return "gender not set";
        }

        return false;
    }

    useEffect(validateGender, [gender]);

    function validateGender() {
        if (gender === "" || String(gender).toLowerCase() === "male" || String(gender).toLowerCase() === "female") {
            setGenderStatus("")
            return true;
        } else {
            setGenderStatus("b8");
            return "must be a valid birth gender";
        }
    }

    function validateFields() {
        if (validateGender() !== true) {
            return validateGender();
        }

        return true;
    }

    return(<main id="new-child">
        add photo
        <TextInput className="b4 s1" name="first name" value={first} setValue={setFirst} /><br/>
        <TextInput className="b4 s1" name="middle name" value={middle} setValue={setMiddle} /><br/>
        <TextInput className="b4 s1" name="last name" value={last} setValue={setLast} /><br/>
        <OptionInput className={`${genderStatus} b4 s1`} name="birth gender" value={gender} setValue={setGender} options={["male","female"]}/><br/>
        <DateInput className="b4 s1" name="date of birth" value={dob} setValue={setDob} />
        <TextInput className="b4 s1" name="allergies" value={allergies} setValue={setAllergies} /><br/>
        <TextInput className="b4 s1" name="special needs" value={specialNeeds} setValue={setSpecialNeeds} /><br/>
        <TextInput className="b4 s1" name="additional info" value={additionalInfo} setValue={setAdditionalInfo} /><br/>
        <p className="t1">{error}</p>
        <center>
            <Button 
                display="cancel"
                className="button t9 b1 c9"
                handleEvent={()=>{navigate(-1)}}
            />
            <Button 
                display="add"
                className="button"
                handleEvent={()=>{
                    if (validateFields() === true) {
                        if (emptyFields()) {
                            setError(emptyFields());
                            return;
                        } else {
                            alert("need to make new child");
                            //API.newChild(first, middle, last, gender, dob, allergies, specialNeeds, additionalInfo, ()=>{navigate(-1)});
                        }
                    }
                    setError(validateFields());
                }}
            />
        </center>
    </main>);
}

export default NewChild;