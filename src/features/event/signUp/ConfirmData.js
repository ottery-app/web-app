import {otterDrawingInTheSand} from "../../../assets/images/otters";
import {MainSignUp} from "./signUp.styles";
import Image from "../../../ottery-ui/images/Image";
import Button from "../../../ottery-ui/buttons/Button";
import Shadowbox from "../../../ottery-ui/containers/Shadowbox";
import { useState } from "react";
import { Title } from "../../../ottery-ui/text/Title";


const States = {
    ACCEPT:"accept",
    DATA:"data",
}

export function ConfirmData({onDone, mainFlow}) {
    const [state, setState] = useState(States.ACCEPT);

    function accept() {
        onDone(mainFlow);
    }

    if (States.ACCEPT === state) {
        return <MainSignUp>
            <Image width={"100%"} src={otterDrawingInTheSand}/>
            <Title>
                We will need to share some of your data<br/>
                Will that be ok?
            </Title>
            {/* <Link onClick={()=>{
                setState(States.DATA);
            }}>see data here</Link> */}
            <Button onClick={accept}>Yep!</Button>
        </MainSignUp>;
    } else if (States.DATA === state) {
        return  <MainSignUp>
            <Shadowbox>
                <Title>We will give access to:</Title>
                data
                <Title>But don't worry it never leaves Ottery</Title>
            </Shadowbox>
            <Button onClick={accept}>Sounds Good!</Button>
        </MainSignUp>
    }

    return 
}