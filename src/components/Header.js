import Image from "../ottery-ui/images/Image";
import MainHeader, {MainHeaderHeight} from "../ottery-ui/headers/MainHeader";
import IconButton from "../ottery-ui/buttons/IconButton";
import { useNavigator } from "../hooks/useNavigator";
import { logoDefault } from "../assets/images/logos";
import useSwapState from "../hooks/useSwapState";
import styled from "styled-components";
import { clickable } from "../ottery-ui/styles/clickable";
import { useEffect, useState } from "react";

const State = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${clickable.minHeight};
    font-weight: bold;
`;

export default function Header({title, right}) {
    const navigator = useNavigator();
    const [state] = useSwapState();
    const [alert, setAlert] = useState();

    useEffect(()=>{
        if (state === "caretaker") {
            setAlert("clocked in");
        } else {
            setAlert();
        }
    }, [state]);

    return(
        <MainHeader
            left={title && <IconButton icon="back" onClick={()=>{navigator(-1)}} />}
            main={(title)
                ?<h3>{title}</h3>
                :<Image src={logoDefault} alt="ottery logo" height={MainHeaderHeight} width="auto" />
            }
            right={<State>{alert}</State>}
        />
    );
}