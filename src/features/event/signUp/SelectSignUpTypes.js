import { MainSignUp } from "./signUp.styles";
import { LongCheckboxInput } from "../../../ottery-ui/input/LongCheckboxInput";
import Button from "../../../ottery-ui/buttons/Button";
import { useState } from "react";
import { signUps } from "./signUp.enum";
import { Title } from "../../../ottery-ui/text/Title";

export function SelectSignUpTypes({onDone}) {
    const [volenteering, setVolenteering] = useState(false);
    const [enrolling, setEnrolling] = useState(false);

    function handleNext() {
        const keys = [];
        volenteering && keys.push(signUps.VOLENTEER);
        enrolling && keys.push(signUps.CHILD);
        onDone(keys);
    }

    return <MainSignUp>
        <Title>What you are signing up for?</Title>
        <LongCheckboxInput
            checked={volenteering}
            onChange={(e)=>{setVolenteering(e.target.value)}}
        >
            Volunteering
        </LongCheckboxInput>
        <LongCheckboxInput
            checked={enrolling}
            onChange={(e)=>{setEnrolling(e.target.value)}}
        >
            Enrolling
        </LongCheckboxInput>
        <Button onClick={handleNext}>
            Next
        </Button>
    </MainSignUp>
}